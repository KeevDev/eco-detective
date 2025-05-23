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
    image: "https://biopoliyuca.com/cdn/shop/files/BOTELLA250ML.png?v=1704736538&width=1946",
    position: { x: 20, y: 30 },
    description: "Las botellas de plástico tardan hasta 500 años en degradarse",
  },
  {
    id: 2,
    name: "Papel de cuaderno",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://static.vecteezy.com/system/resources/previews/012/375/457/non_2x/blank-notebook-paper-sheet-with-lines-png.png",
    position: { x: 40, y: 20 },
    description: "El papel puede reciclarse hasta 7 veces antes de perder calidad",
  },
  {
    id: 3,
    name: "Cáscara de banana",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/cascara-de-platano-8113563-6578261.png?f=webp",
    position: { x: 60, y: 25 },
    description: "Los residuos orgánicos pueden convertirse en compost",
  },
  {
    id: 4,
    name: "Envase de yogurt",
    type: "plastico",
    found: true,
    sorted: false,
    image: "https://agrinsa.com.gt/wp-content/uploads/2023/12/Yogurt-natural-litro-envase-plastico-1.png",
    position: { x: 80, y: 30 },
    description: "Los envases de yogurt son reciclables si están limpios",
  },
  {
    id: 5,
    name: "Hoja de papel",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://grupotucan.com/media/catalog/product/cache/1/image/530x/040ec09b1e35df139433887a97daa66f/i/m/img_0034.png",
    position: { x: 30, y: 60 },
    description: "Reciclar una tonelada de papel salva 17 árboles",
  },
  {
    id: 6,
    name: "Manzana mordida",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://png.pngtree.com/png-vector/20241117/ourmid/pngtree-realistic-red-apple-clipart-with-bite-mark-and-leaf-high-quality-png-image_14460304.png",
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
    image: "https://dwism5cwvtbn6.cloudfront.net/eyJidWNrZXQiOiJlc3RyYXRlZ2lhLXdlYiIsImtleSI6InByb2R1Y3RzLzUwOTI0L2ltYWdlbi1ib2xzYS1ibGFuY2EtcGFyYS1wYXBlbGVyYS1wYXEteC0xMC11bmQtMTI3MzE2NS04MDAtNjAwLTEtNzUtcmVtb3ZlYmctcHJldmlldy1wbmctMjAyMS0xMS0yMi0wOS0wOC00Mi5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMDB9fX0=",
    position: { x: 25, y: 35 },
    description: "Las bolsas plásticas pueden tardar hasta 1000 años en degradarse",
  },
  {
    id: 8,
    name: "Periódico",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://productos.larepublica.co/_nuxt/img/cover-edictos-2024.ef93df9.png",
    position: { x: 45, y: 25 },
    description: "El papel de periódico es uno de los más fáciles de reciclar",
  },
  {
    id: 9,
    name: "Restos de comida",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://www.deltatrak.com/images/solution-pages/food-safety/holding-2.tny.png",
    position: { x: 65, y: 30 },
    description: "Los restos de comida generan metano en los vertederos",
  },
  {
    id: 10,
    name: "Botella de champú",
    type: "plastico",
    found: true,
    sorted: false,
    image: "https://png.pngtree.com/png-clipart/20241020/original/pngtree-essential-shampoo-bottle-quality-hair-care-solutions-png-image_16420831.png",
    position: { x: 85, y: 40 },
    description: "Las botellas de champú son reciclables, pero debes enjuagarlas primero",
  },
  {
    id: 11,
    name: "Caja de cartón",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://www.vilapack.com/wp-content/uploads/2024/02/cajas-de-carton-estandar.png",
    position: { x: 35, y: 55 },
    description: "El cartón puede reciclarse hasta 25 veces",
  },
  {
    id: 12,
    name: "Cáscara de naranja",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://png.pngtree.com/png-clipart/20250302/original/pngtree-set-of-orange-peels-isolated-on-a-white-background-png-image_20552023.png",
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
    image: "https://bolsaselindio.com.co/wp-content/uploads/2017/06/vaso.png",
    position: { x: 15, y: 25 },
    description: "Los vasos desechables suelen estar hechos de poliestireno, difícil de reciclar",
  },
  {
    id: 14,
    name: "Revista",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://assets.blurb.com/pages/website-assets/magazine/Magazine_Lane3_Row1-e27e6b3dfc4949ef0601ae11ce873fb0fce436a3c989c1e2a726b969f8197609.png",
    position: { x: 35, y: 15 },
    description: "Las revistas tienen un papel especial que puede reciclarse",
  },
  {
    id: 15,
    name: "Hojas secas",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://png.pngtree.com/png-clipart/20240310/original/pngtree-dry-leaves-png-image_14561546.png",
    position: { x: 55, y: 20 },
    description: "Las hojas secas son excelentes para el compostaje",
  },
  {
    id: 16,
    name: "Juguete de plástico",
    type: "plastico",
    found: true,
    sorted: false,
    image: "https://static.vecteezy.com/system/resources/previews/046/594/783/non_2x/truck-plastic-toy-free-png.png",
    position: { x: 75, y: 35 },
    description: "Muchos juguetes de plástico no son reciclables por sus componentes mixtos",
  },
  {
    id: 17,
    name: "Sobre de papel",
    type: "papel",
    found: true,
    sorted: false,
    image: "https://drafperu.com/wp-content/uploads/2025/01/sobre-de-papel-kraft-3.webp",
    position: { x: 25, y: 65 },
    description: "Los sobres pueden reciclarse, pero retira primero las ventanas de plástico",
  },
  {
    id: 18,
    name: "Posos de café",
    type: "organico",
    found: true,
    sorted: false,
    image: "https://png.pngtree.com/png-clipart/20240308/original/pngtree-the-coffee-grounds-particle-isolated-png-image_14535096.png",
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
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (!item) return prevItems;

      const isCorrect = item.type === binType;

      // Actualizar puntaje
      if (isCorrect) {
        setScore(prevScore => prevScore + 100);
      } else {
        setScore(prevScore => Math.max(0, prevScore - 50));
      }

      // Guardar el último item clasificado
      setLastSortedItem({ id, correct: isCorrect });

      // Actualizar items manteniendo los cambios previos
      return prevItems.map(item =>
        item.id === id ? { ...item, sorted: isCorrect } : item
      );
    });

    return isCorrect;
  };

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
