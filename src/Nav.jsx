import { Link, Outlet } from "react-router-dom";


const Nav = () => {
  return (
    <div>
        <nav>
            <h1 className="pre-flight">Pre-flight Checklist</h1>
            <div className='access'>
                <Link to='/'>Home</Link>
                <Link to='/form'>Create a list</Link>
                <Link to ='statut'>Statut</Link>
                 
            </div>
        </nav>
        <Outlet />
    </div>
);
}
 export default Nav;