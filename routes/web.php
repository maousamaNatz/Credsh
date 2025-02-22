<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VendorProfileController;
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
    Route::get('/edit-profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// Route untuk semua user yang terautentikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/vendor/setup', [ProfileController::class, 'setupVendorProfile'])->name('vendor.setup');
});

// Route khusus vendor
Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::resource('products', ProductController::class);
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
});
require __DIR__ . '/auth.php';
