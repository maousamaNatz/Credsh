<?php

namespace Database\Seeders;

use App\Models\User;
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
        // Membuat user admin default untuk sistem
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
            'verification_token' => null,
            'avatar' => null, // Menambahkan field avatar
            'google_id' => null, // Menambahkan field google_id
        ]);

        // Membuat contoh vendor untuk demonstrasi fitur
        User::factory()->create([
            'name' => 'Vendor Contoh',
            'email' => 'vendor@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'vendor',
            'status' => 'active',
            'email_verified_at' => now(),
            'verification_token' => null,
            'avatar' => null, // Menambahkan field avatar
            'google_id' => null, // Menambahkan field google_id
        ]);

        // Membuat user biasa untuk testing dan demonstrasi
        User::factory()->create([
            'name' => 'User Biasa',
            'email' => 'user@weddingapps.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'status' => 'active',
            'email_verified_at' => now(),
            'verification_token' => null,
            'avatar' => null, // Menambahkan field avatar
            'google_id' => null, // Menambahkan field google_id
        ]);

        DB::table('categories')->insert([
            [
                'nama' => 'Fotografi',
                'deskripsi' => 'Kategori untuk layanan fotografi pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Katering',
                'deskripsi' => 'Kategori untuk layanan katering pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Dekorasi',
                'deskripsi' => 'Kategori untuk layanan dekorasi pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Venue',
                'deskripsi' => 'Kategori untuk penyediaan tempat pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Hiburan',
                'deskripsi' => 'Kategori untuk layanan hiburan, seperti band dan DJ.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Transportasi',
                'deskripsi' => 'Kategori untuk layanan transportasi pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Rias Pengantin',
                'deskripsi' => 'Kategori untuk layanan makeup dan rias pengantin.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Perencana Pernikahan',
                'deskripsi' => 'Kategori untuk konsultasi dan perencanaan pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Undangan',
                'deskripsi' => 'Kategori untuk penyediaan desain undangan pernikahan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Musik',
                'deskripsi' => 'Kategori untuk penyediaan layanan musik dan band.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
