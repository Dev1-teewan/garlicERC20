"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function GlowingStars() {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate random positions for stars only on client side
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${seededRandom(i * 0.1) * 100}%`,
      left: `${seededRandom(i * 0.1 + 0.5) * 100}%`,
      size: seededRandom(i * 0.1 + 0.2) * 0.5 + 0.5,
      delay: seededRandom(i * 0.1 + 0.3) * 5,
      duration: seededRandom(i * 0.1 + 0.4) * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  if (stars.length === 0) {
    return null; // Don't render anything until stars are generated
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            boxShadow: [
              "0 0 2px 1px rgba(255, 255, 255, 0.1)",
              "0 0 4px 2px rgba(255, 255, 255, 0.4)",
              "0 0 2px 1px rgba(255, 255, 255, 0.1)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
