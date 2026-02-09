import { useEffect,useState } from "react";
import type { Product } from "../../types/product";
import styles from "./Home.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
function Home(){
const [products,setProducts]=useState<Product[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      setProducts(data.products)
      setLoading(false)
    })
    .catch(() => {
      setError("Failed to load products")
      setLoading(false)
    })
}, [])
if (loading) return <p>Loading products...</p>
if (error) return <p>{error}</p>
  return <div className="container">
  <div className={styles.container}>
    {products.map(p => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
</div>
}
export default Home;