import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { Product } from "../../types/product";
import styles from "./ProductDetails.module.scss";
function ProductDetails() {
    const {id}=useParams()
 const [product, setProduct] = useState<Product | null>(null)
 const navigate = useNavigate()
 
  useEffect(() => {
    if (!id) return
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
  }, [id])
if (!product) return <p>Loading...</p>

return (
  <div className="container">
    <button onClick={() => navigate(-1)}>Back</button>
    <div className={styles.wrapper}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.mainImage}
      />
      <div className={styles.info}>
   <h1>{product.title}</h1>
<div className={styles.price}>${product.price}</div>
     <p>{product.description}</p>
     <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
     <p>Stock: {product.stock}</p>
<p>Brand: {product.brand}</p>
 <p>Category: {product.category}</p>
</div>
    </div>
    <h3 style={{ marginTop: "24px" }}>Images</h3>
    <div className={styles.gallery}>
      {product.images.map((img, index) => (
        <img key={index} src={img} alt="product" />
      ))}
    </div>
  </div>
)
}
export default ProductDetails
