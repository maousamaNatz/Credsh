import React from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/Layout';

function EditProfile() {
    const { user, vendor } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        // Data pengguna
        name: user.name || '',
        email: user.email || '',
        avatar: null,
        // Data vendor (hanya jika user berperan sebagai vendor)
        vendor: {
            nama: vendor ? vendor.nama : user.name,
            alamat: vendor ? vendor.alamat : '',
            deskripsi: vendor ? vendor.deskripsi : '',
            latitude: vendor ? vendor.latitude : '',
            longitude: vendor ? vendor.longitude : '',
            harga_mulai: vendor ? vendor.harga_mulai : ''
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        // Mengirim data ke route update profil
        post(route('profile.update'));
    }

    return (
        <MainLayout auth={auth}>
            <Head title="Edit Profil" />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
                <form onSubmit={handleSubmit}>
                {/* --- Form Data Pengguna --- */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Data Pengguna</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Nama</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="border p-2 w-full"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="border p-2 w-full"
                        />
                        {errors.email && <div className="text-red-600">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Avatar</label>
                        <input
                            type="file"
                            name="avatar"
                            onChange={e => setData('avatar', e.target.files[0])}
                            className="border p-2 w-full"
                        />
                        {errors.avatar && <div className="text-red-600">{errors.avatar}</div>}
                    </div>
                </div>

                {/* --- Form Data Vendor (Ditampilkan jika role adalah vendor) --- */}
                {user.role === 'vendor' && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Data Vendor</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Nama Vendor</label>
                            <input
                                type="text"
                                name="vendor.nama"
                                value={data.vendor.nama}
                                onChange={e => setData('vendor', { ...data.vendor, nama: e.target.value })}
                                className="border p-2 w-full"
                            />
                            {errors['vendor.nama'] && <div className="text-red-600">{errors['vendor.nama']}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Alamat</label>
                            <textarea
                                name="vendor.alamat"
                                value={data.vendor.alamat}
                                onChange={e => setData('vendor', { ...data.vendor, alamat: e.target.value })}
                                className="border p-2 w-full"
                            />
                            {errors['vendor.alamat'] && <div className="text-red-600">{errors['vendor.alamat']}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Deskripsi</label>
                            <textarea
                                name="vendor.deskripsi"
                                value={data.vendor.deskripsi}
                                onChange={e => setData('vendor', { ...data.vendor, deskripsi: e.target.value })}
                                className="border p-2 w-full"
                            />
                            {errors['vendor.deskripsi'] && <div className="text-red-600">{errors['vendor.deskripsi']}</div>}
                        </div>
                        <div className="mb-4 flex space-x-4">
                            <div className="w-1/2">
                                <label className="block mb-1">Latitude</label>
                                <input
                                    type="text"
                                    name="vendor.latitude"
                                    value={data.vendor.latitude}
                                    onChange={e => setData('vendor', { ...data.vendor, latitude: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                {errors['vendor.latitude'] && <div className="text-red-600">{errors['vendor.latitude']}</div>}
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-1">Longitude</label>
                                <input
                                    type="text"
                                    name="vendor.longitude"
                                    value={data.vendor.longitude}
                                    onChange={e => setData('vendor', { ...data.vendor, longitude: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                {errors['vendor.longitude'] && <div className="text-red-600">{errors['vendor.longitude']}</div>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Harga Mulai</label>
                            <input
                                type="number"
                                name="vendor.harga_mulai"
                                value={data.vendor.harga_mulai}
                                onChange={e => setData('vendor', { ...data.vendor, harga_mulai: e.target.value })}
                                className="border p-2 w-full"
                            />
                            {errors['vendor.harga_mulai'] && <div className="text-red-600">{errors['vendor.harga_mulai']}</div>}
                        </div>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {processing ? 'Memproses...' : 'Perbarui Profil'}
                    </button>
                </div>
            </form>
        </div>
        </MainLayout>
    );
}

export default EditProfile;
