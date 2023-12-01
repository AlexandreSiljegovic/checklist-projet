import {Link} from 'react-router-dom';



const Dashboard = () => {
    return ( 
        <div className='dashboard-container'>
           
        <button>
            <Link className='dashboard-link' to='/form'> Se créer une liste </Link>
        </button>
        </div>
        
            
     );
}
 
export default Dashboard;