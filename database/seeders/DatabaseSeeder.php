<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat admin default
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@weddingapps.com',
            'password' => Hash::make('password'), // Pastikan menggunakan Hash
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(), // Pastikan email terverifikasi
            'verification_token' => null
        ]);

        // Buat vendor contoh
        User::factory()->create([
            'name' => 'Vendor Contoh',
            'email' => 'vendor@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'vendor',
            'status' => 'active',
            'email_verified_at' => now(),
            'vendor_details' => [
                'business_name' => 'Wedding Vendor Pro',
                'category' => 'Photography'
            ]
        ]);

        // Buat user biasa
        User::factory()->create([
            'name' => 'User Biasa',
            'email' => 'user@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'status' => 'active',
            'email_verified_at' => now()
        ]);
    }
}
