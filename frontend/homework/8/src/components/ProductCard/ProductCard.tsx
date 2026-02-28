import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product
}
function ProductCard({ product }: Props) {
  const nvg=useNavigate()
  const click=()=>{
    nvg(`/product/${product.id}`)
  }
 return(
        <div className="product-card" onClick={click}>
      <img
        src={product.thumbnail}  alt={product.title} className="product-card-image" />
      <div className= "product-card-title">{product.title}</div>
      <div className= "product-card-price">${product.price}</div>
      <div>Rating: {product.rating}</div>
      <div>Brand: {product.brand}</div>
    </div>

 )
}
export default ProductCard