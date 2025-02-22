import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import Loading from '@/common/loading';

// Default export untuk layout utama
export default function MainLayout({ children, auth, notifications, flash }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isLoggedIn = false; // Ganti dengan state autentikasi sebenarnya
    const { processing } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            {processing && <Loading message="Memuat" type="default" />}

            <Navbar auth={auth} notifications={notifications} flash={flash} />

            <main className="py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
