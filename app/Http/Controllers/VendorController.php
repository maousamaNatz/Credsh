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
        // ... existing code ...

        // Membuat vendor dengan data yang valid
        $vendor = Vendor::create([
            'nama' => $request->nama,
            'kategori' => $request->kategori,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi
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
