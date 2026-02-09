import { Link } from "react-router-dom"
import styles from "./Header.module.scss"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
         Product Discovery
 </Link>
<Link to="/" className={styles.homeBtn}> Home </Link>
      </div>
    </header>
  )
}
export default Header
