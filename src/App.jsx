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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8BBD9] via-white to-[#048D9] relative overflow-hidden">
      {/* Fondo decorativo mejorado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ondas de color de fondo */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#048F68]/20 via-[#F8BBD9]/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-[#F28705]/20 via-[#048D9]/20 to-transparent"></div>
        
        {/* Elementos flotantes decorativos */}
        <div className="absolute top-10 left-10">
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Sparkles className="text-[#FF1493] h-12 w-12 opacity-60" />
          </motion.div>
        </div>
        <div className="absolute top-32 right-20">
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          >
            <Sparkles className="text-[#048F68] h-8 w-8 opacity-50" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
          >
            <Sparkles className="text-[#F28705] h-16 w-16 opacity-40" />
          </motion.div>
        </div>
        <div className="absolute bottom-40 left-16">
          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            <Sparkles className="text-[#048D9] h-10 w-10 opacity-45" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#F8BBD9] to-white z-50"
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
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#FF1493]">
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
                    className="h-24 w-24 text-[#FF1493]"
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
              <h1 className="text-4xl font-bold text-[#FF1493]">Eco Detective</h1>
              <p className="text-[#048D9] mt-2 font-medium">Cargando aventura ecológica...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!gameStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-4 border-[#048F68] max-w-md relative overflow-hidden"
        >
          {/* Fondo decorativo interno */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8BBD9] rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F28705] rounded-full translate-y-12 -translate-x-12"></div>
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
                  className="h-24 w-24 mx-auto text-[#FF1493]"
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
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8BBD9] to-[#FF1493] -z-10"
                ></motion.div>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold mb-2 text-[#FF1493] tracking-tight">Eco Detective</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-[#FF1493] to-[#F28705] mx-auto mb-4 rounded-full"></div>
            <p className="mb-8 text-lg text-[#048D9] font-medium">
              Ayuda al planeta clasificando correctamente los residuos en este divertido juego ecológico
            </p>

            <div className="flex flex-col space-y-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(255, 20, 147, 0.3), 0 10px 10px -5px rgba(255, 20, 147, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF1493] to-[#F28705] text-white rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300"
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

              <div className="text-sm text-[#048D9] mt-4 space-y-2">
                <div className="flex items-center justify-center space-x-3">
                  <span className="block w-3 h-3 rounded-full bg-gradient-to-r from-[#048F68] to-[#048D9]"></span>
                  <span className="font-medium">Aprende sobre reciclaje</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="block w-3 h-3 rounded-full bg-gradient-to-r from-[#FF1493] to-[#F8BBD9]"></span>
                  <span className="font-medium">Clasifica residuos correctamente</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="block w-3 h-3 rounded-full bg-gradient-to-r from-[#F28705] to-[#FF1493]"></span>
                  <span className="font-medium">¡Diviértete mientras cuidas el planeta!</span>
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