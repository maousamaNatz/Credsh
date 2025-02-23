<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel categories (nullable apabila produk tidak wajib memiliki kategori)
            $table
                ->foreignId('category_id')
                ->nullable()
                ->constrained()
                ->onDelete('set null');
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->decimal('harga', 12, 2);
            $table->text('gambar')->nullable();
            $table->string('slug')->nullable();
            $table->string('status')->default('draft');
            $table->integer('rating')->default(0);
            $table->integer('terjual')->default(0);
            $table->integer('views')->default(0);
            $table
                ->foreignId('vendor_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->string('vendor_name')->nullable();
            $table->timestamps();
        });
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('product_id')
                ->constrained('products')
                ->onDelete('cascade');
            $table
                ->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->text('komentar');
            $table->integer('rating');
            $table->timestamps();
        });

        Schema::create('cart', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('product_id')->constrained('products');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('cart');
    }
};
