import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import ViewLists from './ViewLists.jsx';
import Fonctionnement from './Fonctionnement.jsx';
import ViewModify from './ViewModifyListForm.jsx';
import Statut from './Statut.jsx';

function App() {
  const [currentPath, setCurrentPath] = useState("/");
 
  

  useEffect(() => {
   
    const storedPath = localStorage.getItem(currentPath);
    if (storedPath) {
      setCurrentPath(storedPath);
    }

  
    
    const updatePath = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
      
      localStorage.setItem("currentPath", newPath);
    };

    window.addEventListener("popstate", updatePath);

    
    return () => {
      window.removeEventListener("popstate", updatePath);
    };
  }, []); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fonctionnement" element={<Fonctionnement />} />
        
     
          <Route path="/form" element={<Form />} />
          <Route path='/viewlists' element ={ <ViewLists />} />
          <Route path='/viewmodify' element ={ <ViewModify />} />
          <Route path='/statut' element ={ <Statut />} />
         
        </Route>
      </Routes>
    </>
  );
}

export default App;
