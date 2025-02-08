import React, { useState, useEffect } from 'react';
import { Card } from "@/common/card";

const ReloadCard = ({ items, itemsPerLoad = 8 }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(itemsPerLoad);

    useEffect(() => {
        // Inisialisasi item awal yang ditampilkan
        setDisplayedItems(items.slice(0, itemsPerLoad));

        // Event listener untuk scroll
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                // User telah scroll sampai bawah
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);

    const loadMoreItems = () => {
        // Tambahkan item baru ke displayedItems
        const newItems = items.slice(
            currentIndex,
            currentIndex + itemsPerLoad
        );

        if (newItems.length > 0) {
            setDisplayedItems([...displayedItems, ...newItems]);
            setCurrentIndex(currentIndex + itemsPerLoad);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((item, index) => (
                <Card
                    key={index}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    location={item.location}
                    category={item.category}
                    description={item.description}
                />
            ))}
            {currentIndex < items.length && (
                <div className="col-span-full text-center py-4">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
                </div>
            )}
        </div>
    );
};

export default ReloadCard;
