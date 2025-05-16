"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import GameScene from "./components/game-scene"
import ScoreBoard from "./components/score-board"
import Instructions from "./components/instructions"
import { GameProvider } from "./components/game-context"
import GameComplete from "./components/game-complete"
import EcoMascot from "./components/eco-mascot"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Añadir un pequeño retraso antes de mostrar la animación de intro
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 via-blue-50 to-green-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-100 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-100 to-transparent opacity-70"></div>
        <div className="absolute top-10 left-10">
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Sparkles className="text-green-500 h-12 w-12 opacity-30" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          >
            <Sparkles className="text-green-500 h-16 w-16 opacity-30" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: 1,
                repeatType: "reverse",
              }}
              className="text-center"
            >
              <div className="relative w-40 h-40 mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
                    <path
                      d="M50 10 A40 40 0 1 1 49.9 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="5 5"
                    />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-green-700">Eco Detective</h1>
              <p className="text-green-600 mt-2">Cargando aventura ecológica...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!gameStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white p-8 rounded-xl shadow-2xl border-4 border-green-500 max-w-md relative overflow-hidden"
        >
          {/* Fondo decorativo */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute top-0 left-0 right-0 h-40 bg-contain bg-repeat-x"
              style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')" }}
            ></div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1.5,
              }}
              className="mb-6"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 rounded-full bg-green-200 -z-10"
                ></motion.div>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold mb-2 text-green-700 tracking-tight">Eco Detective</h1>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-4"></div>
            <p className="mb-8 text-lg text-gray-700">
              Ayuda al planeta clasificando correctamente los residuos en este divertido juego ecológico
            </p>

            <div className="flex flex-col space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium text-lg shadow-lg flex items-center justify-center space-x-2"
                onClick={() => setGameStarted(true)}
              >
                <span>¡Comenzar Aventura!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>

              <div className="text-sm text-gray-500 mt-4">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Aprende sobre reciclaje</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Clasifica residuos correctamente</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>¡Diviértete mientras cuidas el planeta!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mascota */}
          <div className="absolute -bottom-10 -right-10">
            <EcoMascot size="small" />
          </div>
        </motion.div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <GameProvider>
            <div className="w-full max-w-6xl">
              <ScoreBoard />
              <div className="relative">
                <GameScene />
                <div className="absolute -top-12 -right-12 z-10">
                  <EcoMascot size="medium" />
                </div>
              </div>
              <Instructions />
              <GameComplete />
            </div>
          </GameProvider>
        </DndProvider>
      )}
    </main>
  )
}
