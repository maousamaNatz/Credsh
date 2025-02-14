import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/Layout';

export default function VendorProfile({ user, vendor, auth, notifications, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: null,
        vendor: {
            nama: vendor.nama,
            alamat: vendor.alamat,
            kategori: vendor.kategori,
            lokasi: vendor.lokasi,
            deskripsi: vendor.deskripsi || '',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout auth={auth} notifications={notifications} flash={flash}>
            <Head title="Profil Vendor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Profil Vendor</h2>

                            <form onSubmit={handleSubmit}>
                                {/* Data Pribadi */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Data Pribadi</h3>

                                    <div className="mb-4">
                                        <label className="block mb-2">Foto Profil</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('avatar', e.target.files[0])}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Nama</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Telepon</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                </div>

                                {/* Data Vendor */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Data Vendor</h3>

                                    <div className="mb-4">
                                        <label className="block mb-2">Nama Vendor</label>
                                        <input
                                            type="text"
                                            value={data.vendor.nama}
                                            onChange={e => setData('vendor', { ...data.vendor, nama: e.target.value })}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Alamat</label>
                                        <textarea
                                            value={data.vendor.alamat}
                                            onChange={e => setData('vendor', { ...data.vendor, alamat: e.target.value })}
                                            className="w-full border rounded-md p-2"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Kategori</label>
                                        <select
                                            value={data.vendor.kategori}
                                            onChange={e => setData('vendor', { ...data.vendor, kategori: e.target.value })}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="fotografi">Fotografi</option>
                                            <option value="katering">Katering</option>
                                            <option value="dekorasi">Dekorasi</option>
                                            <option value="venue">Venue</option>
                                            <option value="makeup">Makeup</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Lokasi</label>
                                        <input
                                            type="text"
                                            value={data.vendor.lokasi}
                                            onChange={e => setData('vendor', { ...data.vendor, lokasi: e.target.value })}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2">Deskripsi</label>
                                        <textarea
                                            value={data.vendor.deskripsi}
                                            onChange={e => setData('vendor', { ...data.vendor, deskripsi: e.target.value })}
                                            className="w-full border rounded-md p-2"
                                            rows="4"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Simpan Perubahan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
