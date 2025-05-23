"use client"

import { useGame } from "./game-context"
import RecycleBins from "./recycle-bins"
import DraggableItem from "./draggable-item"
import { motion, AnimatePresence } from "framer-motion"
import FeedbackEffect from "./feedback-effect"

export default function GameScene() {
  const { items, lastSortedItem, level } = useGame()

  // Filtrar solo los items que están encontrados pero no clasificados
  const visibleItems = items.filter((item) => item.found && !item.sorted)

  // Determinar la imagen de fondo según el nivel
  const getBackgroundImage = () => {
    switch (level) {
      case 1:
        return "url('https://i0.wp.com/colegioeuropamalaga.com/wp-content/uploads/2021/02/PAG91521-scaled.jpg?fit=2560%2C1920&ssl=1')"
      case 2:
        return "url('https://i0.wp.com/colegioeuropamalaga.com/wp-content/uploads/2021/02/PAG91521-scaled.jpg?fit=2560%2C1920&ssl=1')" // Cambiar por otra imagen para nivel 2
      case 3:
        return "url('https://i0.wp.com/colegioeuropamalaga.com/wp-content/uploads/2021/02/PAG91521-scaled.jpg?fit=2560%2C1920&ssl=1')" // Cambiar por otra imagen para nivel 3
      default:
        return "url('https://i0.wp.com/colegioeuropamalaga.com/wp-content/uploads/2021/02/PAG91521-scaled.jpg?fit=2560%2C1920&ssl=1')"
    }
  }

  // Determinar el color del badge según el nivel
  const getLevelBadgeColor = () => {
    switch (level) {
      case 1:
        return "bg-gradient-to-r from-[#048F68] to-[#048D9]"
      case 2:
        return "bg-gradient-to-r from-[#FF1493] to-[#F28705]"
      case 3:
        return "bg-gradient-to-r from-[#F28705] to-[#FF1493]"
      default:
        return "bg-gradient-to-r from-[#048F68] to-[#048D9]"
    }
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border-4 border-[#048F68] shadow-2xl bg-gradient-to-br from-[#F8BBD9]/10 to-[#048D9]/10">
      {/* Overlay de nivel mejorado */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={`absolute top-4 left-4 ${getLevelBadgeColor()} text-white px-6 py-3 rounded-full font-bold shadow-lg z-20 backdrop-blur-sm border-2 border-white/20`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-lg">Nivel {level}</span>
        </div>
      </motion.div>

      {/* Indicador de progreso del nivel */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-[#F8BBD9] shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF1493] to-[#F28705]"></div>
            <span className="text-[#048F68] font-semibold text-sm">
              {items.filter(item => item.sorted).length}/{items.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Fondo del juego */}
      <motion.div
        key={`level-${level}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: getBackgroundImage(),
        }}
      >
        {/* Efecto de viñeta mejorado con gradientes de la paleta */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8BBD9]/20 via-transparent to-[#048F68]/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#048D9]/40 pointer-events-none"></div>

        {/* Overlay decorativo sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8BBD9]/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#048F68]/15 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#FF1493]/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F28705]/5 to-transparent"></div>
        </div>

        {/* Objetos arrastrables */}
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  y: -20,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <DraggableItem
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  image={item.image}
                  position={item.position}
                  description={item.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Efecto de feedback para clasificación */}
      {lastSortedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FeedbackEffect correct={lastSortedItem.correct} itemId={lastSortedItem.id} />
        </motion.div>
      )}

      {/* Elementos decorativos en las esquinas */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F8BBD9] to-[#FF1493] opacity-60 blur-sm"
        ></motion.div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          className="w-6 h-6 rounded-full bg-gradient-to-r from-[#048F68] to-[#048D9] opacity-50 blur-sm"
        ></motion.div>
      </div>

      <RecycleBins />
    </div>
  )
}