<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Report;
use App\Models\Vendor;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Dashboard Admin
    public function dashboard()
    {
        $reportsData = Report::with(['reporter', 'reportedUser'])
            ->latest()
            ->limit(5)
            ->get()
            ->toArray();

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_vendors' => Vendor::count(),
                'total_transactions' => Transaction::sum('amount'),
                'open_reports' => Report::where('status', '!=', 'resolved')->count()
            ],
            'recentReports' => $reportsData
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
