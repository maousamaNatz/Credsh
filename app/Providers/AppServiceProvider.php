<?php

namespace App\Providers;

use App\Models\Rating;
use App\Policies\RatingPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Rating::class => RatingPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Tidak ada layanan yang didaftarkan
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::define('admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('vendor', function ($user) {
            return $user->role === 'vendor';
        });

        Gate::define('update-rating', [RatingPolicy::class, 'update']);
        Gate::define('delete-rating', [RatingPolicy::class, 'delete']);
    }
}
