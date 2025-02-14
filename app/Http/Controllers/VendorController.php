<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Traits\FileStorageTrait;

class VendorController extends Controller
{
    use FileStorageTrait;

    public function store(Request $request)
    {
        // ... existing code ...

        // Membuat vendor dengan data yang valid
        $vendor = Vendor::create([
            'nama' => $request->nama,
            'kategori' => $request->kategori,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
            'harga' => $request->harga
        ]);

        // Simpan dokumen vendor
        if ($request->hasFile('dokumen')) {
            $dokumen = $request->file('dokumen');

            // Validasi file
            if ($dokumen->isValid() && $dokumen->getClientOriginalExtension() === 'pdf') {
                $path = $this->saveVendorFile(
                    $vendor->id,
                    $dokumen,
                    $dokumen->getClientOriginalName()
                );

                $vendor->dokumen_path = $path;
                $vendor->save();
            }
        }

        // ... existing code ...
    }

    // ... other methods ...
}
