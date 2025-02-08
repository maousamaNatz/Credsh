import React from 'react';
import { Link, usePage } from '@inertiajs/react';

function NavbarDashboard() {
  const { auth } = usePage().props;

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700/60 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Logo */}
            <Link href="/" className="block">
              <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg>
            </Link>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* User */}
            <div className="relative inline-flex">
              <div className="flex items-center">
                <div className="mr-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {auth.user.name}
                  </span>
                </div>
                <img 
                  className="w-8 h-8 rounded-full"
                  src={auth.user.profile_photo_url} 
                  alt={auth.user.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavbarDashboard;
