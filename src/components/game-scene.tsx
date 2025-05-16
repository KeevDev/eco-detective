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

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border-4 border-green-600 shadow-2xl">
      {/* Overlay de nivel */}
      <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg z-20">
        Nivel {level}
      </div>

      {/* Fondo del juego */}
      <motion.div
        key={`level-${level}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: getBackgroundImage(),
        }}
      >
        {/* Efecto de viñeta */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none"></div>

        {/* Objetos arrastrables */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {visibleItems.map((item) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                image={item.image}
                position={item.position}
                description={item.description}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Efecto de feedback para clasificación */}
      {lastSortedItem && <FeedbackEffect correct={lastSortedItem.correct} itemId={lastSortedItem.id} />}

      <RecycleBins />
    </div>
  )
}
