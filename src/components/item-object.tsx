"use client"

import { useDrag } from "react-dnd"
import { motion } from "framer-motion"

type ItemObjectProps = {
  id: number
  name: string
  type: string
  image: string
}

export default function ItemObject({ id, name, type, image }: ItemObjectProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-2 bg-white rounded-md shadow-md cursor-grab"
    >
      <div className="w-16 h-16 relative">
        <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <p className="text-xs text-center mt-1">{name}</p>
    </motion.div>
  )
}
