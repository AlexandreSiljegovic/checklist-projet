import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi, updateDataFromApi, statutDataFromApi } from "./Axios";

import ModifyListForm from "./ModifyListForm";



const ViewList = () => {
  const [lists, setLists] = useState([]);

  const [selectedList, setSelectedList] = useState(null);
 

  const handleModifyList = async (modifiedData) => {
    // Update the selected list with the modified data
    if (selectedList) {
      const updatedLists = lists.map((list) =>
        list.id === selectedList.id ? { ...list, ...modifiedData } : list
      );
  
      if ('id' in modifiedData && 'todo' in modifiedData) {
        try {
          // Call the updateDataToApi function to persist the modifications
          await updateDataFromApi(selectedList.id, modifiedData);
          await statutDataFromApi(selectedList.id, selectedList.statut);
  
          // Update the parent component state with the modified list
          setLists(updatedLists);
  
          // Clear the selectedList state
          setSelectedList((prevSelectedList) => ({
            ...prevSelectedList,
            ...modifiedData,
          }));
  
        } catch (error) {
          console.error("Error updating data:", error);
         
        }
      }
    }
  };

  const handleModifyClick = (list) => {
    setSelectedList(list);

    // Open the modal
    
  };






  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromise = fetchDataFromApi();
        const { response } = await dataPromise; // Extract the 'response' property

        console.log("API Response:", response);

        if (Array.isArray(response) && response.length > 0) {
          setLists(response);
        } else {
          console.warn("Data is not an array or is empty.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!lists || lists.length === 0) {
    return <p>No lists available.</p>;
  }

 

  return (
    
    <div className="viewLists-container">
      
      {lists.map((response, index) => (
        <div  className={'viewLists-form statut-${task.statut}'} key={index} >
          <h1>ID {response.id} </h1>
          <h3>List {index + 1}</h3>
          <p>List title: {response.title}</p>
          <p>List description: {response.description}</p>
          <h4>Tasks:</h4>
          {Array.isArray(response.todo) ? (
            response.todo.length > 0 ? (
              <ul className="ul-viewLists">
                {response.todo.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    <p>Title: {task.title}</p>
                    <p>Description: {task.description}</p>
                    <p>statut: {task.statut}</p>
                  </li>
                ))}
                
            
              </ul>
            ) 
            
            : (
              <p>No tasks available for this list. (Empty todo array)</p>
            )
          ) : (
            <p>No tasks available for this list. (todo is not an array)</p>
          )}
          <button className="delete-button"
                  onClick={() => {
                    deleteDataFromApi(response.id);
                    setLists((prevLists) =>
                      prevLists.filter((list) => list.id !== response.id)
                    );
                  }}
                >

                  Delete
                </button>
                <button  className ="modify-button"
                onClick={() => handleModifyClick(response)}>
                  Modify
                </button>
               
           {selectedList && selectedList.id === response.id && (
            <div>
              <ModifyListForm list={selectedList} onModify={handleModifyList}
               />
            </div>
          )}
        </div>
        
      ))}


      
    </div>
  );
};

export default ViewList;
