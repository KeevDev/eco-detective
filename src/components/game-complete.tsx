"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "./game-context"
import { Award, ArrowRight, Star } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function GameComplete() {
  const { gameCompleted, score, level, setLevel, totalLevels } = useGame()

  // Lanzar confetti cuando se completa el nivel
  useEffect(() => {
    if (gameCompleted) {
      const duration = 3 * 1000
      const end = Date.now() + duration

      const colors = ["#22c55e", "#3b82f6", "#eab308"]
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [gameCompleted])

  // Determinar si hay un siguiente nivel disponible
  const hasNextLevel = level < totalLevels

  // Manejar el avance al siguiente nivel
  const handleNextLevel = () => {
    setLevel(level + 1)
  }

  return (
    <AnimatePresence>
      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl p-8 max-w-md w-full relative overflow-hidden"
          >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="absolute top-0 left-0 right-0 h-40 bg-contain bg-repeat-x"
                style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')" }}
              ></div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{ duration: 1.5 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg"
                >
                  <Award size={40} />
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold text-center text-green-700 mb-2">¡Nivel Completado!</h2>
              <div className="h-1 w-20 bg-green-500 mx-auto mb-4"></div>

              <div className="text-center mb-6">
                <p className="text-lg text-gray-700 mb-4">Has clasificado correctamente todos los residuos</p>
                <div className="flex justify-center items-center space-x-2 mb-2">
                  <Star className="text-yellow-500" size={24} />
                  <span className="text-2xl font-bold">Nivel {level}</span>
                  <Star className="text-yellow-500" size={24} />
                </div>
                <p className="text-3xl font-bold text-green-600 mb-4">{score} puntos</p>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <p className="text-green-800 font-medium">
                    {hasNextLevel
                      ? "¡Excelente trabajo! Continúa al siguiente nivel para seguir aprendiendo sobre reciclaje."
                      : "¡Felicidades! Has completado todos los niveles y te has convertido en un experto en reciclaje."}
                  </p>
                </div>
              </div>

              {hasNextLevel ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium flex items-center justify-center"
                  onClick={handleNextLevel}
                >
                  <span>Siguiente Nivel</span>
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-bold text-green-700 mb-4">¡Has completado todos los niveles!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium"
                    onClick={() => window.location.reload()}
                  >
                    Jugar de nuevo
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
