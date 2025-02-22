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
        'alamat',
        'deskripsi',
        'latitude',
        'longitude',
        'harga_mulai',
        'status',
        'rating',
    ];

    protected $casts = [
        'status' => 'boolean',
        'rating' => 'decimal:2'
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
}
