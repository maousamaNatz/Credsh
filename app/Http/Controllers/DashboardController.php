<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Booking;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_bookings' => Booking::count(),
                'active_vendors' => Vendor::where('status', 'active')->count(),
                'revenue' => Booking::sum('total_harga'),
            ]
        ]);
    }
}
