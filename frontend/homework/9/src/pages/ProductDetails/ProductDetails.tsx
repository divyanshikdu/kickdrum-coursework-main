import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchProductById } from "../../store/services/productThunks";


function ProductDetails() {
    const {id}=useParams()
 const navigate = useNavigate()
 const dispatch=useDispatch<AppDispatch>();
 const {selectedProduct, loading, error} = useSelector((state: RootState) => state.products)

  useEffect(()=>{
    if(id){
      dispatch(fetchProductById(id));
    }
  },[id,dispatch]);
  if(loading) return <p>Loading product details...</p>;
  if(error) return <p>{error}</p>;
  if(!selectedProduct) return <p>Product not found</p>;

  return(
    <div className="details-container">
      <button onClick={()=>navigate(-1)}>Back</button>
  <div className="details-wrapper">
    <img
      src={selectedProduct.thumbnail}
      alt={selectedProduct.title}
      className="details-main-image"
    />

    <div className="details-info">
      <h1>{selectedProduct.title}</h1>
      <p>{selectedProduct.description}</p>
      <p>Price: ${selectedProduct.price}</p>
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
