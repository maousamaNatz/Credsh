<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi massal
    protected $fillable = [
        'category_id',
        'nama',
        'deskripsi',
        'harga',
        'gambar',
        'slug',
        'status',
        'rating',
        'terjual',
        'views',
        'vendor_id', // Mengganti user_id dengan vendor_id
    ];

    // Relasi ke tabel Category
    public function categories()
    {
        return $this->belongsTo(Category::class); // Mengubah relasi menjadi belongsTo
    }

    // Relasi ke tabel User (Vendor)
    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id'); // Mengganti user_id dengan vendor_id
    }

    public function getGambarUrlAttribute()
    {
        return $this->gambar
            ? asset('storage/' . $this->gambar)
            : asset('images/default-product.jpg');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
