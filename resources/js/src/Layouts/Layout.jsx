import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, LinkButton, Links } from '../common/buttons';
import Navbar from '@/Components/Navbar';

export default function MainLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isLoggedIn = false; // Ganti dengan state autentikasi sebenarnya

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <main className="py-4">
                {children}
            </main>

            <footer className="bg-white shadow mt-8">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-gray-600">
                    © 2024 WeddingApps - All rights reserved
                </div>
            </footer>
        </div>
    );
}
