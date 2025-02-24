import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

const ViewVendor = () => {
    const { vendor, products } = usePage().props;
    const namaDepan = vendor.nama.split(' ')[0]; // Memisahkan nama depan dari full name

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">{namaDepan}</h1>
                    <img src={vendor.gambar} alt={namaDepan} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <p className="text-gray-700 mb-2">Rating: {vendor.rating}</p>
                    <p className="text-gray-700 mb-4">Harga Mulai: {vendor.harga_mulai}</p>
                    <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
                    <p className="text-gray-600">{vendor.deskripsi}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Produk {namaDepan}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map(product => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <img src={product.gambar} alt={product.nama} className="w-full h-32 object-cover rounded mb-2" />
                                <h3 className="font-bold">{product.nama}</h3>
                                <p className="text-gray-600">{product.deskripsi}</p>
                                <p className="text-pink-500">Harga: {product.harga}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewVendor;
