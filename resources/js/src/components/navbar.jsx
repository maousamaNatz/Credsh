import React, { useState } from "react";
import { Links, LinkButton, Button } from "../common/buttons";
import { Link, usePage } from '@inertiajs/react';
import { SearchBar } from "../common/search";

export default function Navbar() {
    const { auth } = usePage().props;
    const isLoggedIn = auth.user !== null;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implementasi pencarian
        console.log('Mencari:', searchQuery);
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="bg-white shadow-sm py-2">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <Links href="/" className="text-primary text-2xl font-bold text-pink-600">
                            Credsh
                        </Links>

                        {/* Search Bar */}
                        <SearchBar />

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isLoggedIn ? (
                                <div className="flex items-center space-x-4">
                                    <Links href="/profile" className="text-gray-700 hover:text-pink-600">
                                        <span className="flex items-center">
                                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profil
                                        </span>
                                    </Links>
                                    <Links href="/bookings" className="text-gray-700 hover:text-pink-600">
                                        <span className="flex items-center">
                                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Pesanan
                                        </span>
                                    </Links>
                                    <Button variant="outline">Keluar</Button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <LinkButton href="/login" variant="outline">
                                        Masuk
                                    </LinkButton>
                                    <LinkButton href="/register" variant="primary">
                                        Daftar Sekarang
                                    </LinkButton>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden text-gray-600 hover:text-gray-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Bottom Navbar - Menu */}
            <nav className="bg-white shadow-lg">
                <div className="container mx-auto px-6 py-3">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-center space-x-8">
                        <Links href="/vendors" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Vendor Pernikahan
                        </Links>
                        <Links href="/articles" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Inspirasi & Artikel
                        </Links>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 space-y-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Cari vendor atau artikel..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>

                            <Links href="/vendors" className="block px-4 py-2 hover:bg-gray-100 rounded flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Vendor Pernikahan
                            </Links>
                            <Links href="/articles" className="block px-4 py-2 hover:bg-gray-100 rounded flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Inspirasi & Artikel
                            </Links>
                            <div className="border-t pt-4 space-y-4">
                                {isLoggedIn ? (
                                    <>
                                        <Links href="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profil Saya
                                        </Links>
                                        <Links href="/bookings" className="block px-4 py-2 hover:bg-gray-100 rounded flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Pesanan Saya
                                        </Links>
                                        <Button variant="outline" className="w-full">
                                            Keluar
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <LinkButton href="/login" variant="outline" className="w-full">
                                            Masuk
                                        </LinkButton>
                                        <LinkButton href="/register" variant="primary" className="w-full">
                                            Daftar Sekarang
                                        </LinkButton>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
