"use client"

import { useDrag } from "react-dnd"
import { motion } from "framer-motion"
import { useState } from "react"
import { Info } from "lucide-react"
import type { WasteType } from "./game-context"

type DraggableItemProps = {
  id: number
  name: string
  type: WasteType
  image: string
  position: { x: number; y: number }
  description: string
}

export default function DraggableItem({ id, name, type, image, position, description }: DraggableItemProps) {
  const [showInfo, setShowInfo] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Determinar el color del borde según el tipo de residuo
  const getBorderColor = () => {
    switch (type) {
      case "plastico":
        return "border-blue-400"
      case "papel":
        return "border-yellow-400"
      case "organico":
        return "border-green-400"
      default:
        return "border-gray-400"
    }
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      ref={drag}
      whileHover={{ scale: 1.1, rotate: 5, zIndex: 100 }}
      whileTap={{ scale: 1.2, rotate: -5 }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isDragging ? 100 : 10,
      }}
      className="cursor-grab"
    >
      <div className="relative">
        {/* Objeto */}
        <div
          className={`w-16 h-16 bg-contain bg-center bg-no-repeat drop-shadow-lg border-2 ${getBorderColor()} bg-white/80 rounded-lg p-1`}
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Botón de información */}
        <button
          className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            setShowInfo(!showInfo)
          }}
        >
          <Info size={14} />
        </button>

        {/* Tooltip de información */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white p-2 rounded-lg shadow-lg text-xs w-48 z-50"
          >
            <div className="font-bold mb-1">{name}</div>
            <p>{description}</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </motion.div>
        )}

        {/* Etiqueta con nombre */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium min-w-max">
          {name}
        </div>
      </div>
    </motion.div>
  )
}
