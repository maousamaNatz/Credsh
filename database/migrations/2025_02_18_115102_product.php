<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel categories (nullable apabila produk tidak wajib memiliki kategori)
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->decimal('harga', 12, 2);
            $table->text('gambar')->nullable();
            $table->string('slug')->nullable();
            $table->string('status')->default('draft');
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            $table->string('vendor_name')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
