import { useState } from 'react'
import GISMap from '../components/GISMap'
import { venues } from '../data/dummyVenues'

export default function MapPage() {
  const [selectedType, setSelectedType] = useState('all')
  
  const filteredVenues = selectedType === 'all' 
    ? venues 
    : venues.filter(v => v.type === selectedType)

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-ivory p-6 shadow-lg">
        <h2 className="font-playfair text-3xl mb-6">Lokasi Acara</h2>
        
        <div className="space-y-4 mb-8">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="all">Semua Jenis Acara</option>
            <option value="akad">Akad Nikah</option>
            <option value="resepsi">Resepsi</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
          {filteredVenues.map((venue, index) => (
            <div 
              key={index}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-playfair text-xl text-secondary">{venue.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{venue.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-primary px-2 py-1 rounded-full">
                  {venue.type}
                </span>
                <span className="text-xs text-gray-500">{venue.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peta */}
      <div className="flex-1">
        <GISMap venues={filteredVenues} />
      </div>
    </div>
  )
} 