import ProductCard from "../../components/ProductCard/ProductCard"
import { useEffect } from "react" 
import {  useDispatch,useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/services/productThunks";



function Home(){
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error,searchQuery,searchResults } = useSelector(
      (state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
    const product = searchQuery ? searchResults : products;

    return (
      <div className="home-container">
      {product.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );



}
export default Home;