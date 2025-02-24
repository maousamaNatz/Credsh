<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'komentar',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Cek apakah user sudah membeli produk
    public static function hasPurchased($userId, $productId)
    {
        return Transaction::where('user_id', $userId)
            ->where('product_id', $productId)
            ->where('status', 'success')
            ->exists();
    }
}
