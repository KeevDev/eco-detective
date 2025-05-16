"use client"

import { motion } from "framer-motion"

type EcoMascotProps = {
  size?: "small" | "medium" | "large"
}

export default function EcoMascot({ size = "medium" }: EcoMascotProps) {
  // Determinar el tamaño de la mascota
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-24 h-24"
      case "medium":
        return "w-32 h-32"
      case "large":
        return "w-40 h-40"
      default:
        return "w-32 h-32"
    }
  }

  return (
    <div className={`relative ${getSizeClass()}`}>
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="w-full h-full"
      >
        {/* Cuerpo de la mascota */}
        <div className="relative w-full h-full">
          {/* Cuerpo principal (forma de hoja) */}
          <div className="absolute inset-0 bg-green-500 rounded-full transform rotate-45 scale-75 origin-center"></div>
          <div className="absolute inset-0 bg-green-400 rounded-full transform rotate-[135deg] scale-75 origin-center"></div>

          {/* Cara */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-3/5 h-2/5">
            {/* Ojos */}
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/3 bg-white rounded-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/3 bg-white rounded-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-black rounded-full"></div>
            </div>

            {/* Sonrisa */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-3/5 h-1/5 border-b-4 border-white rounded-b-full"></div>
          </div>

          {/* Brillo */}
          <div className="absolute top-1/6 right-1/6 w-1/6 h-1/6 bg-white rounded-full opacity-70"></div>
        </div>
      </motion.div>
    </div>
  )
}
