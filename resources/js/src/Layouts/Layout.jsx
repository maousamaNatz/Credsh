import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, LinkButton, Links } from '@/common/buttons';
import Footer from '@/components/footer';
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

            <Footer />
        </div>
    );
}
