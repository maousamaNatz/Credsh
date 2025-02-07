import React from 'react';
import Layout from '../../Layouts/Layout';

export default function VendorDetailPage({ vendor }) {
    return (
        <Layout>
            <div className="container mx-auto py-12">
                {/* Vendor Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <img
                            src={vendor.gambar}
                            alt={vendor.nama}
                            className="w-full md:w-1/3 h-64 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-4">{vendor.nama}</h1>
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-500 text-xl">★ {vendor.rating}</span>
                                <span className="ml-2 text-gray-500">({vendor.reviews_count} ulasan)</span>
                            </div>
                            <div className="mb-4">
                                <span className="text-pink-600 font-bold text-2xl">
                                    Rp {vendor.harga_mulai} - Mulai dari
                                </span>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
                                    Hubungi Vendor
                                </button>
                                <button className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-50">
                                    Simpan ke Favorit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendor Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
                            <p className="text-gray-600 leading-relaxed">{vendor.deskripsi}</p>
                        </div>

                        {/* Gallery */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-6">Galeri</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {vendor.gallery.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 h-fit sticky top-8">
                        <h2 className="text-2xl font-bold mb-6">Pesan Sekarang</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Tanggal Acara</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Catatan Tambahan</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg h-32"
                                    placeholder="Deskripsi kebutuhan acara..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
                            >
                                Ajukan Pesanan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
