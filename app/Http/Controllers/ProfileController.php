<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vendor;
use App\Models\Booking;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('EditProfile', [
            'user' => $request->user()->only('name', 'email', 'phone', 'avatar')
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $request->user()->save();

        return redirect()->route('profile');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show(Request $request): Response
    {
        $user = $request->user();

        return match($user->role) {
            'admin' => $this->showAdminProfile($user),
            'vendor' => $this->showVendorProfile($user),
            default => $this->showCustomerProfile($user)
        };
    }

    private function showAdminProfile(User $user): Response
    {
        $stats = [
            'total_users' => User::count(),
            'total_vendors' => Vendor::count(),
            'total_transactions' => Transaction::sum('amount'),
            'pending_vendors' => Vendor::where('status', 'pending')->count()
        ];

        return Inertia::render('Profile/Admin', [
            'user' => $user->only('name', 'email', 'avatar'),
            'stats' => $stats,
            'latest_users' => User::latest()->take(5)->get(),
            'latest_transactions' => Transaction::with('user')->latest()->take(5)->get()
        ]);
    }

    private function showCustomerProfile(User $user): Response
    {
        return Inertia::render('Profile/Customer', [
            'user' => [
                ...$user->toArray(),
                'avatar' => $user->avatar_url
            ],
            'bookings' => Booking::where('customer_id', $user->id)
                ->with('vendor')
                ->latest()
                ->get()
                ->map(fn($booking) => [
                    'id' => $booking->id,
                    'vendor' => $booking->vendor->nama,
                    'date' => $booking->tanggal_acara->format('d M Y'),
                    'status' => $booking->status,
                    'total' => number_format($booking->total_harga, 0, ',', '.')
                ]),
            'stats' => [
                'total_bookings' => Booking::where('customer_id', $user->id)->count(),
                'total_spent' => Transaction::where('user_id', $user->id)->sum('amount')
            ]
        ]);
    }

    private function showVendorProfile(User $user): Response
    {
        if (!$user->vendor) {
            return Inertia::render('Vendor/Setup', [
                'message' => 'Silakan lengkapi profil vendor Anda'
            ]);
        }

        $vendor = $user->vendor;
        $vendor->load('products');

        $stats = [
            'total_pendapatan' => Transaction::where('vendor_id', $vendor->id)->sum('amount'),
            'pesanan_bulan_ini' => Booking::where('vendor_id', $vendor->id)
                ->whereMonth('created_at', now()->month)
                ->count(),
            'produk_aktif' => $vendor->products()->where('status', 'active')->count(),
            'rating_avg' => $vendor->reviews()->avg('rating') ?? 0
        ];

        $bookings = Booking::where('vendor_id', $vendor->id)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->get()
            ->pluck('count', 'month');

        $transactions = Transaction::where('vendor_id', $vendor->id)
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->get()
            ->pluck('total', 'month');

        $chartData = [
            'bookings' => array_values(array_replace([0,0,0,0,0,0,0,0,0,0,0,0], $bookings->toArray())),
            'revenue' => array_values(array_replace([0,0,0,0,0,0,0,0,0,0,0,0], $transactions->toArray())),
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
        ];

        return Inertia::render('Profile/Vendor', [
            'vendor' => [
                ...$vendor->toArray(),
                'gambar_url' => $vendor->gambar_url,
                'kategori' => $vendor->kategori,
                'lokasi' => $vendor->lokasi
            ],
            'stats' => $stats,
            'products' => $vendor->products->map(fn($product) => [
                'id' => $product->id,
                'nama' => $product->nama_produk,
                'deskripsi' => $product->deskripsi,
                'harga' => number_format($product->harga, 0, ',', '.'),
                'kategori' => $product->kategori,
                'gambar' => $product->gambar_url,
                'status' => $product->status
            ]),
            'chart_data' => $chartData
        ]);
    }

    // Method untuk mengelola produk vendor
    public function storeProduct(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $vendor = $request->user()->vendor;

        $productData = $request->except('gambar');
        $productData['gambar'] = $request->file('gambar')->store('products', 'public');

        $vendor->products()->create($productData);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan');
    }

    public function updateProduct(Request $request, $id)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $product = $request->user()->vendor->products()->findOrFail($id);

        $data = $request->except('gambar');

        if ($request->hasFile('gambar')) {
            Storage::delete($product->gambar);
            $data['gambar'] = $request->file('gambar')->store('products', 'public');
        }

        $product->update($data);

        return redirect()->back()->with('success', 'Produk berhasil diperbarui');
    }

    public function destroyProduct($id)
    {
        $product = auth()->user()->vendor->products()->findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus');
    }

    // Tambahkan method baru untuk handle setup vendor
    public function setupVendorProfile(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'kategori' => 'required|string',
            'lokasi' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $vendor = $request->user()->vendor()->updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                ...$request->except('gambar'),
                'gambar' => $request->file('gambar')->store('vendors', 'public'),
                'status' => 'pending'
            ]
        );

        return redirect()->route('profile')->with('success', 'Profil vendor berhasil disimpan');
    }

    public function updateVendorProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:1000',
            'alamat' => 'required|string',
            'negara' => 'required|string',
            'kode_pos' => 'required|numeric',
            'telepon' => 'required|string',
            'nama_manager' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'kategori' => 'required|string',
            'lokasi' => 'required|string'
        ]);

        $vendor = $user->vendor;

        $data = $request->except('gambar');

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($vendor->gambar) {
                Storage::delete($vendor->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('vendors', 'public');
        }

        $vendor->update($data);

        return redirect()->back()->with('success', 'Profil vendor berhasil diperbarui');
    }
}
