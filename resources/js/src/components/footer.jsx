import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Tentang Kami */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-600 text-primary">Credsh</h3>
                        <p className="text-gray-400 mb-4">
                            Platform digital yang menghubungkan calon pengantin dengan vendor pernikahan profesional untuk mewujudkan pernikahan impian Anda.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Layanan</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/venue" className="text-gray-400 hover:text-white">Venue</Link>
                            </li>
                            <li>
                                <Link href="/catering" className="text-gray-400 hover:text-white">Catering</Link>
                            </li>
                            <li>
                                <Link href="/decoration" className="text-gray-400 hover:text-white">Dekorasi</Link>
                            </li>
                            <li>
                                <Link href="/photography" className="text-gray-400 hover:text-white">Fotografi</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Informasi */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Informasi</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white">Hubungi Kami</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-gray-400 hover:text-white">Kebijakan Privasi</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Kontak</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt w-6"></i>
                                <span>Jakarta, Indonesia</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone w-6"></i>
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope w-6"></i>
                                <span>info@weddingapps.com</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-clock w-6"></i>
                                <span>Senin - Jumat: 09:00 - 17:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} WeddingApps. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
