"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos de residuos
export type WasteType = "plastico" | "papel" | "organico"

// Tipo para los objetos/items del juego
export type ItemType = {
  id: number
  name: string
  type: WasteType
  found: boolean
  sorted: boolean
  image: string
  position: { x: number; y: number }
  description: string
}

// Tipo para el contexto del juego
type GameContextType = {
  items: ItemType[]
  score: number
  foundItems: ItemType[]
  gameCompleted: boolean
  lastSortedItem: { id: number; correct: boolean } | null
  findItem: (id: number) => void
  sortItem: (id: number, binType: string) => boolean
  resetGame: () => void
  level: number
  setLevel: (level: number) => void
  totalLevels: number
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Datos de los items para el nivel 1
const level1Items: ItemType[] = [
  {
    id: 1,
    name: "Botella de plástico",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=80&width=40",
    position: { x: 20, y: 30 },
    description: "Las botellas de plástico tardan hasta 500 años en degradarse",
  },
  {
    id: 2,
    name: "Papel de cuaderno",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=80&width=80",
    position: { x: 40, y: 20 },
    description: "El papel puede reciclarse hasta 7 veces antes de perder calidad",
  },
  {
    id: 3,
    name: "Cáscara de banana",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=60&width=80",
    position: { x: 60, y: 25 },
    description: "Los residuos orgánicos pueden convertirse en compost",
  },
  {
    id: 4,
    name: "Envase de yogurt",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=70&width=50",
    position: { x: 80, y: 30 },
    description: "Los envases de yogurt son reciclables si están limpios",
  },
  {
    id: 5,
    name: "Hoja de papel",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=70&width=60",
    position: { x: 30, y: 60 },
    description: "Reciclar una tonelada de papel salva 17 árboles",
  },
  {
    id: 6,
    name: "Manzana mordida",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=60&width=60",
    position: { x: 70, y: 50 },
    description: "Las frutas se descomponen naturalmente en 2-5 semanas",
  },
]

// Datos de los items para el nivel 2
const level2Items: ItemType[] = [
  {
    id: 7,
    name: "Bolsa plástica",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=70&width=80",
    position: { x: 25, y: 35 },
    description: "Las bolsas plásticas pueden tardar hasta 1000 años en degradarse",
  },
  {
    id: 8,
    name: "Periódico",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=80&width=90",
    position: { x: 45, y: 25 },
    description: "El papel de periódico es uno de los más fáciles de reciclar",
  },
  {
    id: 9,
    name: "Restos de comida",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=65&width=75",
    position: { x: 65, y: 30 },
    description: "Los restos de comida generan metano en los vertederos",
  },
  {
    id: 10,
    name: "Botella de champú",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=85&width=45",
    position: { x: 85, y: 40 },
    description: "Las botellas de champú son reciclables, pero debes enjuagarlas primero",
  },
  {
    id: 11,
    name: "Caja de cartón",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=75&width=75",
    position: { x: 35, y: 55 },
    description: "El cartón puede reciclarse hasta 25 veces",
  },
  {
    id: 12,
    name: "Cáscara de naranja",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=60&width=65",
    position: { x: 75, y: 60 },
    description: "Las cáscaras de naranja pueden usarse para hacer productos de limpieza",
  },
]

// Datos de los items para el nivel 3
const level3Items: ItemType[] = [
  {
    id: 13,
    name: "Vaso desechable",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=75&width=50",
    position: { x: 15, y: 25 },
    description: "Los vasos desechables suelen estar hechos de poliestireno, difícil de reciclar",
  },
  {
    id: 14,
    name: "Revista",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=70&width=85",
    position: { x: 35, y: 15 },
    description: "Las revistas tienen un papel especial que puede reciclarse",
  },
  {
    id: 15,
    name: "Hojas secas",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=55&width=70",
    position: { x: 55, y: 20 },
    description: "Las hojas secas son excelentes para el compostaje",
  },
  {
    id: 16,
    name: "Juguete de plástico",
    type: "plastico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=65&width=65",
    position: { x: 75, y: 35 },
    description: "Muchos juguetes de plástico no son reciclables por sus componentes mixtos",
  },
  {
    id: 17,
    name: "Sobre de papel",
    type: "papel",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=60&width=80",
    position: { x: 25, y: 65 },
    description: "Los sobres pueden reciclarse, pero retira primero las ventanas de plástico",
  },
  {
    id: 18,
    name: "Posos de café",
    type: "organico",
    found: true,
    sorted: false,
    image: "/placeholder.svg?height=55&width=55",
    position: { x: 65, y: 55 },
    description: "Los posos de café son excelentes para el jardín como fertilizante",
  },
]

// Todos los niveles disponibles
const allLevels = [level1Items, level2Items, level3Items]

export function GameProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState(1)
  const [items, setItems] = useState<ItemType[]>(level1Items)
  const [score, setScore] = useState(0)
  const [lastSortedItem, setLastSortedItem] = useState<{ id: number; correct: boolean } | null>(null)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Cambiar los items cuando cambia el nivel
  useEffect(() => {
    setItems(allLevels[level - 1])
    setGameCompleted(false)
  }, [level])

  // Verificar si el juego está completo
  useEffect(() => {
    if (items.every((item) => item.sorted)) {
      setGameCompleted(true)
    }
  }, [items])

  const findItem = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, found: true } : item)))
  }

  const sortItem = (id: number, binType: string) => {
    const item = items.find((item) => item.id === id)

    if (!item) return false

    const isCorrect = item.type === binType

    if (isCorrect) {
      setScore(score + 100)
      setItems(items.map((item) => (item.id === id ? { ...item, sorted: true } : item)))
    } else {
      setScore(Math.max(0, score - 50))
    }

    // Guardar el último item clasificado y si fue correcto
    setLastSortedItem({ id, correct: isCorrect })

    // Limpiar el estado después de un tiempo
    setTimeout(() => {
      setLastSortedItem(null)
    }, 2000)

    return isCorrect
  }

  const resetGame = () => {
    setItems(level1Items)
    setScore(0)
    setLevel(1)
    setGameCompleted(false)
  }

  const foundItems = items.filter((item) => item.found && !item.sorted)

  return (
    <GameContext.Provider
      value={{
        items,
        score,
        foundItems,
        gameCompleted,
        lastSortedItem,
        findItem,
        sortItem,
        resetGame,
        level,
        setLevel,
        totalLevels: allLevels.length,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
