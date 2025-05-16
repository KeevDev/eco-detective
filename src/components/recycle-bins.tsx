"use client"

import { useDrop } from "react-dnd"
import { motion } from "framer-motion"
import { useGame } from "./game-context"

export default function RecycleBins() {
  const { sortItem } = useGame()

  const [{ isOver: isOverPlastico }, dropPlastico] = useDrop(() => ({
    accept: "item",
    drop: (item: { id: number }) => {
      sortItem(item.id, "plastico")
      return { type: "plastico" } // Return an object instead of the boolean from sortItem
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const [{ isOver: isOverPapel }, dropPapel] = useDrop(() => ({
    accept: "item",
    drop: (item: { id: number }) => {
      sortItem(item.id, "papel")
      return { type: "papel" } // Return an object instead of the boolean from sortItem
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const [{ isOver: isOverOrganico }, dropOrganico] = useDrop(() => ({
    accept: "item",
    drop: (item: { id: number }) => {
      sortItem(item.id, "organico")
      return { type: "organico" } // Return an object instead of the boolean from sortItem
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
      {/* Caneca Plástico */}
      <motion.div
        ref={dropPlastico}
        whileHover={{ scale: 1.05 }}
        animate={isOverPlastico ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-20 h-28 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* Tapa */}
            <div className="h-4 bg-gradient-to-r from-blue-700 to-blue-800 w-full"></div>

            {/* Cuerpo */}
            <div className="flex-1 flex items-center justify-center p-2">
              {/* Símbolo de reciclaje */}
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
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
                <div className="text-xs font-bold mt-1">PLÁSTICO</div>
              </div>
            </div>

            {/* Efecto de brillo */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

            {/* Efecto de hover */}
            {isOverPlastico && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-blue-300/30 pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Etiqueta */}
        <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold text-blue-600 border-2 border-blue-500">
          Plástico
        </div>
      </motion.div>

      {/* Caneca Papel */}
      <motion.div
        ref={dropPapel}
        whileHover={{ scale: 1.05 }}
        animate={isOverPapel ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-20 h-28 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* Tapa */}
            <div className="h-4 bg-gradient-to-r from-yellow-700 to-yellow-800 w-full"></div>

            {/* Cuerpo */}
            <div className="flex-1 flex items-center justify-center p-2">
              {/* Símbolo de reciclaje */}
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
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
                <div className="text-xs font-bold mt-1">PAPEL</div>
              </div>
            </div>

            {/* Efecto de brillo */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

            {/* Efecto de hover */}
            {isOverPapel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-yellow-300/30 pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Etiqueta */}
        <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold text-yellow-600 border-2 border-yellow-500">
          Papel
        </div>
      </motion.div>

      {/* Caneca Orgánico */}
      <motion.div
        ref={dropOrganico}
        whileHover={{ scale: 1.05 }}
        animate={isOverOrganico ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-20 h-28 bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* Tapa */}
            <div className="h-4 bg-gradient-to-r from-green-700 to-green-800 w-full"></div>

            {/* Cuerpo */}
            <div className="flex-1 flex items-center justify-center p-2">
              {/* Símbolo de reciclaje */}
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
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
                <div className="text-xs font-bold mt-1">ORGÁNICO</div>
              </div>
            </div>

            {/* Efecto de brillo */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

            {/* Efecto de hover */}
            {isOverOrganico && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-green-300/30 pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Etiqueta */}
        <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold text-green-600 border-2 border-green-500">
          Orgánico
        </div>
      </motion.div>
    </div>
  )
}
