import React, { useEffect, useRef, useState } from "react";
import L, { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapComponent = ({
    center = [-6.2, 106.816666],
    zoom = 13,
    venue = {},
    onLocationSelect,
}) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchLocation = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error searching location:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationSelect = (location) => {
        const newCenter = [parseFloat(location.lat), parseFloat(location.lon)];

        if (mapRef.current) {
            mapRef.current.setView(newCenter, zoom);

            if (markerRef.current) {
                markerRef.current.setLatLng(newCenter);
            }

            if (onLocationSelect) {
                onLocationSelect({
                    lat: location.lat,
                    lon: location.lon,
                    name: location.display_name,
                });
            }
        }

        setSearchResults([]);
        setSearchQuery(location.display_name);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            searchLocation(searchQuery);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    useEffect(() => {
        // Fix marker icon issues
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        // Inisialisasi peta jika belum ada
        if (!mapRef.current) {
            const map = L.map("map", {
                zoomControl: false // Sembunyikan kontrol zoom default
            }).setView(center, zoom);
            mapRef.current = map;

            // Gunakan peta style modern
            L.tileLayer(
                'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                {
                }
            ).addTo(map);

            // Tambahkan custom zoom control
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            // Tambahkan marker dengan style modern
            const marker = L.marker(center, {
                icon: L.divIcon({
                    className: 'custom-marker',
                    html: `<div class="marker-pin"></div>`,
                    iconSize: [30, 42],
                    iconAnchor: [15, 42]
                })
            }).addTo(map);
            markerRef.current = marker;

            const popupContent = `
                <div class="modern-popup">
                    <div class="popup-header" style="background-image: url('${venue.image || ''}')">
                        ${venue.image ? '' : '<div class="no-image">📍</div>'}
                    </div>
                    <div class="popup-content">
                        <h3>${venue.name || "Lokasi Pernikahan"}</h3>
                        <p class="address">${venue.address || "Alamat venue akan ditampilkan di sini"}</p>
                        ${venue.date || venue.time ? `
                            <div class="event-details">
                                ${venue.date ? `<div class="detail-item"><i class="far fa-calendar"></i>${venue.date}</div>` : ''}
                                ${venue.time ? `<div class="detail-item"><i class="far fa-clock"></i>${venue.time}</div>` : ''}
                            </div>
                        ` : ''}
                        ${venue.directions ? `
                            <a href="${venue.directions}" target="_blank" class="directions-btn">
                                <i class="fas fa-directions"></i> Petunjuk Arah
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
            marker.bindPopup(popupContent, {
                className: 'modern-popup-container',
                maxWidth: 320,
                minWidth: 280,
            }).openPopup();

            map.on("click", (e) => {
                const { lat, lng } = e.latlng;
                marker.setLatLng([lat, lng]);
                if (onLocationSelect) {
                    onLocationSelect({ lat, lon: lng });
                }
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center, zoom, venue]);

    return (
        <div className="relative w-full">
            <div className="mb-4 relative">
                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari lokasi..."
                        className="modern-search-input"
                    />
                    {loading && (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((result, index) => (
                            <div
                                key={index}
                                onClick={() => handleLocationSelect(result)}
                                className="result-item"
                            >
                                <i className="fas fa-map-marker-alt location-icon"></i>
                                <span>{result.display_name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="map-container">
                <div id="map" className="map"></div>
            </div>
            <style>
                {`
                    .map-container {
                        position: relative;
                        height: 500px;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }

                    .map {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                    }

                    .search-container {
                        position: relative;
                        margin-bottom: 1rem;
                    }

                    .modern-search-input {
                        width: 100%;
                        padding: 1rem 1rem 1rem 3rem;
                        border: none;
                        border-radius: 12px;
                        background: #f8fafc;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    }

                    .modern-search-input:focus {
                        background: white;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                        outline: none;
                    }

                    .search-icon {
                        position: absolute;
                        left: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #94a3b8;
                    }

                    .search-results {
                        position: absolute;
                        width: 100%;
                        background: white;
                        border-radius: 12px;
                        margin-top: 0.5rem;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                        z-index: 1000;
                        max-height: 300px;
                        overflow-y: auto;
                    }

                    .result-item {
                        padding: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    .result-item:hover {
                        background: #f1f5f9;
                    }

                    .location-icon {
                        color: #ef4444;
                    }

                    .modern-popup {
                        padding: 0;
                        border-radius: 12px;
                        overflow: hidden;
                    }

                    .popup-header {
                        height: 120px;
                        background-size: cover;
                        background-position: center;
                        position: relative;
                    }

                    .no-image {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f1f5f9;
                        font-size: 2rem;
                    }

                    .popup-content {
                        padding: 1.5rem;
                    }

                    .popup-content h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                        color: #1e293b;
                    }

                    .address {
                        color: #64748b;
                        font-size: 0.875rem;
                        margin-bottom: 1rem;
                    }

                    .event-details {
                        display: flex;
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }

                    .detail-item {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: #64748b;
                        font-size: 0.875rem;
                    }

                    .directions-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        background: #ef4444;
                        color: white;
                        padding: 0.75rem 1rem;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    }

                    .directions-btn:hover {
                        background: #dc2626;
                    }

                    .custom-marker {
                        background: none;
                        border: none;
                    }

                    .marker-pin {
                        width: 30px;
                        height: 30px;
                        border-radius: 50% 50% 50% 0;
                        background: #ef4444;
                        position: relative;
                        transform: rotate(-45deg);
                        animation: bounce 0.3s ease;
                    }

                    .marker-pin::after {
                        content: '';
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: white;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }

                    @keyframes bounce {
                        0% { transform: rotate(-45deg) translateY(-10px); }
                        100% { transform: rotate(-45deg) translateY(0); }
                    }

                    .loading-indicator {
                        position: absolute;
                        right: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                    }

                    .spinner {
                        width: 20px;
                        height: 20px;
                        border: 2px solid #f3f3f3;
                        border-top: 2px solid #ef4444;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default MapComponent;
