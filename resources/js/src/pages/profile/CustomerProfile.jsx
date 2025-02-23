import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
const CustomerProfile = ({ user, cartItems = [] }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Profil Pengguna</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informasi Profil Pengguna */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-gray-500">
                {user.nama && user.nama.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.nama}</h2>
              <p className="text-sm text-gray-500">Pengguna Terdaftar</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Nomor Telepon:</span> {user.no_telepon}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Alamat:</span> {user.alamat}
            </p>
          </div>
        </div>

        {/* Saldo Pengguna */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Saldo Anda</h3>
            <p className="text-white text-3xl font-extrabold">
              Rp {Number(user.saldo || 0).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/top-up"
              className="inline-block bg-white text-blue-500 px-5 py-2 rounded-full font-semibold transition hover:bg-gray-100"
            >
              Top Up Saldo
            </Link>
          </div>
        </div>
      </div>

      {/* Keranjang Belanja */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Keranjang Belanja</h2>
        {cartItems.length > 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Produk dalam Keranjang</h3>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4">
                  <span className="text-lg text-gray-700">{item.nama}</span>
                  <span className="text-lg font-bold text-gray-900">
                    Rp {Number(item.harga).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Link
                href="/checkout"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition hover:bg-blue-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-600 text-xl">Keranjang Anda kosong.</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition hover:bg-blue-700"
              >
                Belanja Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default CustomerProfile;
