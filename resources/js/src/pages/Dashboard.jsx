import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/dashboardLayouts';

export default function Dashboard({ stats }) {
    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">Statistik Sistem</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <h3 className="text-blue-800 font-semibold">Total Booking</h3>
                                    <p className="text-3xl">{stats.total_bookings}</p>
                            </div>
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <h3 className="text-green-800 font-semibold">Vendor Aktif</h3>
                                    <p className="text-3xl">{stats.active_vendors}</p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-lg">
                                    <h3 className="text-purple-800 font-semibold">Total Pendapatan</h3>
                                    <p className="text-3xl">Rp{stats.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
