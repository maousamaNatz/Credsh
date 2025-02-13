<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama',
        'deskripsi',
        'alamat',
        'negara',
        'kode_pos',
        'telepon',
        'nama_manager',
        'gambar',
        'status',
        'kategori',
        'lokasi'
    ];

    protected $casts = [
        'portfolio' => 'array',
        'bank_account' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function getGambarUrlAttribute()
    {
        return $this->gambar ? asset('storage/'.$this->gambar) : asset('images/default-vendor.jpg');
    }
}
