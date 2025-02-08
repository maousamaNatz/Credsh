import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/react'
import Dropdown from "@/common/dropdown";

export default function Navbar() {
  const { auth } = usePage().props;
  const { user } = auth;
  const [selectedLocation, setSelectedLocation] = useState("Jakarta");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  // Membuat komponen trigger untuk dropdown
  const LocationTrigger = () => (
    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
      {isDetecting ? (
        <span className="text-sm">Mendeteksi...</span>
      ) : (
        <>
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span>{user?.role === 'vendor' ? 'Dashboard' : selectedLocation}</span>
          <i className="fas fa-chevron-down ml-2"></i>
        </>
      )}
    </button>
  );

  const locationItems = [
    {
      label: 'Deteksi Lokasi',
      icon: <i className="fas fa-location-arrow mr-2" />,
      onClick: async () => {
        try {
          setIsDetecting(true);
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.province;
            setSelectedLocation(city);
            setIsDetecting(false);
          });
        } catch (error) {
          console.error('Gagal mendeteksi lokasi:', error);
          setIsDetecting(false);
        }
      }
    },
    ...(user?.role === 'vendor' ? [{
      label: 'Dashboard',
      value: 'Dashboard',
      icon: <i className="fas fa-chart-line mr-2" />
    }] : []),
    { label: 'Jakarta', value: 'Jakarta', icon: <i className="fas fa-building mr-2" /> },
    { label: 'Bandung', value: 'Bandung', icon: <i className="fas fa-building mr-2" /> },
    { label: 'Surabaya', value: 'Surabaya', icon: <i className="fas fa-building mr-2" /> },
    { label: 'Bali', value: 'Bali', icon: <i className="fas fa-umbrella-beach mr-2" /> }
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="text-gray-600">
            © {new Date().getFullYear()} Natzsixn. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Dropdown
              trigger={<LocationTrigger />}
              items={locationItems}
              onSelect={(item) => !item.onClick && setSelectedLocation(item.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-8">
              <Link href="/" className="font-gagliane text-3xl text-red-600 hover:text-red-700 transition duration-300">
                CredSh
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/vendors" className="text-gray-600 hover:text-red-600 transition duration-300">Vendor</Link>
                <Link href="/packages" className="text-gray-600 hover:text-red-600 transition duration-300">Packages</Link>
                <Link href="/gallery" className="text-gray-600 hover:text-red-600 transition duration-300">Gallery</Link>
                <Link href="/about" className="text-gray-600 hover:text-red-600 transition duration-300">About</Link>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari vendor pernikahan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-red-600 transition duration-300">
                <i className="fas fa-shopping-cart text-xl"></i>
              </Link>

              {user ? (
                <Dropdown
                  trigger={
                    <button className="flex items-center space-x-2">
                      <span className="text-gray-600">{user.name}</span>
                      <i className="fas fa-chevron-down text-sm text-gray-600"></i>
                    </button>
                  }
                  items={[
                    ...(user.role === 'admin' ? [
                      {
                        label: 'Dashboard',
                        icon: <i className="fas fa-tachometer-alt"></i>,
                        onClick: () => window.location.href = '/dashboard'
                      }
                    ] : []),
                    {
                      label: 'Profile',
                      icon: <i className="fas fa-user"></i>,
                      onClick: () => window.location.href = '/profile'
                    },
                    {
                      label: 'Logout',
                      icon: <i className="fas fa-sign-out-alt"></i>,
                      onClick: () => window.location.href = '/logout'
                    }
                  ]}
                  align="right"
                  type="profile"
                />
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-600 hover:text-red-600 transition duration-300">Login</Link>
                  <Link href="/register" className="text-gray-600 hover:text-red-600 transition duration-300">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto py-3 px-4">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            <Link href="/venue" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-building mr-2"></i>Venue
            </Link>
            <Link href="/catering" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-utensils mr-2"></i>Catering
            </Link>
            <Link href="/decoration" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-paint-brush mr-2"></i>Decoration
            </Link>
            <Link href="/photography" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-camera mr-2"></i>Photography
            </Link>
            <Link href="/makeup" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-magic mr-2"></i>Makeup & Hair
            </Link>
            <Link href="/entertainment" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-music mr-2"></i>Entertainment
            </Link>
            <Link href="/invitation" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-envelope mr-2"></i>Invitation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
