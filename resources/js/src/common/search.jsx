import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import debounce from 'lodash/debounce';

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({ vendors: [], articles: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Debounce search function
    const debouncedSearch = debounce(async (query) => {
        if (!query.trim()) {
            setResults({ vendors: [], articles: [] });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`/api/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error pencarian:', error);
            setResults({ vendors: [], articles: [] });
        }
        setIsLoading(false);
    }, 300);

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => debouncedSearch.cancel();
    }, [searchQuery]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
            setShowResults(false);
        }
    };

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} className="relative">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder="Cari vendor atau artikel..."
                    className="w-[400px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchQuery.trim() !== '' && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                    {results.vendors.length === 0 && results.articles.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            Tidak ada hasil yang ditemukan
                        </div>
                    ) : (
                        <>
                            {results.vendors.length > 0 && (
                                <div className="border-b">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                                        VENDOR
                                    </div>
                                    {results.vendors.map((vendor) => (
                                        <Link
                                            key={vendor.id}
                                            href={vendor.url}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                            onClick={() => setShowResults(false)}
                                        >
                                            <div className="text-sm font-medium text-gray-900">
                                                {vendor.nama}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {vendor.kategori} • {vendor.lokasi}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {results.articles.length > 0 && (
                                <div>
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                                        ARTIKEL
                                    </div>
                                    {results.articles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={article.url}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                            onClick={() => setShowResults(false)}
                                        >
                                            <div className="text-sm text-gray-900">
                                                {article.judul}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
