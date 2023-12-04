import {Link} from 'react-router-dom';


import ViewList from './ViewLists';

const Dashboard = () => {
return (
 
        <div className='dashboard-container'>
           <button>
            <Link className='dashboard-link' to='/form'> Se créer une liste </Link>
        </button>
        <button>
        <Link to = '/viewmodify'> Modify a list</Link>
        </button>
        <button>
         <Link className='dashboard-link' to='/fonctionnement'> Fonctionnement </Link>
         </button>
       
           <ViewList /> 
      
   </div>
            
     );
}
 
export default Dashboard;