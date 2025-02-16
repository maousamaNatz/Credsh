import React, { useState } from 'react';
import Sidebar from '@/components/sidebarDashboard';
import NavbarDashboard from '@/components/navbarDashboard';
import FooterDashboard from '@/components/FooterDashboard';
import Loading from '@/common/loading';
import { usePage } from '@inertiajs/react';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { processing } = usePage().props;

    const toggleSidebar = () => {
        setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Loading */}
            {processing && <Loading message="Memuat" type="default" />}

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <NavbarDashboard toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                    <FooterDashboard />
                </main>
            </div>
        </div>
    );
}
