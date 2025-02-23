<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Vendor;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\FileManagerTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

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
            'products' => $products,
        ]);
    }

    /**
     * Tampilkan form untuk membuat product baru.
     */
    public function create()
    {
        $categories = Category::orderBy('nama')->get();

        return Inertia::render('Vendors/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Simpan product baru ke dalam penyimpanan.
     */
    public function store(Request $request)
    {
        if (Gate::allows('vendor')) {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'deskripsi' => 'nullable|string',
                'harga' => 'required|numeric|min:0',
                'gambar' => 'nullable|array|max:5',
                'gambar.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            $user = auth()->user();
            $validated['vendor_id'] = $user->id; // Menggunakan vendor_id dari user yang sedang login
            $validated['slug'] = Str::slug($validated['nama']);

            // Perbaikan: Encode array gambar ke JSON
            if ($request->hasFile('gambar')) {
                $savedImages = [];
                foreach ($request->file('gambar') as $file) {
                    $path = $this->saveUserFile($user, $file, 'products');
                    $savedImages[] = $path;
                }
                $validated['gambar'] = json_encode($savedImages); // Convert array ke JSON string
            }

            // Menyimpan produk
            $product = Product::create($validated);

            // Menyimpan kategori jika ada
            if (isset($validated['category_id'])) {
                $product->categories()->sync([$validated['category_id']]); // Sync dengan category_id
            }

            return redirect()
                ->route('products.show', $product->slug)
                ->with('message', 'Product berhasil dibuat.');
        }
        return redirect()
            ->route('products.index')
            ->with(
                'message',
                'Anda tidak memiliki akses untuk membuat product.'
            );
    }

    /**
     * Tampilkan detail product tertentu.
     */
    public function show(string $slug)
    {        $product = Product::where('slug', $slug)->firstOrFail();

        $vendor = Vendor::where('user_id', $product->vendor_id)->firstOrFail();
        $comments = Comment::where('product_id', $product->id)->get();

        // Pastikan gambar dapat diakses
        return Inertia::render('Vendors/Products/Show', [
            'product' => $product,
            'vendor' => $vendor,
            'comments' => $comments,
        ]);
    }

    /**
     * Tampilkan form untuk mengedit product.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);

        $comments = Comment::where('product_id', $product->id)->get();

        return Inertia::render('Vendors/Products/Edit', [
            'product' => $product,
            'comments' => $comments,
        ]);
    }

    /**
     * Perbarui data product pada penyimpanan.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric|min:0',
            'gambar' => 'nullable|array|max:5',
            'gambar.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'nullable|exists:categories,id',
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

        return redirect()
            ->route('products.index')
            ->with('message', 'Product berhasil diperbarui.');
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

        return redirect()
            ->route('products.index')
            ->with('message', 'Product berhasil dihapus.');
    }

    /**
     * Proses pembelian produk.
     */
    public function buy(Request $request, string $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($id);

        // Logika untuk menyimpan pembelian, misalnya ke model Order
        // Misalkan kita memiliki model Order
        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total_price' => $product->harga * $validated['quantity'],
            'status' => 'pending', // Status awal
        ]);

        return redirect()->route('orders.index')->with('message', 'Pembelian berhasil dilakukan.');
    }
}
