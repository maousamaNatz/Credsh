<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RattingProductsController extends Controller
{
    /**
     * Menampilkan semua komentar untuk produk
     */
    public function index($productId)
    {
        $comments = Comment::with('user')
            ->where('product_id', $productId)
            ->latest()
            ->paginate(10);

        return response()->json($comments);
    }

    /**
     * Menyimpan komentar dan rating baru untuk produk
     */
    public function store(Request $request, $productId)
    {
        $validated = $request->validate([
            'komentar' => 'required|string|max:500',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $comment = Comment::create([
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'komentar' => $validated['komentar'],
            'rating' => $validated['rating'],
        ]);

        return response()->json([
            'message' => 'Komentar berhasil ditambahkan',
            'comment' => $comment->load('user')
        ], 201);
    }

    /**
     * Mengupdate komentar
     */
    public function update(Request $request, Rating $rating)
    {
        $this->authorize('update', $rating);

        $validated = $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string|max:500'
        ]);

        $rating->update($validated);

        return response()->json([
            'message' => 'Komentar berhasil diperbarui',
            'rating' => $rating
        ]);
    }

    /**
     * Menghapus komentar
     */
    public function destroy(Rating $rating)
    {
        $this->authorize('delete', $rating);

        $rating->delete();
        return response()->json(['message' => 'Komentar berhasil dihapus']);
    }
}
