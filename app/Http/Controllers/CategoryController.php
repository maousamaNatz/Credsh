<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Menampilkan daftar kategori.
     */
    public function index()
    {
        $categories = Category::latest()->paginate(10);

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Menampilkan form untuk membuat kategori baru.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Menyimpan kategori baru ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')->with('message', 'Kategori berhasil dibuat.');
    }

    /**
     * Menampilkan detail kategori tertentu.
     */
    public function show(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => $category
        ]);
    }

    /**
     * Menampilkan form untuk mengedit kategori.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Memperbarui informasi kategori di database.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')->with('message', 'Kategori berhasil diperbarui.');
    }

    /**
     * Menghapus kategori dari database.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('message', 'Kategori berhasil dihapus.');
    }
}