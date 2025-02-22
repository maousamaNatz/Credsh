<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'google_id',
        'password',
        'status',
        'role',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login' => 'datetime',
        'status' => 'string',
        'avatar' => 'string',
        'role' => 'string',
    ];

    public function vendor()
    {
        return $this->hasOne(Vendor::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'customer_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isVendor()
    {
        return $this->role === 'vendor';
    }

    public function isCustomer()
    {
        return $this->role === 'customer';
    }

    /**
     * Check if user has specific role
     *
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function vendorProfile()
    {
        return $this->hasOne(Vendor::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function notifications()
    {
        return $this->morphMany(DatabaseNotification::class, 'notifiable')
            ->orderBy('created_at', 'desc');
    }

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? asset("storage/{$this->avatar}") : null;
    }

    public function getDocumentUrlAttribute()
    {
        return $this->document_path ? asset("storage/{$this->document_path}") : null;
    }

    // Relasi ke model Product
    public function products()
    {
        return $this->hasMany(Product::class, 'vendor_id'); // Pastikan 'Product' adalah model yang sesuai
    }
}
