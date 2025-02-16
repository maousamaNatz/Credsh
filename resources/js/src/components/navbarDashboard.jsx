import React, { useState } from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import Dropdown, { DropdownItem } from '@/common/dropdown'

function NavbarDashboard({ toggleSidebar }) {
  const { auth } = usePage().props
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const handleLogout = () => {
    router.post(route('logout'))
  }

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center">
            {/* Sidebar Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSidebar()
              }}
              className="text-gray-500 hover:text-gray-600 lg:hidden mr-2 sm:mr-4"
            >
              <span className="sr-only">Toggle Sidebar</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="hidden sm:block">
              <svg
                className="fill-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
              >
                <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden md:block relative ml-4 md:ml-8">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Notifikasi</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
            </button>

            {/* User Menu */}
            <Dropdown
              trigger={
                <div className="flex items-center space-x-3 cursor-pointer">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={auth.user.profile_photo_url}
                    alt={auth.user.name}
                  />
                  <span className="hidden sm:inline-block text-sm font-medium text-gray-800">
                    {auth.user.name}
                  </span>
                </div>
              }
              align="right"
              width="w-48"
              type="profile"
            >
              <DropdownItem onClick={() => router.get(route('profile.show'))}>
                <i className="fas fa-user mr-2"></i>Profile
              </DropdownItem>
              <DropdownItem
                onClick={() => router.get(route('profile.settings'))}
              >
                <i className="fas fa-cog mr-2"></i>Settings
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search - Expandable */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-2 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavbarDashboard
