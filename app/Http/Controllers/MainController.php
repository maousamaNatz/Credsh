<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Article;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        // Data dummy untuk popular vendors
        $popularVendors = [
            [
                'id' => 1,
                'nama' => 'Vendor Fotografi A',
                'gambar' => 'https://placehold.co/300x200',
                'rating' => 4.8,
                'reviews' => 120,
                'harga_mulai' => '5.000.000'
            ],
            [
                'id' => 2,
                'nama' => 'Vendor Katering B',
                'gambar' => 'https://placehold.co/300x200',
                'rating' => 4.6,
                'reviews' => 98,
                'harga_mulai' => '15.000.000'
            ],
            [
                'id' => 3,
                'nama' => 'Vendor Dekorasi C',
                'gambar' => 'https://placehold.co/300x200',
                'rating' => 4.9,
                'reviews' => 150,
                'harga_mulai' => '10.000.000'
            ]
        ];

        // Data dummy untuk artikel terbaru
        $latestArticles = [
            [
                'id' => 1,
                'judul' => 'Tips Memilih Vendor Pernikahan',
                'deskripsi' => 'Panduan lengkap memilih vendor pernikahan yang tepat sesuai budget',
                'gambar' => 'https://placehold.co/300x200'
            ],
            [
                'id' => 2,
                'judul' => 'Inspirasi Dekorasi Outdoor',
                'deskripsi' => 'Kumpulan ide dekorasi pernikahan outdoor yang memukau',
                'gambar' => 'https://placehold.co/300x200'
            ],
            [
                'id' => 3,
                'judul' => 'Persiapan Sebelum Hari-H',
                'deskripsi' => 'Checklist lengkap yang harus dipersiapkan menjelang hari pernikahan',
                'gambar' => 'https://placehold.co/300x200'
            ]
        ];

        return Inertia::render('HomePage', [
            'popularVendors' => $popularVendors,
            'latestArticles' => $latestArticles
        ]);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (empty($query)) {
            return response()->json([
                'vendors' => [],
                'articles' => []
            ]);
        }

        $vendors = Vendor::where('nama', 'like', "%{$query}%")
            ->orWhere('kategori', 'like', "%{$query}%")
            ->orWhere('lokasi', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'nama', 'kategori', 'lokasi'])
            ->map(function ($vendor) {
                return [
                    'id' => $vendor->id,
                    'nama' => $vendor->nama,
                    'kategori' => $vendor->kategori,
                    'lokasi' => $vendor->lokasi,
                    'type' => 'vendor',
                    'url' => route('vendors.show', $vendor->id)
                ];
            });

        $articles = Article::where('judul', 'like', "%{$query}%")
            ->orWhere('deskripsi', 'like', "%{$query}%")
            ->limit(3)
            ->get(['id', 'judul'])
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'judul' => $article->judul,
                    'type' => 'article',
                    'url' => route('articles.show', $article->id)
                ];
            });

        return response()->json([
            'vendors' => $vendors,
            'articles' => $articles
        ]);
    }

    public function show(Request $request)
    {
        $query = $request->input('q');

        $vendors = Vendor::where('nama', 'like', "%{$query}%")
            ->orWhere('kategori', 'like', "%{$query}%")
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
