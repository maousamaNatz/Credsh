<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Method ini akan dijalankan saat database seeding untuk mengisi data awal
     */
    public function run(): void
    {
        // Membuat user admin default untuk sistem
        // Digunakan sebagai akun superuser yang memiliki akses penuh
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@weddingapps.com',  // Email khusus admin
            'password' => Hash::make('password'), // Enkripsi password menggunakan bcrypt
            'role' => 'admin',                   // Role khusus untuk administrator
            'status' => 'active',                // Status aktif untuk memastikan akun bisa digunakan
            'email_verified_at' => now(),        // Verifikasi email otomatis saat seeding
            'verification_token' => null         // Tidak membutuhkan token verifikasi
        ]);

        // Membuat contoh vendor untuk demonstrasi fitur
        // Menunjukkan bagaimana data vendor disimpan dengan detail tambahan
        User::factory()->create([
            'name' => 'Vendor Contoh',
            'email' => 'vendor@weddingapps.com', // Email khusus vendor contoh
            'password' => Hash::make('password'),
            'role' => 'vendor',                  // Role untuk penyedia jasa wedding
            'status' => 'active',
            'email_verified_at' => now(),
            'vendor_details' => [                // Field JSON untuk menyimpan detail bisnis vendor
                'business_name' => 'Wedding Vendor Pro', // Nama bisnis vendor
                'category' => 'Photography'      // Kategori jasa yang ditawarkan
            ]
        ]);

        // Membuat user biasa untuk testing dan demonstrasi
        // Merepresentasikan pengguna umum yang mendaftar di platform
        User::factory()->create([
            'name' => 'User Biasa',
            'email' => 'user@weddingapps.com',   // Email pengguna biasa
            'password' => Hash::make('password'),
            'role' => 'user',                    // Role default untuk pengguna umum
            'status' => 'active',                // Akun aktif secara default
            'email_verified_at' => now()         // Verifikasi email otomatis
        ]);
    }
}
