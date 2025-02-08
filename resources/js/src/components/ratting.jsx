import React from 'react';

const Rating = ({ rating, setRating, readOnly = false }) => {
    // Konversi rating ke skala 0-5 dengan presisi 0.1
    const normalizedRating = Math.min(5, Math.max(0, rating));

    // Buat array untuk 5 bintang
    const stars = [1, 2, 3, 4, 5];

    const handleMouseMove = (e, starIndex) => {
        if (readOnly) return;

        const starElement = e.currentTarget;
        const rect = starElement.getBoundingClientRect();
        const width = rect.width;
        const x = e.clientX - rect.left;

        // Hitung posisi relatif dalam bintang (0-1)
        const decimal = x / width;

        // Konversi ke nilai rating dengan presisi 0.1
        const value = starIndex + Math.round(decimal * 10) / 10;
        setRating(Math.min(5, Math.max(0, value)));
    };

    const handleClick = (starIndex) => {
        if (readOnly) return;
        setRating(starIndex);
    };

    return (
        <div className="flex items-center space-x-1">
            {stars.map((star, index) => (
                <div
                    key={index}
                    className={`relative cursor-${readOnly ? 'default' : 'pointer'} w-6 h-6`}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onClick={() => handleClick(index + 1)}
                >
                    {/* Bintang background (abu-abu) */}
                    <i className="fas fa-star text-gray-300 absolute"></i>

                    {/* Bintang overlay (kuning) */}
                    <div style={{
                        width: `${Math.max(0, Math.min(100, (normalizedRating - index) * 100))}%`,
                        overflow: 'hidden',
                        position: 'absolute'
                    }}>
                        <i className="fas fa-star text-yellow-400"></i>
                    </div>
                </div>
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {normalizedRating.toFixed(1)}
            </span>
        </div>
    );
};

export default Rating;
