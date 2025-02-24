<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VendorProfileController;
use App\Http\Controllers\RattingProductsController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Route utama
Route::get('/', [MainController::class, 'index'])->name('home');

// Route pencarian
Route::get('/api/search', [MainController::class, 'search']);
Route::get('/search', [MainController::class, 'show'])->name('search.show');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {

        // Membuat transaksi baru
    Route::post('/transactions', [TransactionController::class, 'store'])
    ->name('transactions.store');

    // Halaman pembayaran
    Route::get('/transactions/{transaction}/payment', [TransactionController::class, 'payment'])
        ->name('transactions.payment');

    // Halaman invoice
    Route::get('/transactions/{transaction}/invoice', [TransactionController::class, 'invoice'])
        ->name('transactions.invoice');

    // Riwayat transaksi
    Route::get('/transactions/history', [TransactionController::class, 'history'])
        ->name('transactions.history');

    Route::get('/payments/{product_slug}', [TransactionController::class, 'index'])->name('payments.payment');
    Route::post('/payments/{transaction}', [TransactionController::class, 'payment'])->name('payments.payments');

    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::post('/add/{productId}', [CartController::class, 'addToCart'])->name('cart.add');
        Route::get('/view', [CartController::class, 'viewCart'])->name('cart.view');
        Route::get('/count', [CartController::class, 'count'])->name('cart.count');
        Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
        Route::post('/place-order', [CartController::class, 'placeOrder'])->name('cart.place-order');
    });

    Route::get('/edit-profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::post('/ratings', [RatingController::class, 'store']);
    Route::put('/ratings/{rating}', [RatingController::class, 'update']);
    Route::delete('/ratings/{rating}', [RatingController::class, 'destroy']);

    Route::get('/transactions/payment/{product_slug}', [TransactionController::class, 'index'])->name('transactions.payment');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions/invoice/{transaction}', [TransactionController::class, 'invoice'])->name('transactions.invoice');

    // Di dalam group auth
    Route::post('/transactions/{transaction}/process', [TransactionController::class, 'process'])
        ->name('transactions.process');
});

// Route untuk semua user yang terautentikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/vendor/setup', [ProfileController::class, 'setupVendorProfile'])->name('vendor.setup');
});

// Route khusus vendor
Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::resource('products', ProductController::class)->except(['show']);
    Route::get('/vendor/dashboard', [VendorController::class, 'dashboard'])->name('vendor.dashboard');
});

// Route khusus customer
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/my-bookings', [BookingController::class, 'index'])->name('customer.bookings');
});

// Route khusus admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Users Management
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');

    // Vendors Management
    Route::get('/vendors', [AdminController::class, 'vendors'])->name('admin.vendors');
    Route::post('/vendors/{user}/approve', [AdminController::class, 'approveVendor'])->name('admin.vendors.approve');
    Route::put('/vendors/{vendor}', [AdminController::class, 'updateVendor'])->name('admin.vendors.update');
    Route::delete('/vendors/{vendor}', [AdminController::class, 'deleteVendor'])->name('admin.vendors.delete');

    // Transactions Management
    Route::get('/transactions', [AdminController::class, 'transactions'])->name('admin.transactions');
    Route::put('/transactions/{transaction}', [AdminController::class, 'updateTransaction'])->name('admin.transactions.update');

    // Reports Management
    Route::get('/reports', [AdminController::class, 'reports'])->name('admin.reports');
    Route::put('/reports/{report}', [AdminController::class, 'updateReport'])->name('admin.reports.update');
    // Untuk tampilan rating
});
Route::get('/vendors/{vendor}/ratings', [RatingController::class, 'index']);

Route::post('/products/{product}/comments', [RattingProductsController::class, 'store'])->middleware('auth');

Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Tambahkan route untuk vendors.show
Route::get('/vendors/{vendor}', [VendorController::class, 'show'])->name('vendors.show');

Route::get('view/vendor', function () {
    return Inertia::render('Vendor/ViewVendor');
});

Route::get('/transactions/{transaction_id}/payment', [TransactionController::class, 'payment'])
    ->name('transactions.payment');

Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
Route::get('/browse', function () {
    return Inertia::render('browse');
});

require __DIR__ . '/auth.php';
