import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Nav from "./Nav";

function App() {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    // récupérer la valeur du localStorage
    const storedPath = localStorage.getItem(currentPath);
    if (storedPath) {
      setCurrentPath(storedPath);
    }

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
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
