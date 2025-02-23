// Start of Selection
import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import axios from 'axios'

export default function Show({ product, vendor, comments }) {
  const [loading, setLoading] = useState(false)

  console.log('Product data:', product);

  if (!product) {
    return <div className="text-center py-16 text-gray-700">Produk tidak ditemukan.</div>;
  }

  const formattedHarga = Number(product.harga).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const getProductImages = () => {
    try {
      if (Array.isArray(product.gambar)) return product.gambar;
      return product.gambar ? JSON.parse(product.gambar) : [];
    } catch (error) {
      return [];
    }
  };

  const images = getProductImages();
  const imageUrl = images.length > 0 ? `/storage/${images[0]}` : '/default-product-image.jpg';

  const addToCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post(route('cart.add', { productId: product.id }), {
        quantity: 1,
      });

      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert('Produk berhasil ditambahkan ke keranjang!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Gagal menambahkan produk ke keranjang.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Detail Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gambar Produk */}
          <div className="flex flex-col space-y-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={imageUrl}
                alt={`${product.nama} - Gambar utama`}
                className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                onClick={() => window.open(imageUrl, '_blank')}
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {images.map((img, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={`/storage/${img}`}
                      alt={`${product.nama} - Gambar ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md shadow-sm cursor-pointer transition-transform duration-300 transform hover:scale-105"
                      onClick={() => window.open(`/storage/${img}`, '_blank')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informasi Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{product.nama}</h2>
              <p className="mt-1 text-sm text-gray-500">Dari: {vendor?.nama || 'Vendor tidak tersedia'}</p>
              <div
                className="mt-4 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.deskripsi || 'Deskripsi produk tidak tersedia.',
                }}
              />
            </div>
            <div className="mt-6">
              <p className="text-2xl md:text-3xl text-red-600 font-bold">{formattedHarga}</p>
              <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">

                <button
                  className="w-full sm:flex-1 bg-gray-100 text-gray-800 px-5 py-3 rounded-md font-medium hover:bg-gray-200 transition"
                  onClick={addToCart}
                  disabled={loading}
                >
                  {loading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </button>
                <Link
                  href={route('transactions.payment', { product_slug: product.slug })}
                  className="w-full sm:flex-1 bg-red-600 text-white px-5 py-3 rounded-md font-medium text-center hover:bg-red-700 transition"
                >
                  Beli Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Profil Vendor */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Profil Vendor</h3>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h4 className="text-xl font-bold text-gray-700">{vendor?.nama || 'Vendor tidak tersedia'}</h4>
            <p className="mt-2 text-gray-600">{vendor?.deskripsi || ''}</p>
            <p className="mt-1 text-gray-500">Alamat: {vendor?.alamat || ''}</p>
            <div className="mt-2 flex flex-wrap gap-4">
              <span className="text-gray-500">Rating: {vendor?.rating || '-'}</span>
              <span className="text-gray-500">Harga Mulai: {vendor?.harga_mulai || '-'}</span>
            </div>
          </div>
        </div>

        {/* Komentar Produk */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Komentar</h3>
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((komentar, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-800 font-semibold">{komentar.user_name}</p>
                  <p className="mt-1 text-gray-600">{komentar.teks}</p>
                  <p className="mt-1 text-yellow-600">Rating: {komentar.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Belum ada komentar untuk produk ini.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
// End of Selectio
