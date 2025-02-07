import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, LinkButton, Links } from '../common/buttons';
import Navbar from '../components/navbar';
export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isLoggedIn = false; // Ganti dengan state autentikasi sebenarnya

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Navbar />
            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-16">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">WeddingApps</h3>
                            <p className="text-gray-400">
                                Platform terpercaya untuk menemukan vendor pernikahan terbaik
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Perusahaan</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/about">Tentang Kami</Link></li>
                                <li><Link href="/contact">Kontak</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Layanan</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/vendors">Cari Vendor</Link></li>
                                <li><Link href="/articles">Artikel</Link></li>
                                <li><Link href="/pricing">Paket Harga</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/privacy">Kebijakan Privasi</Link></li>
                                <li><Link href="/terms">Syarat & Ketentuan</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        © {new Date().getFullYear()} WeddingApps. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
