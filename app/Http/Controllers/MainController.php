<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Article;
use App\Models\Product;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        // Mengambil data vendor populer dari database
        $popularVendors = Vendor::withCount('bookings') // Menghitung jumlah booking
            ->orderBy('bookings_count', 'desc') // Mengurutkan berdasarkan jumlah booking
            ->limit(3) // Mengambil 3 vendor terpopuler
            ->get(['id', 'nama', 'gambar', 'rating', 'harga_mulai']);

        // Mengambil data artikel terbaru dari database
        $latestArticles = Article::latest()->limit(8)->get(['id', 'judul', 'deskripsi', 'gambar']);

        // Mengambil produk terbaru dari database
        $products = Product::latest()->limit(8)->get(['id', 'nama', 'gambar', 'harga', 'vendor_id', 'deskripsi', 'rating', 'views', 'slug']);

        // Mengambil semua vendor untuk peta dengan latitude dan longitude yang valid
        $mapsVendors = Vendor::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get(['id', 'nama', 'latitude', 'longitude']); // Pastikan untuk mengambil koordinat
        return Inertia::render('HomePage', [
            'popularVendors' => $popularVendors,
            'latestArticles' => $latestArticles,
            'products' => $products,
            'mapsVendors' => $mapsVendors // Mengirimkan data vendor untuk peta
        ]);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (empty($query)) {
            return response()->json([
                'vendors' => [],
                'products' => [],
                'articles' => []
            ]);
        }

        // Pencarian Vendor
        $vendors = Vendor::where('nama', 'like', "%{$query}%")
            ->orWhere('alamat', 'like', "%{$query}%")
            ->orWhere('deskripsi', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'nama', 'alamat', 'deskripsi'])
            ->map(function ($vendor) {
                return [
                    'id' => $vendor->id,
                    'nama' => $vendor->nama,
                    'alamat' => $vendor->alamat,
                    'deskripsi' => $vendor->deskripsi,
                    'type' => 'vendor',
                    'url' => route('vendors.show', $vendor->id)
                ];
            });

        // Pencarian Product
        $products = Product::where('nama', 'like', "%{$query}%")
            ->orWhere('deskripsi', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'nama', 'slug', 'deskripsi'])
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama' => $product->nama,
                    'deskripsi' => $product->deskripsi,
                    'type' => 'product',
                    'url' => route('products.show', $product->slug)
                ];
            });

        // Pencarian Article
        $articles = Article::where('judul', 'like', "%{$query}%")
            ->orWhere('deskripsi', 'like', "%{$query}%")
            ->limit(3)
            ->get(['id', 'judul', 'deskripsi'])
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'judul' => $article->judul,
                    'type' => 'article',
                    'url' => route('articles.show', $article->id)
                ];
            });

        // Gabungkan semua hasil pencarian
        $allResults = [
            'vendors' => $vendors,
            'products' => $products,
            'articles' => $articles
        ];

        return response()->json($allResults);
    }

    public function show(Request $request)
    {
        $query = $request->input('q');

        $vendors = Vendor::where('nama', 'like', "%{$query}%")
            ->orWhere('lokasi', 'like', "%{$query}%")
            ->paginate(12);

        $articles = Article::where('judul', 'like', "%{$query}%")
            ->orWhere('deskripsi', 'like', "%{$query}%")
            ->paginate(12);

        return Inertia::render('Search/Results', [
            'query' => $query,
            'vendors' => $vendors,
            'articles' => $articles
        ]);
    }
}
