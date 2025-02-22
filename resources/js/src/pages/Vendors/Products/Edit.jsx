import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: product.nama || '',
        deskripsi: product.deskripsi || '',
        harga: product.harga || '',
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('products.update', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Reset form setelah berhasil
                setData({
                    nama: '',
                    deskripsi: '',
                    harga: '',
                    gambar: null
                });
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Produk</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Nama:</label>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={e => setData('nama', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                    />
                    {errors.nama && <div className="text-red-600">{errors.nama}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Deskripsi:</label>
                    <textarea
                        value={data.deskripsi}
                        onChange={e => setData('deskripsi', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        rows="4"
                    />
                    {errors.deskripsi && <div className="text-red-600">{errors.deskripsi}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Harga:</label>
                    <input
                        type="number"
                        value={data.harga}
                        onChange={e => setData('harga', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        min="0"
                        step="1000"
                    />
                    {errors.harga && <div className="text-red-600">{errors.harga}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Gambar:</label>
                    <input
                        type="file"
                        onChange={e => setData('gambar', e.target.files[0])}
                        className="mt-1 block w-full"
                        accept="image/*"
                    />
                    {errors.gambar && <div className="text-red-600">{errors.gambar}</div>}
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Update Produk'}
                    </button>
                    <Link
                        href={route('products.index')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
