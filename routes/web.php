<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
// ... existing code ...
Route::get('/', [MainController::class, 'index'])->name('home');
// ... existing code ...

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/vendors/{user}/approve', [AdminController::class, 'approveVendor'])->name('admin.vendors.approve');
    Route::get('/transactions', [AdminController::class, 'transactions'])->name('admin.transactions');
    Route::put('/reports/{report}', [AdminController::class, 'updateReport'])->name('admin.reports.update');
    Route::resource('users', UserController::class);
});

Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::get('/vendor-dashboard', function () {
        return Inertia::render('Vendor/Dashboard');
    })->name('vendor.dashboard');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/my-bookings', function () {
        return Inertia::render('Customer/Bookings');
    })->name('customer.bookings');
});

Route::get('/api/search', [MainController::class, 'search']);
Route::get('/search', [MainController::class, 'show'])->name('search.show');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name(
        'register'
    );
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [
        AuthenticatedSessionController::class,
        'create',
    ])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [
        AuthenticatedSessionController::class,
        'destroy',
    ])->name('logout');
});


require __DIR__ . '/auth.php';
