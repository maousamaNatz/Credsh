import React, { useState, useEffect, useCallback } from 'react';
import { ProductCard } from "@/common/card";

const ReloadCard = ({ items, itemsPerLoad = 8 }) => {
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        // Inisialisasi item awal yang ditampilkan saat komponen dimuat atau ketika daftar items berubah
        setDisplayedItems(items.slice(0, itemsPerLoad));
    }, [items, itemsPerLoad]);

    const loadMoreItems = useCallback(() => {
        setDisplayedItems(prevItems => {
            const nextIndex = prevItems.length;
            const newItems = items.slice(nextIndex, nextIndex + itemsPerLoad);
            if (newItems.length > 0) {
                return [...prevItems, ...newItems];
            }
            return prevItems;
        });
    }, [items, itemsPerLoad]);

    useEffect(() => {
        const handleScroll = () => {
            // Jika user scroll hampir mencapai bagian bawah halaman (toleransi 50px), maka load item tambahan
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreItems]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={{
                        gambar: product.gambar || '/images/placeholder-product.png',
                        nama: product.nama,
                        id: product.id,
                        harga: product.harga,
                        rating: product.rating || 0,
                        deskripsi: product.deskripsi || 'Deskripsi tidak tersedia',
                        terjual: product.terjual || 0
                    }}
                />
            ))}
            {displayedItems.length < items.length && (
                <div className="col-span-full text-center py-4">
                    <img src="/images/loading.gif" alt="Loading" className="w-12 h-12 mx-auto" />
                </div>
            )}
        </div>
    );
};

export default ReloadCard;
