"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function TokenCounter() {
  const [count, setCount] = useState(0)
  const targetCount = 372113 // Example number of tokens already minted

  useEffect(() => {
    const duration = 2000 // 2 seconds animation
    const interval = 20 // Update every 20ms
    const steps = duration / interval
    const increment = targetCount / steps

    let currentCount = 0
    const timer = setInterval(() => {
      currentCount += increment
      if (currentCount >= targetCount) {
        setCount(targetCount)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentCount))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center">
      <div className="mb-2 text-sm text-purple-300">Tokens Minted</div>
      <motion.div
        className="text-3xl font-bold"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {count} / 1,000,000
      </motion.div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: `${(count / 1000000) * 100}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
