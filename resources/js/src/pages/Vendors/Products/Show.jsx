import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
export default function Show({ product }) {
  // Format harga dengan format mata uang Indonesia
  const formattedHarga = Number(product.harga).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  // Ambil gambar produk dari database (diasumsikan product.gambar berupa JSON string)
  const images = product.gambar ? JSON.parse(product.gambar) : [];
  const imageUrl = images.length > 0 ? images[0] : '/default-product-image.jpg';

  return (
    <Layout>
      <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 md:space-y-0 md:space-x-8">
        {/* Bagian Gambar */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={imageUrl}
            alt={product.nama}
            className="w-3/4 md:w-full rounded-lg shadow-md object-cover border border-gray-300"
          />
        </div>

        {/* Bagian Detail */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">{product.nama}</h2>
            <p className="text-gray-600 text-sm mt-2">Dari: {product.vendor_name}</p>

            <div className="text-gray-700 mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.deskripsi || 'Deskripsi produk tidak tersedia.' }}></div>
          </div>

          <div className="mt-6">
            <p className="text-3xl text-amber-600 font-semibold">{formattedHarga}</p>

            <div className="mt-6 flex space-x-4">
              <button className="bg-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium transition-all hover:bg-gray-400">
                Tambah ke Wishlist
              </button>
              <button className="bg-amber-500 text-white px-5 py-3 rounded-lg font-medium transition-all hover:bg-amber-600">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
