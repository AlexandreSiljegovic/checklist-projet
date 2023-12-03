import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import ViewLists from './ViewLists.jsx';
import ModifyListForm from "./ModifyListForm.jsx";
import Fonctionnement from './Fonctionnement.jsx';

function App() {
  const [currentPath, setCurrentPath] = useState("/");
 
  

  useEffect(() => {
    // récupérer la valeur du localStorage
    const storedPath = localStorage.getItem(currentPath);
    if (storedPath) {
      setCurrentPath(storedPath);
    }

    // const lists = [
    //   { titleTask: 'List 1', descriptionTask: 'Description 1', todo: [{ title: 'Task 1', description: 'Task 1 description' }] },
    //   // More list items...
    // ];
  
    //  mettre à jour le chemin d'accès lorsqu'il change
    const updatePath = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
      // Stocker la nouvelle valeur dans le localStorage
      localStorage.setItem("currentPath", newPath);
    };

    window.addEventListener("popstate", updatePath);

    // Retirer le addevent lorsque l'on sort du composant
    return () => {
      window.removeEventListener("popstate", updatePath);
    };
  }, []); // Assurez-vous de ne lancer cet effet qu'une seule fois à la montée du composant
   
  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fonctionnement" element={<Fonctionnement />} />
        
     
          <Route path="/form" element={<Form />} />
          <Route path='/viewlists' element ={ <ViewLists />} />
          {/* <Route path='/modifylist' element ={ selectedList && <ModifyListForm lists={lists} onSelectList={handleSelectList} />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
