"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"
import { useGame } from "./game-context"

type FeedbackEffectProps = {
  correct: boolean
  itemId: number
}

export default function FeedbackEffect({ correct, itemId }: FeedbackEffectProps) {
  const { items } = useGame()
  const item = items.find((item) => item.id === itemId)

  if (!item) return null

  // Obtener la posición del item para mostrar el feedback cerca de él
  const position = item.position

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="absolute z-30 pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {correct ? (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -50 }}
            transition={{ duration: 1 }}
            className="text-green-500 bg-white rounded-full p-1 shadow-lg"
          >
            <CheckCircle size={40} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-green-600 font-bold text-lg bg-white/80 px-3 py-1 rounded-full shadow-md"
          >
            +100
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-red-500 bg-white rounded-full p-1 shadow-lg"
          >
            <XCircle size={40} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-red-600 font-bold text-lg bg-white/80 px-3 py-1 rounded-full shadow-md"
          >
            -50
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
