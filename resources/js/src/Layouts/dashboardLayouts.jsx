import React, { useState } from 'react';
import Sidebar from '@/components/sidebarDashboard';
import NavbarDashboard from '@/components/navbarDashboard';
import footerDashboard from '@/components/footerDashboard';
export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <NavbarDashboard />

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                    <footerDashboard />
                </main>
            </div>
        </div>
    );
}
