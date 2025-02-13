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

    const debouncedSearch = debounce(async (query) => {
        if (!query.trim()) {
            setResults({ vendors: [], articles: [] });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error pencarian:', error);
            setResults({ vendors: [], articles: [] });
        }
        setIsLoading(false);
    }, 300);

    useEffect(() => {
        if (searchQuery.trim()) {
            setIsLoading(true);
            debouncedSearch(searchQuery);
        } else {
            setResults({ vendors: [], articles: [] });
        }
        return () => debouncedSearch.cancel();
    }, [searchQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
            setShowResults(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} className="relative w-full max-w-xl mx-4">
            <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="search-input" className="sr-only">Cari vendor atau artikel</label>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Cari vendor atau artikel..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm md:text-base"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                />
                
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                            <svg className="animate-spin h-5 w-5 text-pink-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                        </div>
                    ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    )}
                </button>
            </form>

            {showResults && searchQuery.trim() !== '' && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="divide-y divide-gray-100">
                        {results.vendors.length === 0 && results.articles.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500">
                                Tidak ada hasil yang ditemukan untuk "{searchQuery}"
                            </div>
                        ) : (
                            <>
                                {results.vendors.length > 0 && (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                                            VENDOR ({results.vendors.length})
                                        </div>
                                        {results.vendors.map((vendor) => (
                                            <Link
                                                key={vendor.id}
                                                href={vendor.url}
                                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowResults(false)}
                                            >
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {vendor.nama}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 truncate">
                                                    {vendor.kategori} • {vendor.lokasi}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {results.articles.length > 0 && (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                                            ARTIKEL ({results.articles.length})
                                        </div>
                                        {results.articles.map((article) => (
                                            <Link
                                                key={article.id}
                                                href={article.url}
                                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowResults(false)}
                                            >
                                                <div className="text-sm text-gray-900 truncate">
                                                    {article.judul}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {article.kategori}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
