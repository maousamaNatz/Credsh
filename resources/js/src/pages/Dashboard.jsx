import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/dashboardLayouts';

export default function Dashboard({ stats }) {
    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistik Utama */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">Statistik Sistem</h1>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                <div className="bg-yellow-100 p-4 rounded-lg">
                                    <h3 className="text-yellow-800 font-semibold">Total Pengguna</h3>
                                    <p className="text-3xl">{stats.total_users}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manajemen Konten */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Manajemen Vendor</h2>
                                <div className="space-y-4">
                                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Tambah Vendor Baru
                                    </button>
                                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        Kelola Vendor Aktif
                                    </button>
                                    <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                                        Review Vendor
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Manajemen Pesanan</h2>
                                <div className="space-y-4">
                                    <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                                        Pesanan Baru
                                    </button>
                                    <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                        Pesanan Dalam Proses
                                    </button>
                                    <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                                        Riwayat Pesanan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manajemen Website */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Konten Website</h2>
                                <div className="space-y-3">
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Kelola Banner
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Kelola Artikel
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Kelola Testimonial
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Pengaturan</h2>
                                <div className="space-y-3">
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Pengaturan Website
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Pengaturan SEO
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Pengaturan Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Laporan</h2>
                                <div className="space-y-3">
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Laporan Keuangan
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Laporan Vendor
                                    </button>
                                    <button className="w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                                        Laporan Pengguna
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
