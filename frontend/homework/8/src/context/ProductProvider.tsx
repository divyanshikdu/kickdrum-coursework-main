import { useState, useEffect } from "react"
import type { Product } from "../types/product"
import { ProductContext } from "./ProductContext"

type Props = {
  children: React.ReactNode
}

function ProductProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)



  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("https://dummyjson.com/products")
      const data = await res.json()
      setProducts(data.products)
    } catch {
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])





  const fetchProductById = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await res.json()
      setSelectedProduct(data)
    } catch {
      setError("Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
setSearchResults([])
    return
    }
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        const data = await res.json()
        setSearchResults(data.products)
      } catch {
        setError("Search fail")
      } finally {
        setLoading(false)
      } }, 500)
 return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <ProductContext.Provider
      value={{products,selectedProduct,searchQuery,searchResults,loading,
        error,fetchProductById,setSearchQuery,}} >
      {children}
    </ProductContext.Provider>
  )
}
export default ProductProvider