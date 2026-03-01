import { Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { setSearchQuery } from "../../store/productSlice"
import { searchProducts } from "../../store/services/productThunks";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const {searchQuery }= useSelector((state: RootState) => 
    state.products);
  const handleChange = (value: string) => {
    dispatch(setSearchQuery(value));

    if (value.trim()) {
      dispatch(searchProducts(value));
    }

}
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
          onChange={(e) => handleChange(e.target.value)}
          className="search-input"
        />

        <Link to="/" className="navbar-home">Home</Link>
      </div>
    </header>
  );

}

export default Header;
