import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapComponent = ({
    center = [-6.2, 106.816666],
    zoom = 13,
    vendors = [],
    onLocationSelect,
}) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null); // Marker for a selected location (via search or click)
    const markersRef = useRef([]);  // Array to hold vendor markers
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
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
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
                const popupContent = `
                    <div class="modern-popup">
                        <div class="popup-header">
                            <div class="no-image">📍</div>
                        </div>
                        <div class="popup-content">
                            <h3>Selected Location</h3>
                            <p class="address">Coordinates: ${newCenter[0]}, ${newCenter[1]}</p>
                        </div>
                    </div>
                `;
                markerRef.current
                    .bindPopup(popupContent, {
                        className: "modern-popup-container",
                        maxWidth: 320,
                        minWidth: 280,
                    })
                    .openPopup();
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

        if (!mapRef.current) {
            const map = L.map("map", {
                zoomControl: false,
            }).setView(center, zoom);
            mapRef.current = map;

            // Use Mapbox tile layer (ensure REACT_APP_MAPBOX_ACCESS_TOKEN is set in your env)
            L.tileLayer(
                `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: "mapbox/streets-v11",
                    tileSize: 512,
                    zoomOffset: -1,
                }
            ).addTo(map);

            // Add custom zoom control to bottom right
            L.control.zoom({
                position: "bottomright",
            }).addTo(map);

            // Create a marker for user selection with a custom style
            const selectionMarker = L.marker(center, {
                icon: L.divIcon({
                    className: "custom-marker",
                    html: `<div class="marker-pin"></div>`,
                    iconSize: [30, 42],
                    iconAnchor: [15, 42],
                }),
            }).addTo(map);
            markerRef.current = selectionMarker;

            const popupContent = `
                <div class="modern-popup">
                    <div class="popup-header">
                        <div class="no-image">📍</div>
                    </div>
                    <div class="popup-content">
                        <h3>Selected Location</h3>
                        <p class="address">Coordinates: ${center[0]}, ${center[1]}</p>
                    </div>
                </div>
            `;
            selectionMarker.bindPopup(popupContent, {
                className: "modern-popup-container",
                maxWidth: 320,
                minWidth: 280,
            }).openPopup();

            // Update selected marker on map click
            map.on("click", (e) => {
                const { lat, lng } = e.latlng;
                selectionMarker.setLatLng([lat, lng]);
                if (onLocationSelect) {
                    onLocationSelect({ lat, lon: lng });
                }
                const updatedPopup = `
                    <div class="modern-popup">
                        <div class="popup-header">
                            <div class="no-image">📍</div>
                        </div>
                        <div class="popup-content">
                            <h3>Selected Location</h3>
                            <p class="address">Coordinates: ${lat}, ${lng}</p>
                        </div>
                    </div>
                `;
                selectionMarker.bindPopup(updatedPopup, {
                    className: "modern-popup-container",
                    maxWidth: 320,
                    minWidth: 280,
                }).openPopup();
            });
        }

        // Hapus marker yang ada sebelumnya
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Tambahkan marker untuk setiap vendor
        vendors.forEach(vendor => {
            const lat = parseFloat(vendor.latitude);
            const lon = parseFloat(vendor.longitude);
            if (!isNaN(lat) && !isNaN(lon)) {
                const marker = L.marker([lat, lon]).addTo(mapRef.current);
                marker.bindPopup(`<b>${vendor.nama}</b>`);
                markersRef.current.push(marker);
            }
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [vendors, center, zoom, onLocationSelect]);

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
