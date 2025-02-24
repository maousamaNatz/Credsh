<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'required|string|max:500'
        ]);

        if (!Comment::hasPurchased(Auth::id(), $validated['product_id'])) {
            return response()->json([
                'message' => 'Anda harus membeli produk ini sebelum memberikan ulasan'
            ], 403);
        }

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'komentar' => $validated['komentar']
        ]);

        return response()->json([
            'message' => 'Ulasan berhasil ditambahkan',
            'comment' => $comment->load('user')
        ]);
    }

    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Ulasan berhasil dihapus']);
    }
}
