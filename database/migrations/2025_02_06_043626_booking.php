<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->date('tanggal_acara');
            $table->time('waktu_acara')->nullable(); // Tambahan
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed']);
            $table->decimal('total_harga', 15, 2);
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid'); // Tambahan
            $table->text('deskripsi')->nullable();
            $table->text('vendor_notes')->nullable(); // Tambahan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
