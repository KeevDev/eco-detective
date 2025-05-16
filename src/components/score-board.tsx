"use client"

import { motion } from "framer-motion"
import { useGame } from "./game-context"
import { Award, Star } from "lucide-react"

export default function ScoreBoard() {
  const { score, items, level, totalLevels } = useGame()

  const totalItems = items.length
  const sortedItems = items.filter((item) => item.sorted).length
  const progress = Math.max(5, (sortedItems / totalItems) * 100)

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 mb-6 shadow-xl border-2 border-green-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-3 shadow-lg"
            >
              <Award size={28} />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -inset-1 rounded-full bg-green-300 -z-10"
            ></motion.div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-700">Puntuación</h2>
            <motion.p
              key={score}
              initial={{ scale: 1.5, color: "#22c55e" }}
              animate={{ scale: 1, color: "#000000" }}
              className="text-3xl font-bold"
            >
              {score}
            </motion.p>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-green-700">Progreso del nivel</span>
            <span className="text-sm font-medium text-green-700">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full relative"
            >
              {progress > 50 && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 opacity-25">
                    <div
                      className="h-full w-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%)]"
                      style={{ backgroundSize: "10px 10px" }}
                    ></div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <h2 className="text-xl font-bold text-green-700">Nivel</h2>
            <div className="flex items-center justify-end">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <p className="text-lg font-bold">
                {level} <span className="text-gray-500 text-sm">/ {totalLevels}</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-3 shadow-lg"
            >
              <Star size={28} />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
              className="absolute -inset-1 rounded-full bg-blue-300 -z-10"
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
