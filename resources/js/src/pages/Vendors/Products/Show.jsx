// Start of Selection
import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import axios from 'axios'

export default function Show({ product, vendor, canComment, averageRating, comments }) {
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(5)
  const [commentText, setCommentText] = useState('')

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

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const payload = {
        product_id: product.id,
        quantity: quantity,
        payment_method: 'bank_transfer',
        transaction_date: new Date().toISOString().split('T')[0]
      };

      console.log('Sending payload:', payload);

      const response = await axios.post(route('transactions.store'), payload);

      if (response.data?.transaction_id) {
        window.location.href = route('transactions.payment', {
          transaction_id: response.data.transaction_id
        });
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      const errorMessage = error.response?.data?.message
        || 'Gagal memproses transaksi. Silakan coba lagi.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(route('comments.store'), {
        product_id: product.id,
        rating: rating,
        komentar: commentText
      });

      router.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal mengirim ulasan');
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
              <div className="text-sm text-gray-500">
                Terjual: {product.terjual}
              </div>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="w-full sm:flex-1 bg-red-600 text-white px-5 py-3 rounded-md font-medium text-center hover:bg-red-700 transition"
                  >
                    {loading ? 'Memproses...' : 'Beli Sekarang'}
                  </button>
                </div>
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

        {/* Rating Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4">Ulasan Produk</h3>
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold mr-2">{averageRating}/5</span>
            <RatingStars rating={averageRating} />
            <span className="ml-2 text-gray-600">({product.terjual} terjual)</span>
          </div>

          {/* Comment Form */}
          {canComment && (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1,2,3,4,5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`text-2xl ${rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  name="komentar"
                  className="w-full p-3 border rounded-md"
                  rows="4"
                  placeholder="Tulis ulasan Anda..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
              >
                Kirim Ulasan
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.data.map((comment) => (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {comment.user.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold">{comment.user.name}</h4>
                      <RatingStars rating={comment.rating} />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// RatingStars Component
function RatingStars({ rating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
// End of Selectio
