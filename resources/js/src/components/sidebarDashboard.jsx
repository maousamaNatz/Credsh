import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useRef, useEffect, useState } from 'react';

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const { url } = usePage();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Set default expanded state to true
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200' : ' shadow-xs'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Link href="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span className="block">Menu</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={url === "/" || url.includes("dashboard")}>
                {(handleClick, open) => (
                  <Link
                    href="/"
                    className={`block text-gray-600 truncate transition duration-150 ${
                      url === "/" || url.includes("dashboard") ? "text-violet-500" : "hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${url === "/" || url.includes("dashboard") ? 'text-violet-500' : 'text-gray-400'}`} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M12.619 8.412a1 1 0 0 0-1.414 0L9 10.586V6a1 1 0 1 0-2 0v4.586L4.795 8.412a1 1 0 0 0-1.414 1.414l3.999 3.999a1 1 0 0 0 1.414 0l3.999-3.999a1 1 0 0 0 0-1.414Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4">
                        Dashboard
                      </span>
                    </div>
                  </Link>
                )}
              </SidebarLinkGroup>

              {/* Users Management */}
              <SidebarLinkGroup activecondition={url.includes("users")}>
                {(handleClick, open) => (
                  <Link
                    href="/users"
                    className={`block text-gray-600 truncate transition duration-150 ${
                      url.includes("users") ? "text-violet-500" : "hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${url.includes('users') ? 'text-violet-500' : 'text-gray-400'}`} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                      </svg>
                      <span className="text-sm font-medium ml-4">
                        Pengguna
                      </span>
                    </div>
                  </Link>
                )}
              </SidebarLinkGroup>

              {/* Bookings */}
              <SidebarLinkGroup activecondition={url.includes("bookings")}>
                {(handleClick, open) => (
                  <Link
                    href="/bookings"
                    className={`block text-gray-600 truncate transition duration-150 ${
                      url.includes("bookings") ? "text-violet-500" : "hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${url.includes('bookings') ? 'text-violet-500' : 'text-gray-400'}`} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                      </svg>
                      <span className="text-sm font-medium ml-4">
                        Pemesanan
                      </span>
                    </div>
                  </Link>
                )}
              </SidebarLinkGroup>

              {/* Articles */}
              <SidebarLinkGroup activecondition={url.includes("articles")}>
                {(handleClick, open) => (
                  <Link
                    href="/articles"
                    className={`block text-gray-600 truncate transition duration-150 ${
                      url.includes("articles") ? "text-violet-500" : "hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${url.includes('articles') ? 'text-violet-500' : 'text-gray-400'}`} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      <span className="text-sm font-medium ml-4">
                        Artikel
                      </span>
                    </div>
                  </Link>
                )}
              </SidebarLinkGroup>

              {/* Settings */}
              <SidebarLinkGroup activecondition={url.includes("settings")}>
                {(handleClick, open) => (
                  <Link
                    href="/settings"
                    className={`block text-gray-600 truncate transition duration-150 ${
                      url.includes("settings") ? "text-violet-500" : "hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${url.includes('settings') ? 'text-violet-500' : 'text-gray-400'}`} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                      </svg>
                      <span className="text-sm font-medium ml-4">
                        Pengaturan
                      </span>
                    </div>
                  </Link>
                )}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
