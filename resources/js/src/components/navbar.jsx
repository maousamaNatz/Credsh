import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Dropdown, { DropdownItem } from "@/common/dropdown";
import {
    IconMap,
    IconUtensils,
    IconCamera,
    IconMessage,
    IconCart,
    IconBell,
} from "@/common/icons";
import { SearchBar } from "@/common/search";

export default function Navbar() {
    const { auth } = usePage().props;
    const { user } = auth;
    const [selectedLocation, setSelectedLocation] = useState("Jakarta");
    const [isDetecting, setIsDetecting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const LocationTrigger = () => (
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm md:text-base">
            {isDetecting ? (
                <span className="text-sm">Mendeteksi...</span>
            ) : (
                <>
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span className="truncate max-w-[120px] md:max-w-[150px] lg:max-w-none">
                        {user?.role === "vendor"
                            ? "Dashboard"
                            : selectedLocation}
                    </span>
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
            console.error("Gagal mendeteksi lokasi:", error);
            setIsDetecting(false);
        }
    };

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-gray-100 py-2 px-4">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
                    <div className="text-gray-600 order-1 sm:order-none text-center sm:text-left">
                        © {new Date().getFullYear()} Natzsixn. All rights
                        reserved.
                    </div>
                    <div className="flex items-center space-x-4 order-2 sm:order-none">
                        <Dropdown
                            trigger={<LocationTrigger />}
                            position="bottom-end"
                        >
                            <DropdownItem onClick={handleLocationDetect}>
                                <i className="fas fa-location-arrow mr-2" />
                                Deteksi Lokasi
                            </DropdownItem>
                            {user?.role === "vendor" && (
                                <DropdownItem
                                    onClick={() =>
                                        setSelectedLocation("Dashboard")
                                    }
                                >
                                    <i className="fas fa-chart-line mr-2" />
                                    Dashboard
                                </DropdownItem>
                            )}
                            <DropdownItem
                                onClick={() => setSelectedLocation("Jakarta")}
                            >
                                <i className="fas fa-building mr-2" />
                                Jakarta
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setSelectedLocation("Bandung")}
                            >
                                <i className="fas fa-building mr-2" />
                                Bandung
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setSelectedLocation("Surabaya")}
                            >
                                <i className="fas fa-building mr-2" />
                                Surabaya
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setSelectedLocation("Bali")}
                            >
                                <i className="fas fa-umbrella-beach mr-2" />
                                Bali
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-white shadow-md">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                        {/* Logo and Mobile Menu Button */}
                        <div className="flex items-center justify-between w-full lg:w-auto">
                            <Link
                                href="/"
                                className="font-gagliane text-xl sm:text-2xl xl:text-3xl text-red-600 hover:text-red-700 transition duration-300 px-2"
                            >
                                CredSh
                            </Link>

                            {/* Mobile Icons & Menu Button */}
                            <div className="lg:hidden flex items-center gap-3">
                                <Link
                                    href="/cart"
                                    className="text-gray-600 hover:text-red-600 relative"
                                >
                                    <IconCart className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        0
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                    aria-label="Toggle menu"
                                >
                                    <i
                                        className={`fas ${
                                            isMenuOpen ? "fa-times" : "fa-bars"
                                        } text-lg`}
                                    ></i>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div
                            className={`lg:flex items-center w-full lg:w-auto ${
                                isMenuOpen
                                    ? "block bg-white shadow-lg"
                                    : "hidden"
                            } transition-all duration-300`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
                                {/* Navigation Links */}
                                <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 py-2 lg:py-0 px-4">
                                    <Link
                                        href="/vendors"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-600 hover:text-red-600 transition duration-300 w-full text-center py-2"
                                    >
                                        Vendor
                                    </Link>
                                    <Link
                                        href="/packages"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-600 hover:text-red-600 transition duration-300 w-full text-center py-2"
                                    >
                                        Packages
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-600 hover:text-red-600 transition duration-300 w-full text-center py-2"
                                    >
                                        Gallery
                                    </Link>
                                    <Link
                                        href="/about"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-600 hover:text-red-600 transition duration-300 w-full text-center py-2"
                                    >
                                        About
                                    </Link>
                                </nav>

                                {/* Search Bar for Medium Screens */}
                                <div className="lg:hidden w-full mt-2 px-4">
                                    <SearchBar />
                                </div>

                                {/* Mobile Auth Links */}
                                <div className="lg:hidden flex flex-col items-center gap-4 mt-4 pb-4">
                                    {user ? (
                                        <>
                                            <Link
                                                href="/notifications"
                                                className="text-gray-600 hover:text-red-600 relative"
                                            >
                                                <IconBell className="w-6 h-6" />
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                    0
                                                </span>
                                            </Link>
                                            <Link
                                                href={route("profile.edit")}
                                                className="text-gray-600 hover:text-red-600 transition duration-300 py-2 w-full text-center"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="text-gray-600 hover:text-red-600 transition duration-300 py-2 w-full"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="text-gray-600 hover:text-red-600 transition duration-300 py-2 w-full text-center"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="text-gray-600 hover:text-red-600 transition duration-300 py-2 w-full text-center"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden lg:block w-full xl:w-1/3 mx-4">
                            <SearchBar />
                        </div>

                        {/* Desktop Auth Links */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center gap-4">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href="/notifications"
                                                className="text-gray-600 hover:text-red-600 relative"
                                            >
                                                <IconBell className="w-6 h-6" />
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                    0
                                                </span>
                                            </Link>
                                            <Link
                                                href="/cart"
                                                className="text-gray-600 hover:text-red-600 relative"
                                            >
                                                <IconCart className="w-6 h-6" />
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                    0
                                                </span>
                                            </Link>
                                            <Dropdown
                                                trigger={
                                                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none">
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={
                                                                user.profile_photo_url
                                                            }
                                                            alt={user.name}
                                                        />
                                                    </button>
                                                }
                                                position="bottom-end"
                                            >
                                                <DropdownItem
                                                    onClick={() =>
                                                        (window.location.href =
                                                            route("profile"))
                                                    }
                                                >
                                                    Profil
                                                </DropdownItem>
                                                {user?.role === "admin" && (
                                                    <DropdownItem
                                                        onClick={() =>
                                                            (window.location.href =
                                                                route(
                                                                    "admin.dashboard"
                                                                ))
                                                        }
                                                    >
                                                        Admin Dashboard
                                                    </DropdownItem>
                                                )}
                                                <DropdownItem
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-red-600 transition duration-300 px-3 py-1.5"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="text-gray-600 hover:text-red-600 transition duration-300 px-3 py-1.5 bg-red-50 rounded-lg"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto py-3 px-4">
                    <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide px-2 sm:px-0">
                        <Link
                            href="/venue"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <IconMap className="mr-2 w-4 h-4" />
                            Venue
                        </Link>
                        <Link
                            href="/catering"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <IconUtensils className="mr-2 w-4 h-4" />
                            Catering
                        </Link>
                        <Link
                            href="/decoration"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <i className="fas fa-paint-brush mr-2"></i>
                            Decoration
                        </Link>
                        <Link
                            href="/photography"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <IconCamera className="mr-2 w-4 h-4" />
                            Photography
                        </Link>
                        <Link
                            href="/makeup"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <i className="fas fa-magic mr-2"></i>Makeup & Hair
                        </Link>
                        <Link
                            href="/entertainment"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <i className="fas fa-music mr-2"></i>Entertainment
                        </Link>
                        <Link
                            href="/invitation"
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap transition duration-300 flex items-center min-w-max text-sm sm:text-base"
                        >
                            <i className="fas fa-envelope mr-2"></i>Invitation
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
