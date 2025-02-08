<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Report;
use App\Models\Vendor;
use App\Models\Booking;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminController extends Controller
{


    // Dashboard Admin
    public function dashboard()
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'active_vendors' => Vendor::whereHas('user', function($query) {
                $query->where('role', 'vendor')
                      ->where('users.id', auth()->id());
            })->count(),
            'revenue' => Transaction::sum('amount')
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }

    // Approve Vendor
    public function approveVendor(User $user)
    {
        $user->update([
            'status' => 'active',
            'approved_at' => now()
        ]);

        return back()->with('message', 'Vendor approved successfully');
    }

    // Manage Transactions
    public function transactions()
    {
        return Inertia::render('Admin/Transactions', [
            'transactions' => Transaction::with(['user', 'vendor'])
                ->latest()
                ->paginate(20)
        ]);
    }

    // Handle Reports
    public function updateReport(Request $request, Report $report)
    {
        $request->validate([
            'status' => 'required|in:pending,investigating,resolved',
            'resolution' => 'required_if:status,resolved'
        ]);

        $report->update($request->all());

        if($request->status === 'resolved') {
            // Lakukan tindakan sesuai resolusi
        }

        return back()->with('message', 'Report updated');
    }
}
