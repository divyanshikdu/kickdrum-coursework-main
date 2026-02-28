import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext"
import ProductCard from "../../components/ProductCard/ProductCard"

function Home(){
  const context= useContext(ProductContext)
  if(!context) return null
  const{ products,loading,searchQuery, searchResults,error }=context
  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>
    const product = searchQuery.trim() ? searchResults : products;

  return (
    <div className="home-container">
      {product.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )



}
export default Home;