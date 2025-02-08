import React, { useState } from "react";
import { Link, usePage, router } from '@inertiajs/react'
import Dropdown, { DropdownItem } from "@/common/dropdown";
import { IconMap, IconUtensils, IconCamera, IconMessage, IconCart } from '@/common/icons';
import { SearchBar } from "@/common/search";

export default function Navbar() {
  const { auth } = usePage().props;
  const { user } = auth;
  const [selectedLocation, setSelectedLocation] = useState("Jakarta");
  const [isDetecting, setIsDetecting] = useState(false);

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

  const handleLocationDetect = async () => {
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
  };

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <header className="w-full">
      <div className="bg-gray-100 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="text-gray-600">
            © {new Date().getFullYear()} Natzsixn. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Dropdown trigger={<LocationTrigger />}>
              <DropdownItem onClick={handleLocationDetect}>
                <i className="fas fa-location-arrow mr-2" />
                Deteksi Lokasi
              </DropdownItem>
              {user?.role === 'vendor' && (
                <DropdownItem onClick={() => setSelectedLocation('Dashboard')}>
                  <i className="fas fa-chart-line mr-2" />
                  Dashboard
                </DropdownItem>
              )}
              <DropdownItem onClick={() => setSelectedLocation('Jakarta')}>
                <i className="fas fa-building mr-2" />
                Jakarta
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedLocation('Bandung')}>
                <i className="fas fa-building mr-2" />
                Bandung
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedLocation('Surabaya')}>
                <i className="fas fa-building mr-2" />
                Surabaya
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedLocation('Bali')}>
                <i className="fas fa-umbrella-beach mr-2" />
                Bali
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

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

            <div className="w-full md:w-1/3">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className="text-gray-600 hover:text-red-600 transition duration-300 relative group"
              >
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <IconCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium group-hover:scale-110 transition-transform">
                    0
                  </span>
                </div>
              </Link>

              <Link
                href="/messages"
                className="text-gray-600 hover:text-red-600 transition duration-300 relative group"
              >
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <IconMessage className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium group-hover:scale-110 transition-transform">
                    0
                  </span>
                </div>
              </Link>

              {user ? (
                <Dropdown
                  trigger={
                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.profile_photo_url}
                        alt={user.name}
                      />
                    </button>
                  }
                >
                  <DropdownItem onClick={() => window.location.href = route('profile.edit')}>
                    Profil
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </Dropdown>
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

      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto py-3 px-4">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            <Link href="/venue" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <IconMap className="mr-2 w-4 h-4" />Venue
            </Link>
            <Link href="/catering" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <IconUtensils className="mr-2 w-4 h-4" />Catering
            </Link>
            <Link href="/decoration" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <i className="fas fa-paint-brush mr-2"></i>Decoration
            </Link>
            <Link href="/photography" className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center">
              <IconCamera className="mr-2 w-4 h-4" />Photography
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
