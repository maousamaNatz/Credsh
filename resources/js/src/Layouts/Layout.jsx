import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, LinkButton, Links } from '@/common/buttons';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

// Default export untuk layout utama
export default function MainLayout({ children, auth, notifications, flash }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isLoggedIn = false; // Ganti dengan state autentikasi sebenarnya

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar auth={auth} notifications={notifications} flash={flash} />

            <main className="py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
