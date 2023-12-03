import {Link} from 'react-router-dom';

import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi, updateDataFromApi, statutDataFromApi } from "./Axios";
import ModifyListForm from "./ModifyListForm";
import { format } from 'date-fns';
import ViewList from './ViewLists';
import Fonctionnement from './Fonctionnement';
const Dashboard = () => {
return (
 
        <div className='dashboard-container'>
           <button>
            <Link className='dashboard-link' to='/form'> Se créer une liste </Link>
        </button>
        <button>
         <Link className='dashboard-link' to='/fonctionnement'> Fonctionnement </Link>
         </button>
       
           <ViewList /> 
      
   </div>
            
     );
}
 
export default Dashboard;