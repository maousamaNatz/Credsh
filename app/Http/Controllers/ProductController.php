<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\FileManagerTrait;

class ProductController extends Controller
{
    use FileManagerTrait;

    /**
     * Tampilkan daftar product.
     */
    public function index()
    {
        $products = Product::latest()->paginate(10);

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Tampilkan form untuk membuat product baru.
     */
    public function create()
    {
        $categories = Category::orderBy('nama')->get();

        return Inertia::render('Vendors/Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Simpan product baru ke dalam penyimpanan.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'           => 'required|string|max:255', // Ubah menjadi required
            'deskripsi'      => 'nullable|string',
            'harga'          => 'required|numeric|min:0',
            'gambar'         => 'nullable|array|max:5',
            'gambar.*'       => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id'    => 'nullable|exists:categories,id' // Tambahkan validasi untuk category_id
        ]);

        // Jika nama tidak diisi, berikan nilai default
        if (empty($validated['nama'])) {
            $validated['nama'] = 'Produk tanpa nama';
        }

        $user = auth()->user();

        // Menyimpan gambar jika ada
        if ($request->hasFile('gambar')) {
            $savedImages = [];
            foreach ($request->file('gambar') as $file) {
                $savedImages[] = $this->saveUserFile($user, $file, 'products');
            }
            $validated['gambar'] = json_encode($savedImages);
        }

        // Menambahkan vendor_id dan vendor_name
        $validated['vendor_id'] = $user->id;
        $validated['vendor_name'] = $user->name;
        $validated['slug'] = Str::slug($validated['nama']);

        // Menyimpan produk
        $product = Product::create($validated);

        // Menyimpan kategori jika ada
        if (isset($validated['category_id'])) {
            $product->categories()->sync([$validated['category_id']]); // Sync dengan category_id
        }

        return redirect()->route('products.show', $product->id)->with('message', 'Product berhasil dibuat.');
    }
    /**
     * Tampilkan detail product tertentu.
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Vendors/Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * Tampilkan form untuk mengedit product.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Perbarui data product pada penyimpanan.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'nama'         => 'required|string|max:255',
            'deskripsi'    => 'nullable|string',
            'harga'        => 'required|numeric|min:0',
            'gambar'       => 'nullable|array|max:5',
            'gambar.*'     => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id'  => 'nullable|exists:categories,id',
        ]);

        $user = auth()->user();

        if ($request->hasFile('gambar')) {
            if ($product->gambar) {
                $oldImages = json_decode($product->gambar, true);
                if (is_array($oldImages)) {
                    foreach ($oldImages as $oldImage) {
                        $this->deleteFile($oldImage);
                    }
                }
            }
            $savedImages = [];
            foreach ($request->file('gambar') as $file) {
                $savedImages[] = $this->saveUserFile($user, $file, 'products');
            }
            $validated['gambar'] = json_encode($savedImages);
        }

        $validated['slug'] = Str::slug($validated['nama']);

        $product->update($validated);

        return redirect()->route('products.index')->with('message', 'Product berhasil diperbarui.');
    }

    /**
     * Hapus product dari penyimpanan.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        if ($product->gambar) {
            $images = json_decode($product->gambar, true);
            if (is_array($images)) {
                foreach ($images as $image) {
                    $this->deleteFile($image);
                }
            }
        }

        $product->delete();

        return redirect()->route('products.index')->with('message', 'Product berhasil dihapus.');
    }
}
