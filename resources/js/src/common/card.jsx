import React from 'react'
import { Link } from '@inertiajs/react'
import Rating from '@/template/ratting'
// Card dasar yang dapat digunakan kembali
export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

// Card untuk vendor
export function VendorCard({ vendor }) {
  return (
    <Card>
      <div className="relative">
        <img
          src={vendor.gambar}
          alt={vendor.nama}
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-pink-600">
          {vendor.kategori}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{vendor.nama}</h3>
        <div className="flex items-center mb-4">
          <Rating rating={vendor.rating} readOnly={true} />
          <span className="ml-2 text-sm text-gray-500">
            ({vendor.reviews} ulasan)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Mulai dari</span>
            <p className="text-lg font-bold text-pink-600">
              Rp {vendor.harga_mulai}
            </p>
          </div>
          <Link
            href={`/vendors/${vendor.id}`}
            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Detail
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  )
}

// Card untuk artikel
export function ArticleCard({ article }) {
  return (
    <Card className="group">
      <div className="relative">
        <img
          src={article.gambar}
          alt={article.judul}
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <span className="text-white text-sm bg-pink-600 px-3 py-1 rounded-full">
            {article.kategori}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-pink-600 transition-colors">
          {article.judul}
        </h3>
        <p className="text-gray-600 line-clamp-3 mb-4">{article.deskripsi}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={article.author_avatar}
              alt={article.author}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm text-gray-600">{article.author}</span>
          </div>
          <Link
            href={`/articles/${article.id}`}
            className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center"
          >
            Baca Selengkapnya
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  )
}

// Card untuk produk
export function ProductCard({ product }) {
  let imageUrl = '/images/placeholder-product.png'

  if (product.gambar) {
    try {
      const cleanedGambar = product.gambar.replace(/\\/g, '')
      const parsedImages = JSON.parse(cleanedGambar)
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        imageUrl = parsedImages[0]
      }
    } catch (error) {
      console.error('Gagal parsing gambar:', error)
      imageUrl = product.gambar || imageUrl
    }
  }

  console.log('URL gambar yang digunakan:', imageUrl)

  return (
    <Card>
      <div className="relative group">
        <img
          src={`storage/${imageUrl}`}
          alt={product.nama}
          className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link
            href={`/products/${product.slug}`}
            className="bg-white text-pink-600 px-4 py-2 rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800">{product.nama}</h3>
          <Rating rating={product.rating} readOnly={true} />
        </div>
        <p className="text-gray-600 text-sm mb-4">
          <span dangerouslySetInnerHTML={{ __html: product.deskripsi }} />
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-pink-600">
            Rp {product.harga}
          </span>
          <span className="text-sm text-gray-500">
            {product.terjual} Terjual
          </span>
        </div>
      </div>
    </Card>
  )
}

// Card untuk testimoni
export function TestimonialCard({ testimonial }) {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.nama}
          className="w-16 h-16 rounded-full border-4 border-pink-100"
        />
        <div>
          <h4 className="font-bold text-gray-800">{testimonial.nama}</h4>
          <Rating rating={testimonial.rating} readOnly={true} />
          <span className="text-sm text-gray-500">{testimonial.tanggal}</span>
        </div>
      </div>
      <blockquote className="relative">
        <svg
          className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative text-gray-600 italic leading-relaxed">
          "{testimonial.komentar}"
        </p>
      </blockquote>
    </Card>
  )
}
