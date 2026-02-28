import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ProductContext } from "../../context/ProductContext"
function ProductDetails() {
    const {id}=useParams()
 const navigate = useNavigate()
 
const context=useContext(ProductContext)

  

  useEffect(() => {
    if (context && id) {
      context.fetchProductById(id)
    }
  }, [id])
if(!context) return null
const { selectedProduct, loading, error } = context
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!selectedProduct) return null

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)}>Back</button>

      <div className="details-wrapper">
        <img
          src={selectedProduct.thumbnail}
          alt={selectedProduct.title}
          className= "details-main-image"
        />

        <div className="details-info">
          <h1>{selectedProduct.title}</h1>
          <div className= "details-price">${selectedProduct.price}</div>
          <p>{selectedProduct.description}</p>
          <p>Discount: {selectedProduct.discountPercentage}%</p>
          <p>Rating: {selectedProduct.rating}</p>
          <p>Stock: {selectedProduct.stock}</p>
          <p>Brand: {selectedProduct.brand}</p>
          <p>Category: {selectedProduct.category}</p>
        </div>
      </div>

      <h3 className="details-images-title">Images</h3>
      <div className="details-gallery">
        {selectedProduct.images.map((img, index) => (
          <img key={index} src={img} alt="product" />
        ))}
      </div>
    </div>
  )

}
export default ProductDetails
