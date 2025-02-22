import React from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'

export default function Show({ product }) {
  // Format harga dengan format mata uang Indonesia
  const formattedHarga = Number(product.harga).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  // Ambil gambar produk dari database (perbaikan parsing JSON dan path gambar)
  const getProductImages = () => {
    try {
      if (Array.isArray(product.gambar)) return product.gambar;
      return product.gambar ? JSON.parse(product.gambar) : [];
    } catch (e) {
      return [];
    }
  };

  const images = getProductImages();
  const imageUrl = images.length > 0
    ? `/storage/${images[0]}`
    : '/default-product-image.jpg';

  return (
    <Layout>
      <div className="bg-white p-5 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bagian Gambar Produk */}
          <div className="flex flex-col">
            <img
              src={imageUrl}
              alt={`${product.nama} - Gambar utama`}
              className="w-full h-80 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => window.open(imageUrl, '_blank')}
            />
            {images.length > 1 && (
              <div className="mt-3 flex space-x-2 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`/storage/${img}`}
                    alt={`${product.nama} - Gambar ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md shadow-sm cursor-pointer"
                    onClick={() => window.open(`/storage/${img}`, '_blank')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bagian Detail Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {product.nama}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Dari: {product.vendor_name}
              </p>
              <div className="mt-4 text-gray-700 text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.deskripsi || 'Deskripsi produk tidak tersedia.',
                }}
              />
            </div>

            <div className="mt-6">
              <p className="text-2xl text-red-600 font-bold">
                {formattedHarga}
              </p>

              <div className="mt-4 flex space-x-4">
                <button className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold transition hover:bg-gray-300">
                  Tambah ke Wishlist
                </button>
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md font-semibold transition hover:bg-red-600">
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* Bagian Komentar Produk */}
        <div className="px-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Komentar</h3>
          {/* Daftar komentar produk */}
          <div className="mt-4 space-y-4">
            {product.comments && product.comments.length > 0 ? (
              product.comments.map((komentar, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700 font-semibold">
                    {komentar.user_name}
                  </p>
                  <p className="text-gray-600">{komentar.teks}</p>
                  <p className="text-yellow-500">Rating: {komentar.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                Belum ada komentar untuk produk ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
