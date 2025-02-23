import React from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import { ProductCard } from "@/common/card";
const CartItem = ({ item }) => {
  return (
    <li className="flex justify-between items-center py-4 hover:bg-gray-50 transition duration-200">
      <Link
        href={`/products/${item.product.slug}`}
        className="text-lg text-gray-700 hover:text-blue-500 font-semibold"
      >
        {item.product.nama}
      </Link>
      <span className="text-lg font-bold text-gray-900">{item.quantity} pcs</span>
    </li>
  )
}

const CartIndex = ({ cartItems = [] }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Keranjang Belanja Anda
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <p className="text-gray-600 text-xl mb-4">Keranjang Anda kosong.</p>
            <p className="text-gray-500 mb-6">
              Temukan produk yang Anda suka dan tambahkan ke keranjang.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition hover:bg-blue-700 shadow-md"
                aria-label="Belanja Sekarang"
              >
                Belanja Sekarang
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map((item) => (
                <ProductCard key={item.id} product={{ ...item.product, quantity: item.quantity }} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/checkout"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-bold transition hover:bg-green-700 shadow-md"
                aria-label="Proses Pembayaran"
              >
                Proses Pembayaran
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default CartIndex
