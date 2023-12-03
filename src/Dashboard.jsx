import {Link} from 'react-router-dom';

import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi, updateDataFromApi, statutDataFromApi } from "./Axios";
import ModifyListForm from "./ModifyListForm";
import { format } from 'date-fns';
import ViewList from './ViewLists';

const Dashboard = () => {
return (
 
        <div className='dashboard-container'>
           <ViewList /> 
        <button>
            <Link className='dashboard-link' to='/form'> Se créer une liste </Link>
        </button>
        </div>
        
            
     );
}
 
export default Dashboard;