import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss"

type Props = {
  product: Product
}
function ProductCard({ product }: Props) {
  const nvg=useNavigate()
  const click=()=>{
    nvg(`/product/${product.id}`)
  }
 return(
        <div className={styles.card} onClick={click}>
      <img
        src={product.thumbnail}  alt={product.title} className={styles.image} />
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>${product.price}</div>
      <div>Rating: {product.rating}</div>
      <div>Brand: {product.brand}</div>
    </div>

 )
}
export default ProductCard
