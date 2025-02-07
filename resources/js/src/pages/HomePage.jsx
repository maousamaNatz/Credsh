import React from 'react';
import Layout from '../Layouts/Layout';
import { Links, LinkButton, Button } from '../common/buttons';
import { IconCamera, IconHeart, IconUtensils, IconGem } from '../common/icons';

export default function HomePage({
     popularVendors, latestArticles,
}) {
    return (
        <Layout>
            {/* Hero Section dengan Background Image */}
            <section className="relative bg-[url('/images/hero-wedding.jpg')] bg-cover bg-center py-32">
                <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
                <div className="container mx-auto text-center px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Wujudkan Pernikahan Impianmu <br/>
                        <span className="text-pink-400">Dengan Mudah</span>
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Temukan vendor profesional, dapatkan inspirasi, dan kelola pernikahanmu dalam satu platform
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <LinkButton href="/vendors" variant="primary" className="px-8 py-4 text-lg">
                            Mulai Sekarang
                        </LinkButton>
                        <LinkButton href="/articles" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white/20">
                            Lihat Inspirasi
                        </LinkButton>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
                            <div className="text-gray-600">Vendor Aktif</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-600 mb-2">1000+</div>
                            <div className="text-gray-600">Pernikahan Sukses</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
                            <div className="text-gray-600">Kota</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-600 mb-2">4.9</div>
                            <div className="text-gray-600">Rating Kepuasan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Layanan Unggulan Kami</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                            <IconCamera className="text-5xl text-pink-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Fotografer</h3>
                            <p className="text-gray-600">Abadikan momen spesialmu dengan fotografer profesional</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                            <IconUtensils className="text-5xl text-pink-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Katering</h3>
                            <p className="text-gray-600">Hidangan lezat untuk para tamu undangan</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                            <IconGem className="text-5xl text-pink-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Dekorasi</h3>
                            <p className="text-gray-600">Dekorasi memukau sesuai tema impianmu</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                            <IconHeart className="text-5xl text-pink-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Wedding Organizer</h3>
                            <p className="text-gray-600">Koordinasi sempurna di hari spesialmu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Vendors Section dengan Card yang Lebih Menarik */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold">Vendor Terpopuler</h2>
                        <Links href="/vendors" className="text-pink-600 hover:text-pink-700">
                            Lihat Semua →
                        </Links>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularVendors.map((vendor) => (
                            <div key={vendor.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <img
                                        src={vendor.gambar}
                                        alt={vendor.nama}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-pink-600">
                                        Top Rated
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">{vendor.nama}</h3>
                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < Math.floor(vendor.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600">({vendor.reviews} ulasan)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-pink-600 font-bold text-lg">Mulai Rp {vendor.harga_mulai}</span>
                                        <LinkButton
                                            href={`/vendors/${vendor.id}`}
                                            variant="outline"
                                            className="text-sm"
                                        >
                                            Lihat Detail
                                        </LinkButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Section dengan Card yang Lebih Menarik */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold">Inspirasi & Tips</h2>
                        <Links href="/articles" className="text-pink-600 hover:text-pink-700">
                            Lihat Semua →
                        </Links>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestArticles.map((article) => (
                            <div key={article.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={article.gambar}
                                        alt={article.judul}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <div className="text-white text-sm">Tips & Inspirasi</div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-600 transition-colors">
                                        {article.judul}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4">{article.deskripsi}</p>
                                    <LinkButton
                                        href={`/articles/${article.id}`}
                                        variant="outline"
                                        className="w-full text-center"
                                    >
                                        Baca Selengkapnya
                                    </LinkButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section dengan Background Gradient */}
            <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Mulai Rencanakan Pernikahan Impianmu
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Daftar sekarang dan dapatkan penawaran khusus dari vendor pilihan kami
                    </p>
                    <div className="flex gap-4 justify-center">
                        <LinkButton href="/register" variant="secondary" className="px-8 py-4 text-lg">
                            Daftar Gratis
                        </LinkButton>
                        <LinkButton
                            href="/contact"
                            variant="outline"
                            className="px-8 py-4 text-lg border-white text-white hover:bg-white/10"
                        >
                            Hubungi Kami
                        </LinkButton>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
