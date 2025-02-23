<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['error' => 'Produk tidak ditemukan'], 404);
        }

        // Pastikan quantity tidak nol atau negatif
        $quantity = max(1, $request->quantity);

        $cartItem = Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $productId,
            ],
            [
                'quantity' => $quantity,
            ]
        );

        // Hapus item jika quantity di-set ke 0
        if ($cartItem->quantity < 1) {
            $cartItem->delete();
        }

        // Tambahkan logika untuk memeriksa apakah produk sudah ada di keranjang
        if ($cartItem->wasRecentlyCreated) {
            return redirect()->route('cart.view')->with('message', 'Produk berhasil ditambahkan ke keranjang.');
        } else {
            return redirect()->route('cart.view')->with('message', 'Jumlah produk di keranjang diperbarui.');
        }
    }

    public function viewCart()
    {
        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    public function checkout()
    {
        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();
        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->harga * $item->quantity;
        });

        return Inertia::render('Cart/Checkout', [
            'cartItems' => $cartItems,
            'totalPrice' => $totalPrice,
        ]);
    }

    public function placeOrder(Request $request)
    {
        $cartItems = Cart::where('user_id', Auth::id())->get();
        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->harga * $item->quantity;
        });

        $order = Cart::create([
            'user_id' => Auth::id(),
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        foreach ($cartItems as $item) {
            $order->products()->attach($item->product_id, ['quantity' => $item->quantity]);
        }

        // Hapus keranjang setelah pemesanan
        Cart::where('user_id', Auth::id())->delete();

        return redirect()->route('orders.index')->with('message', 'Pesanan berhasil dibuat.');
    }

    public function count()
    {
        try {
            $cartCount = 0;

            if (Auth::check()) {
                $cartCount = Cart::where('user_id', Auth::id())
                    ->whereHas('product')
                    ->where('quantity', '>', 0)
                    ->count();
            }

            return response()->json([
                'success' => true,
                'count' => $cartCount,
                'message' => 'Cart count retrieved successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching cart count: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memuat jumlah keranjang',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
