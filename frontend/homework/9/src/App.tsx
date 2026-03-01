import {BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header";
import ProductDetails from "./pages/ProductDetails/ProductDetails"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
