"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, X, Trash2, Info, Award } from "lucide-react"

export default function Instructions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-700 flex items-center">
                  <HelpCircle className="mr-2 text-green-600" size={24} />
                  Instrucciones
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Objetivo del juego</h3>
                    <p className="text-gray-700">
                      Clasifica correctamente todos los residuos en sus respectivas canecas para completar cada nivel y
                      aprender sobre reciclaje.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Cómo jugar</h3>
                    <ol className="list-decimal list-inside mt-2 space-y-2 text-gray-700">
                      <li>Arrastra los objetos que aparecen en la pantalla</li>
                      <li>Suéltalos en la caneca del color correspondiente</li>
                      <li>Cada objeto tiene información educativa (haz clic en el botón ℹ️)</li>
                    </ol>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Sistema de puntos</h3>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                      <li>
                        <span className="text-green-600 font-bold">+100 puntos</span> por clasificación correcta
                      </li>
                      <li>
                        <span className="text-red-500 font-bold">-50 puntos</span> por clasificación incorrecta
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Tipos de residuos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-md mb-1"></div>
                      <p className="text-sm font-medium">Plástico</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md mb-1"></div>
                      <p className="text-sm font-medium">Papel</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-md mb-1"></div>
                      <p className="text-sm font-medium">Orgánico</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                ¡Entendido!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
