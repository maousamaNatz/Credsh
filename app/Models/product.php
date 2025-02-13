<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'nama_produk',
        'deskripsi',
        'harga',
        'kategori',
        'gambar',
        'status'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function getGambarUrlAttribute()
    {
        return $this->gambar ? asset('storage/'.$this->gambar) : asset('images/default-product.jpg');
    }
}
