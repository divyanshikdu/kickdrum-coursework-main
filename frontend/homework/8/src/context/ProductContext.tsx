import { createContext } from "react"
import type { Product } from "../types/product"

export type ProductContextType = {
  
  

    products: Product[]
    selectedProduct: Product | null
  searchQuery: string
searchResults: Product[]
loading: boolean
error: string | null
fetchProductById: (id: string) => Promise<void>
  setSearchQuery: (q: string) => void
}
export const ProductContext = createContext<ProductContextType | null>(null)
