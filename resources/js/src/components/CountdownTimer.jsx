import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date()
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-6 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div 
          key={unit}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-ivory p-4 rounded-lg w-24"
        >
          <div className="text-3xl font-bold text-secondary">{value}</div>
          <div className="text-sm text-gray-600 uppercase">{unit}</div>
        </motion.div>
      ))}
    </div>
  )
} 