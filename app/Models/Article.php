<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'judul',
        'deskripsi',
        'gambar',
        'status'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
} 