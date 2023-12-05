import { Link, Outlet } from "react-router-dom";


const Nav = () => {
  return (
    <div>
        <nav>
            <h1>Pre-flight Checklist</h1>
            <div className='access'>
                <Link to='/'>Home</Link>
                <Link to='/form'>Créer une liste</Link>
                <Link to ='statut'>Statut</Link>
                  <Link to='/viewmodify'> Modify a list</Link>
            </div>
        </nav>
        <Outlet />
    </div>
);
}
 export default Nav;