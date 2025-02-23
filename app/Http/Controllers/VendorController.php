<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Traits\FileManagerTrait;

class VendorController extends Controller
{
    use FileManagerTrait;

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nama' => 'required|string|max:255', // Pastikan nama diisi
            'kategori' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'dokumen' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        // Membuat vendor dengan data yang valid
        $vendor = Vendor::create([
            'nama' => $validated['nama'], // Pastikan nama diisi dari validasi
            'kategori' => $validated['kategori'],
            'alamat' => $validated['alamat'],
            'kontak' => $validated['kontak'],
            'harga' => $validated['harga'],
            'deskripsi' => $validated['deskripsi']
        ]);

        // Simpan dokumen vendor
        if ($request->hasFile('dokumen')) {
            $dokumen = $request->file('dokumen');

            // Validasi file
            if ($dokumen->isValid() && $dokumen->getClientOriginalExtension() === 'pdf') {
                $user = User::find($vendor->user_id);
                $path = $this->saveUserFile(
                    $user,
                    $dokumen,
                    'documents'
                );

                $vendor->dokumen_path = $path;
                $vendor->save();
            }
        }

        // ... existing code ...
    }

    // ... other methods ...
}
