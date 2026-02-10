import { Link } from "react-router-dom"
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

function Header() {
  const context = useContext(ProductContext);
  if (!context) return null;
  const { searchQuery, setSearchQuery } = context;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
         Product Discovery
 </Link>
 <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
<Link to="/" className="navbar-home"> Home </Link>
      </div>
    </header>
  )
}
export default Header
