import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import customMarkerIcon from '../assets/map-marker.svg'

const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

export default function GISMap({ venues }) {
  return (
    <MapContainer 
      center={[-6.200000, 106.816666]} 
      zoom={12} 
      className="h-[600px] rounded-xl shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {venues.map((venue, index) => (
        <Marker
          key={index}
          position={[venue.lat, venue.lng]}
          icon={customIcon}
        >
          <Popup className="custom-popup">
            <div className="space-y-2">
              <h3 className="font-playfair text-xl font-bold text-primary">
                {venue.name}
              </h3>
              <p className="text-gray-600">{venue.address}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-full bg-ivory px-3 py-1">
                  {venue.type}
                </span>
                <span>{venue.time}</span>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`}
                target="_blank"
                className="inline-block text-primary hover:text-primary-dark"
              >
                Dapatkan Petunjuk →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 