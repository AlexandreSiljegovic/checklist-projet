import { Link, Outlet } from "react-router-dom";

const Nav = () => {
return( 
  <>

<nav className="navbar">
<ul className="nav-list">
  <li className="nav-item">
    <a href="#" className="button">
      <span className="home">Home</span>
    </a>
  </li>
  <li className="nav-item">
    <a to="/form" href="#" className="button">
      <span className="mes-Listes">Mes listes</span>
    </a>
  </li>
  <li className="nav-item">
    <Link to="/form" className="button">
      <span className="creer-une-liste">Créer une liste</span>
    </Link>
  </li>
</ul>
</nav> 
<Outlet />
</>

)
}
 export default Nav;