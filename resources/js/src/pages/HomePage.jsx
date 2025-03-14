import React from 'react'
import Layout from '../Layouts/Layout'
import { Link } from '@inertiajs/react'
import CardCarousel from '@/components/carousel'
import ReloadCard from '@/template/reloadCard'
import MapComponent from '@/components/leaflet'
import { VideoWithFallback } from '@/components/video'

export default function HomePage({
  popularVendors,
  latestArticles,
  mapsVendors = [],
  products = [],
  auth,
}) {
  // Fungsi handle location select (jika diperlukan)
  const handleLocationSelect = (location) => {
    console.log('Selected location:', location)
  }

  return (
    <Layout>
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 w-full h-full">
          <VideoWithFallback
            videoSrc="media/1.mp4"
            imageSrc="/images/1.jpg"
            options={{
              autoplay: true,
              muted: true,
              loop: true,
              playsinline: true,
            }}
            onError={(error) => {
              console.error('Error video:', error)
            }}
          />
        </div>
        <noscript>
          <p className="text-white text-center absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            Browser Anda tidak mendukung pemutaran video. Silakan aktifkan
            JavaScript.
          </p>
        </noscript>

        <div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start">
          <div className="text-white max-w-2xl text-center md:text-left px-4 md:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gagliane mb-4 md:mb-6">
              Wujudkan Pernikahan Impianmu
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
              Temukan berbagai vendor profesional dan paket pernikahan terbaik
              untuk hari spesialmu
            </p>
            <Link
              href="/vendors"
              className="inline-block bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-red-700 transition duration-300 w-full md:w-auto text-center"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-red-600 text-4xl mb-4">
                <i className="fas fa-store"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vendor Terpercaya</h3>
              <p className="text-gray-600">
                Pilihan vendor profesional yang telah terverifikasi untuk
                pernikahan impianmu
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-red-600 text-4xl mb-4">
                <i className="fas fa-box-open"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Paket Lengkap</h3>
              <p className="text-gray-600">
                Berbagai paket pernikahan lengkap dengan harga yang kompetitif
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-red-600 text-4xl mb-4">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Konsultasi Gratis</h3>
              <p className="text-gray-600">
                Konsultasi gratis dengan wedding planner profesional kami
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Produk Terbaru
          </h2>
          <ReloadCard items={products} />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Lokasi Vendor
          </h2>
          {mapsVendors.length > 0 ? (
            <MapComponent
              center={[-6.2, 106.816666]}
              zoom={13}
              vendors={mapsVendors}
              onLocationSelect={handleLocationSelect}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Belum ada vendor yang tersedia di peta
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!auth?.user && (
        <section className="py-16 bg-red-600">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-semibold mb-6">
              Siap Merencanakan Pernikahan?
            </h2>
            <p className="text-xl mb-8">Mulai perjalanan indahmu bersama kami</p>
            <Link
              href="/register"
              className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-300"
            >
              Daftar Sekarang
            </Link>
          </div>
        </section>
      )}
    </Layout>
  )
}
