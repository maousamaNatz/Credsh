<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request, $product_slug)
    {
        $product = Product::where('slug', $product_slug)->firstOrFail();

        return Inertia::render('Transactions/Payment', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
        ]);

        // Simpan transaksi
        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'vendor_id' => $validated['vendor_id'],
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => 'pending',
            'transaction_date' => now(),
        ]);

        // Update status booking jika ada
        Booking::where('vendor_id', $validated['vendor_id'])->update(['status' => 'confirmed']);

        return redirect()->route('transactions.invoice', $transaction->id);
    }

    public function invoice(Transaction $transaction)
    {
        return Inertia::render('Transactions/Invoice', [
            'transaction' => $transaction->load('vendor'), // Load vendor untuk informasi lebih lanjut
        ]);
    }
}
