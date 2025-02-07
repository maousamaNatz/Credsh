import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Handle API submission here
  }

  return (
    <div className="max-w-2xl mx-auto bg-ivory p-8 rounded-xl shadow-lg">
      {!submitted ? (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <h2 className="font-playfair text-3xl text-center text-secondary">
            Konfirmasi Kehadiran
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Alamat Email"
              className="p-3 border rounded-lg"
              required
            />
            <select className="p-3 border rounded-lg" required>
              <option value="">Jumlah Hadir</option>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
            <select className="p-3 border rounded-lg" required>
              <option value="">Status Kehadiran</option>
              <option value="hadir">Akan Hadir</option>
              <option value="tidak">Tidak Dapat Hadir</option>
            </select>
          </div>
          
          <textarea
            placeholder="Pesan (opsional)"
            className="w-full p-3 border rounded-lg h-32"
          ></textarea>
          
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary-dark transition-colors"
          >
            Konfirmasi
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-6xl">🎉</div>
          <h3 className="font-playfair text-2xl text-secondary">
            Terima kasih telah mengkonfirmasi!
          </h3>
          <p className="text-gray-600">
            Kami telah menerima konfirmasi kehadiran Anda
          </p>
        </motion.div>
      )}
    </div>
  )
} 