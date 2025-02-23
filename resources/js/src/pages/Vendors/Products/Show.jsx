import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import axios from 'axios'

export default function Show({ product }) {
  const [loading, setLoading] = useState(false)

  // Tambahkan log untuk memeriksa data produk
  console.log('Product data:', product);

  // Pastikan product tidak undefined sebelum melanjutkan
  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

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

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = async () => {
    setLoading(true);
    try {
      // Pastikan product.id tersedia sebelum mengirim request
      const response = await axios.post(route('cart.add', {
        productId: product.id // Pastikan nama parameter sesuai dengan route Laravel
      }), {
        quantity: 1,
      });

      // Handle response lebih robust
      if(response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert('Produk berhasil ditambahkan ke keranjang!');
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error response lebih baik
      const errorMessage = error.response?.data?.message
        || error.message
        || 'Gagal menambahkan produk ke keranjang.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bagian Gambar Produk */}
          <div className="flex flex-col">
            <img
              src={imageUrl}
              alt={`${product.nama} - Gambar utama`}
              className="w-full h-96 object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => window.open(imageUrl, '_blank')}
            />
            {images.length > 1 && (
              <div className="mt-4 flex space-x-3 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`/storage/${img}`}
                    alt={`${product.nama} - Gambar ${index + 1}`}
                    className="w-28 h-28 object-cover rounded-md shadow-sm cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => window.open(`/storage/${img}`, '_blank')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bagian Detail Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">
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
              <p className="text-3xl text-red-600 font-bold">
                {formattedHarga}
              </p>

              <div className="mt-4 flex space-x-4">
                <button className="flex-1 bg-gray-200 text-gray-800 px-5 py-3 rounded-md font-semibold transition hover:bg-gray-300">
                  Chat dengan Vendor
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-800 px-5 py-3 rounded-md font-semibold transition hover:bg-gray-300"
                  onClick={addToCart}
                  disabled={loading}
                >
                  {loading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </button>
                <button className="flex-1 bg-red-600 text-white px-5 py-3 rounded-md font-semibold transition hover:bg-red-700">
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Bagian Komentar Produk */}
        <div className="px-6 mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">Komentar</h3>
          {/* Daftar komentar produk */}
          <div className="mt-4 space-y-4">
            {product.comments && product.comments.length > 0 ? (
              product.comments.map((komentar, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
