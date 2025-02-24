<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Booking;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request, $product_slug)
    {
        $product = Product::where('slug', $product_slug)->firstOrFail();

        return Inertia::render('Payment', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'payment_method' => 'required|string|in:bank_transfer,credit_card,e_wallet',
                'transaction_date' => 'required|date|after_or_equal:today',
            ]);

            DB::beginTransaction();

            // Ambil product dan vendor_id dari product
            $product = Product::with('vendor')->findOrFail($validated['product_id']);
            $vendorId = $product->vendor->id;

            // Hitung total amount
            $totalAmount = $product->harga * $validated['quantity'];

            // Hitung komisi (10% dari amount)
            $commissionRate = 10.00;
            $commissionAmount = ($totalAmount * $commissionRate) / 100;

            // Simpan transaksi
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'vendor_id' => $vendorId,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
                'amount' => $totalAmount,
                'status' => 'pending',
                'payment_method' => $validated['payment_method'],
                'commission_rate' => $commissionRate,
                'commission_amount' => $commissionAmount,
                'escrow_released' => false,
                'transaction_date' => $validated['transaction_date']
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil dibuat',
                'transaction_id' => $transaction->id
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('Transaction Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat membuat transaksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function payment(Transaction $transaction)
    {
        // Load relasi yang diperlukan
        $transaction->load(['product', 'vendor', 'user']);

        return Inertia::render('Payment', [
            'transaction' => $transaction
        ]);
    }

    public function invoice(Transaction $transaction)
    {
        $transaction->load(['vendor', 'product', 'user']);

        return Inertia::render('invoice', [
            'transaction' => $transaction
        ]);
    }

    public function history()
    {
        $transactions = Transaction::with(['vendor'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Transactions/History', [
            'transactions' => $transactions
        ]);
    }

    // Tambahkan method untuk vendor melihat daftar transaksi
    public function vendorTransactions()
    {
        $vendor = Vendor::where('user_id', Auth::id())->firstOrFail();

        $transactions = Transaction::with(['user', 'product'])
            ->where('vendor_id', $vendor->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Vendor/Transactions', [
            'transactions' => $transactions
        ]);
    }

    public function process(Request $request, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $transaction->update([
                'status' => 'success',
                'paid_at' => now(),
            ]);

            // Tambah counter penjualan produk sesuai quantity
            if($transaction->product && $transaction->quantity > 0) {
                $transaction->product()->increment('terjual', $transaction->quantity);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'invoice_url' => route('transactions.invoice', $transaction)
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses pembayaran'
            ], 500);
        }
    }
}
