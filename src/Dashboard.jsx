import {Link} from 'react-router-dom';


import ViewList from './ViewLists';

const Dashboard = () => {
return (
 
        <div className='dashboard-container'>
        
        <button id='nouveau'>
         <Link className='dashboard-link' to='/form'> CREATE A NEW LIST </Link>
         </button>
           <ViewList /> 
       
      
   </div>
            
     );
}
 
export default Dashboard;