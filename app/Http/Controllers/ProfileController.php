<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Traits\FileManagerTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    use FileManagerTrait;

    public function show()
    {
        $user = Auth::user();
        $data = [
            'user' => $user,
        ];

        if ($user->role === 'vendor') {
            $vendor = Vendor::where('user_id', $user->id)->with('products')->first();

            // Jika data vendor tidak ditemukan, buat objek default untuk menghindari null value.
            if (!$vendor) {
                $vendor = new Vendor;
                $vendor->user_id     = $user->id;
                $vendor->nama        = $user->name;
                $vendor->alamat      = '';
                $vendor->deskripsi   = '';
                $vendor->lokasi      = '';
                $vendor->harga_mulai = 0;
                // Pastikan relasi 'products' di-set sebagai koleksi kosong agar tidak terjadi error.
                $vendor->setRelation('products', collect());
            }

            // Tambahkan properti "location" agar komponen React bisa mengaksesnya.
            $vendor->setAttribute('location', $vendor->lokasi);

            $data['vendor'] = $vendor;
            $totalProducts = $vendor->products ? $vendor->products->count() : 0;
            $data['analytics'] = [
                'totalProducts' => $totalProducts,
                'totalSales'    => 0, // Ubah sesuai logika bisnis jika diperlukan
                'totalRevenue'  => 0, // Ubah sesuai logika bisnis jika diperlukan
            ];

            // Sertakan produk (jika ada)
            $data['products'] = $vendor->products ? $vendor->products : [];
        }

        $view = match($user->role) {
            'admin'    => 'profile.AdminProfile',
            'vendor'   => 'profile.VendorProfile',
            'customer' => 'profile.CustomerProfile',
            default    => 'profile.CustomerProfile',
        };

        return Inertia::render($view, $data);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        // Handle delete avatar
        if ($request->has('avatar') && $request->avatar === '') {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
                $user->update(['avatar' => null]);
            }
            return back()->with('message', 'Foto profil berhasil dihapus');
        }

        // Handle upload avatar
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->update(['avatar' => $path]);
        }

        // Handle upload dokumen
        if ($request->hasFile('document')) {
            $path = $this->updateUserFile(
                $user,
                $request->file('document'),
                $user->document_path,
                'documents'
            );
            $user->update(['document_path' => $path]);
        }

        // Update data user
        $userUpdateData = [
            'name' => $data['name'] ?? $user->name,
            'email' => $data['email'] ?? $user->email,
            'status' => $data['status'] ?? $user->status,
            'role' => $data['role'] ?? $user->role
        ];

        $user->update($userUpdateData);

        // Update atau buat data vendor jika user adalah vendor
        if ($user->role === 'vendor') {
            $vendorData = [
                'user_id' => $user->id,
                'nama' => $data['vendor']['nama'] ?? $user->name,
                'alamat' => $data['vendor']['alamat'] ?? '',
                'deskripsi' => $data['vendor']['deskripsi'] ?? '',
                'latitude' => $data['vendor']['latitude'] ?? null,
                'longitude' => $data['vendor']['longitude'] ?? null,
                'harga_mulai' => $data['vendor']['harga_mulai'] ?? 0,
                'status' => true, // default aktif
                'rating' => $data['vendor']['rating'] ?? null
            ];

            // Menggunakan updateOrCreate untuk menangani kedua kasus
            Vendor::updateOrCreate(
                ['user_id' => $user->id], // kondisi pencarian
                $vendorData // data yang akan diupdate atau dibuat
            );
        }

        return back()->with('message', 'Profil berhasil diperbarui');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => ['required', 'confirmed', 'min:8'],
        ]);

        $user = Auth::user();
        $user->update([
            'password' => bcrypt($request->password),
        ]);

        return back()->with('message', 'Password berhasil diperbarui');
    }

    public function updateVendorProfile(Request $request)
    {
        $validatedData = $request->validate([
            'alamat' => 'required|string',
            'deskripsi' => 'nullable|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Tambahkan nama vendor secara otomatis
        $validatedData['nama'] = Auth::user()->name;


        // Jika terdapat file gambar, simpan file tersebut dan perbarui data validasi
        if ($request->hasFile('gambar')) {
            $validatedData['gambar'] = $this->saveUserFile(Auth::user(), $request->file('gambar'), 'vendors');
        }

        // Lanjutkan dengan logika penyimpanan
        $vendor = Vendor::updateOrCreate(
            ['user_id' => Auth::id()],
            $validatedData
        );

        return redirect()->back()->with('success', 'Profil vendor berhasil diperbarui.');
    }

    public function edit()
    {
        $user = Auth::user();
        $vendor = null;

        // Jika pengguna adalah vendor, ambil data vendor
        if ($user->role === 'vendor') {
            $vendor = Vendor::where('user_id', $user->id)->with('products')->first();
        }

        return Inertia::render('profile.editProfile', [
            'user' => $user,
            'vendor' => $vendor,
        ]);
    }

    public function setupVendorProfile(Request $request)
    {
        // Logika untuk men-setup vendor profile, misalnya:
        $user = Auth::user();
        // Validasi dan simpan data untuk vendor
        // ...
        return redirect()->back()->with('message', 'Vendor profile berhasil di-setup');
    }
}
