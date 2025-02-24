import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZ3JhbW1hdGEiLCJhIjoiY2wxMzI4b3dqMDNhMjNpcDhzcmU0aGh5diJ9.m1lacx48pTYls-X3FVhG9g";

const ProfileMap = ({ latitude = -6.2, longitude = 106.816666, zoom = 13, onLocationChange, search, setSearch, setVendorData, vendorData, venues }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const container = document.getElementById("profile-map");
    if (container && container._leaflet_id) {
      container._leaflet_id = null;
    }

    // Fix ikon marker Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const map = L.map("profile-map", { zoomControl: true }).setView([latitude, longitude], zoom);
    mapRef.current = map;

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: MAPBOX_ACCESS_TOKEN,
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
    markerRef.current = marker;

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]).bindPopup(`Lat: ${lat}, Lng: ${lng}`).openPopup();
      if (onLocationChange) {
        onLocationChange({ lat, lng });
      }
      setVendorData("vendor", {
        ...vendorData.vendor,
        latitude: lat.toString(),
        longitude: lng.toString(),
      });
    });

    // Tambahkan marker untuk setiap vendor
    const validMarkers = venues || [];
    validMarkers.forEach(venue => {
      if (venue.latitude && venue.longitude) {
        const marker = L.marker([parseFloat(venue.latitude), parseFloat(venue.longitude)])
          .bindPopup(`
            <b>${venue.nama}</b><br>
            ${venue.alamat}<br>
            Kategori: ${venue.kategori}
          `);
        marker.addTo(map);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, zoom, onLocationChange, setVendorData, venues]);

  useEffect(() => {
    if (search) {
      fetchSuggestions(search);
    }
  }, [search]);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?country=id&limit=5&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error("Gagal mengambil data lokasi:", error);
    }
  };

  const adjustMap = async () => {
    if (vendorData.vendor.alamat) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(vendorData.vendor.alamat)}.json?country=id&limit=1&access_token=${MAPBOX_ACCESS_TOKEN}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.features.length > 0) {
          const { center } = data.features[0];
          const [lon, lat] = center;
          setVendorData("vendor", {
            ...vendorData.vendor,
            latitude: lat,
            longitude: lon,
          });
          markerRef.current.setLatLng([lat, lon]).bindPopup(vendorData.vendor.alamat).openPopup();
          mapRef.current.setView([lat, lon], 15);
        } else {
          console.error("Alamat tidak ditemukan. Silakan coba alamat lain.");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    }
  };

  const selectLocation = (lat, lon, displayName) => {
    setSuggestions([]);

    if (mapRef.current && markerRef.current) {
      markerRef.current.setLatLng([lat, lon]).bindPopup(displayName).openPopup();
      mapRef.current.setView([lat, lon], 15);
      if (onLocationChange) {
        onLocationChange({ lat, lng: lon });
      }
      setVendorData("vendor", {
        ...vendorData.vendor,
        latitude: lat.toString(),
        longitude: lon.toString(),
        alamat: displayName,
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current && markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]).bindPopup("Lokasi Anda").openPopup();
            mapRef.current.setView([latitude, longitude], 15);
            if (onLocationChange) {
              onLocationChange({ lat: latitude, lng: longitude });
            }
            setVendorData("vendor", {
              ...vendorData.vendor,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            });
          }
        },
        (error) => {
          console.error("Gagal mendapatkan lokasi:", error);
        }
      );
    } else {
      console.error("Geolocation tidak didukung oleh browser Anda.");
    }
  };

  // Fix marker icons
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="w-full">
      <div id="profile-map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default ProfileMap;
