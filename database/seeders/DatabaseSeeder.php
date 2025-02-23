<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Method ini akan dijalankan saat database seeding untuk mengisi data awal
     */
    public function run(): void
    {
        // Membuat user admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
            'verification_token' => null,
            'avatar' => null,
            'google_id' => null,
        ]);

        // User biasa
        $users = [
            [
                'name' => 'Andi',
                'email' => 'andi@weddingapps.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'status' => 'active'
            ],
            [
                'name' => 'Budi',
                'email' => 'budi@weddingapps.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'status' => 'active'
            ],
            [
                'name' => 'Citra',
                'email' => 'citra@weddingapps.com',
                'password' => Hash::make('password'),
                'role' => 'vendor',
                'status' => 'active'
            ],
            [
                'name' => 'Dewi',
                'email' => 'dewi@weddingapps.com',
                'password' => Hash::make('password'),
                'role' => 'vendor',
                'status' => 'active'
            ],
        ];
        foreach ($users as $user) {
            User::create(array_merge($user, [
                'email_verified_at' => now(),
                'verification_token' => null,
                'avatar' => null,
                'google_id' => null,
            ]));
        }

        // Data vendor
        $vendors = [
            [
                'user_id' => 2,
                'nama' => 'Fotografi Andi',
                'alamat' => 'Jl. Sudirman No.123, Jakarta',
                'deskripsi' => 'Fotografer profesional',
                'latitude' => -6.2087634,
                'longitude' => 106.8455999,
                'harga_mulai' => 5000000,
                'status' => true,
                'rating' => 4.8
            ],
            [
                'user_id' => 3,
                'nama' => 'Katering Budi',
                'alamat' => 'Jl. Sudirman No.123, Jakarta',
                'deskripsi' => 'Katering profesional',
                'latitude' => -6.2087634,
                'longitude' => 106.8455999,
                'harga_mulai' => 5000000,
                'status' => true,
                'rating' => 4.8
            ],
            [
                'user_id' => 4,
                'nama' => 'Dekorasi Citra',
                'alamat' => 'Jl. Sudirman No.123, Jakarta',
                'deskripsi' => 'Katering profesional',
                'latitude' => -6.2087634,
                'longitude' => 106.8455999,
                'harga_mulai' => 5000000,
                'status' => true,
                'rating' => 4.8
            ],
            [
                'user_id' => 5,
                'nama' => 'Venue Dewi',
                'alamat' => 'Jl. Sudirman No.123, Jakarta',
                'deskripsi' => 'Katering profesional',
                'latitude' => -6.2087634,
                'longitude' => 106.8455999,
                'harga_mulai' => 5000000,
                'status' => true,
                'rating' => 4.8
            ],
            // ... tambahkan vendor lainnya
        ];

        foreach ($vendors as $vendor) {
            Vendor::create($vendor);
        }

        // Kategori
        $categories = [
            ['nama' => 'Fotografi', 'deskripsi' => 'Jasa fotografi profesional untuk menangkap momen spesial.'],
            ['nama' => 'Videografi', 'deskripsi' => 'Layanan videografi berkualitas untuk merekam acara pernikahan.'],
            ['nama' => 'Katering', 'deskripsi' => 'Penyedia layanan katering lengkap dengan menu istimewa.'],
            ['nama' => 'Dekorasi', 'deskripsi' => 'Layanan dekorasi kreatif untuk menghias venue pernikahan.'],
            ['nama' => 'Rias Pengantin', 'deskripsi' => 'Jasa rias pengantin agar tampil memukau di hari spesial.'],
            ['nama' => 'Hiburan', 'deskripsi' => 'Penyedia hiburan untuk menambah keseruan acara pernikahan.'],
            ['nama' => 'Venue', 'deskripsi' => 'Tempat pernikahan yang elegan dan nyaman.'],
            ['nama' => 'Undangan', 'deskripsi' => 'Desain undangan pernikahan yang unik dan menarik.'],
            // ... tambahkan kategori lainnya jika diperlukan
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
