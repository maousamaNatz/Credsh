import React from 'react';

export default function FooterDashboard() {
    return (
        <footer className="bg-white shadow">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} WeddingApps. Hak Cipta Dilindungi.
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-gray-600 hover:text-red-600 text-sm">
                            Kebijakan Privasi
                        </a>
                        <a href="#" className="text-gray-600 hover:text-red-600 text-sm">
                            Syarat & Ketentuan
                        </a>
                        <a href="#" className="text-gray-600 hover:text-red-600 text-sm">
                            Bantuan
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
