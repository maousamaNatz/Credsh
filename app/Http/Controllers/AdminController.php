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
            'total_users' => User::count(),
            'total_vendors' => Vendor::count(),
            'revenue' => Transaction::sum('amount') ?? 0
        ];

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats
        ]);
    }

    // Manajemen User
    public function users()
    {
        return Inertia::render('admin/Users', [
            'users' => User::with('vendor')
                ->latest()
                ->paginate(10)
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,vendor,customer',
            'status' => 'required|in:active,inactive'
        ]);

        $user->update($validated);

        return back()->with('message', 'User berhasil diperbarui');
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return back()->with('message', 'User berhasil dihapus');
    }

    // Manajemen Vendor
    public function vendors()
    {
        return Inertia::render('admin/Vendors', [
            'vendors' => Vendor::with('user')
                ->latest()
                ->paginate(10)
        ]);
    }

    public function updateVendor(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string',
            'status' => 'required|in:active,inactive,pending',
            'alamat' => 'required|string',
            'lokasi' => 'required|string'
        ]);

        $vendor->update($validated);

        return back()->with('message', 'Vendor berhasil diperbarui');
    }

    public function deleteVendor(Vendor $vendor)
    {
        $vendor->delete();
        return back()->with('message', 'Vendor berhasil dihapus');
    }

    // Manajemen Transaksi
    public function transactions()
    {
        return Inertia::render('admin/Transactions', [
            'transactions' => Transaction::with(['user', 'vendor'])
                ->latest()
                ->paginate(10)
        ]);
    }

    public function updateTransaction(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,paid,cancelled,refunded',
            'notes' => 'nullable|string'
        ]);

        $transaction->update($validated);

        return back()->with('message', 'Status transaksi berhasil diperbarui');
    }

    // Manajemen Laporan/Reports
    public function reports()
    {
        return Inertia::render('admin/Reports', [
            'reports' => Report::with(['user', 'vendor'])
                ->latest()
                ->paginate(10)
        ]);
    }

    public function updateReport(Request $request, Report $report)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,investigating,resolved',
            'resolution' => 'required_if:status,resolved|nullable|string'
        ]);

        $report->update($validated);

        return back()->with('message', 'Status laporan berhasil diperbarui');
    }
}
