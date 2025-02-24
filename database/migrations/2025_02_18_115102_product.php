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
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->decimal('harga', 15, 2);
            $table->text('gambar')->nullable();
            $table->string('slug')->unique();
            $table->enum('status', ['draft', 'active', 'inactive'])->default('draft');
            $table->integer('rating')->default(0);
            $table->integer('terjual')->default(0);
            $table->integer('views')->default(0);
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade'); // Perbaikan
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
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

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('vendor_id')->constrained('vendors');
            $table->foreignId('product_id')->constrained('products');
            $table->integer('quantity');
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['pending', 'success', 'failed', 'dispute'])->default('pending');
            $table->string('payment_method');
            $table->decimal('commission_rate', 5, 2)->default(0);
            $table->decimal('commission_amount', 15, 2)->default(0);
            $table->boolean('escrow_released')->default(false);
            $table->foreignId('reference_id')->nullable(); // Bisa mengacu ke booking_id
            $table->dateTime('transaction_date');
            $table->timestamps();
            $table->index('status');
            $table->index('transaction_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('transactions');
    }
};
