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

        // Tambahan data untuk vendor
        if ($user->role === 'vendor') {
            $vendor = Vendor::where('user_id', $user->id)->first();
            $data['vendor'] = $vendor;
        }

        // Menentukan view berdasarkan role
        $view = match($user->role) {
            'admin' => 'profile.AdminProfile',    // Ubah format path menggunakan titik
            'vendor' => 'profile.VendorProfile',
            'customer' => 'profile.CustomerProfile',
            default => 'profile.CustomerProfile',
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

        // Untuk admin hanya update data umum (jika ada)
        if ($user->role === 'admin') {
            $user->update($data);
        }

        // Update vendor data jika user adalah vendor
        if ($user->role === 'vendor' && $request->has('vendor')) {
            $vendor = Vendor::where('user_id', $user->id)->first();
            $vendor->update($request->get('vendor'));
        }

        return back()->with('message', 'Profil berhasil diperbarui');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        Auth::user()->update([
            'password' => bcrypt($request->password)
        ]);

        return back()->with('message', 'Password berhasil diperbarui');
    }
}
