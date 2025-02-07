import React from 'react';
import { Link } from '@inertiajs/react';

// Card dasar yang dapat digunakan kembali
export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
            {children}
        </div>
    );
}

// Card untuk vendor
export function VendorCard({ vendor }) {
    return (
        <Card>
            <img
                src={vendor.gambar}
                alt={vendor.nama}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{vendor.nama}</h3>
                <div className="flex items-center mb-3">
                    <span className="text-yellow-500">★ {vendor.rating}</span>
                    <span className="ml-2 text-gray-500">({vendor.reviews} ulasan)</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-pink-600 font-bold">Rp {vendor.harga_mulai}</span>
                    <Link
                        href={`/vendors/${vendor.id}`}
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        Detail →
                    </Link>
                </div>
            </div>
        </Card>
    );
}

// Card untuk artikel
export function ArticleCard({ article }) {
    return (
        <Card className="group">
            <img
                src={article.gambar}
                alt={article.judul}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                    {article.judul}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{article.deskripsi}</p>
                <Link
                    href={`/articles/${article.id}`}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                >
                    Baca Selengkapnya →
                </Link>
            </div>
        </Card>
    );
}

// Card untuk produk
export function ProductCard({ product }) {
    return (
        <Card>
            <img
                src={product.gambar}
                alt={product.nama}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.nama}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.deskripsi_singkat}</p>
                <div className="flex justify-between items-center">
                    <span className="text-pink-600 font-bold">Rp {product.harga}</span>
                    <Link
                        href={`/products/${product.id}`}
                        className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                    >
                        Lihat Detail →
                    </Link>
                </div>
            </div>
        </Card>
    );
}

// Card untuk testimoni
export function TestimonialCard({ testimonial }) {
    return (
        <Card className="p-6">
            <div className="flex items-center mb-4">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.nama}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h4 className="font-semibold">{testimonial.nama}</h4>
                    <div className="flex text-yellow-500">
                        {'★'.repeat(testimonial.rating)}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.komentar}"</p>
        </Card>
    );
}
