import { useState, useEffect } from "react";
import {
  fetchDataFromApi, deleteDataFromApi, updateDataFromApi,
  statutDataFromApi, checklistViewFromApi } from "./Axios";

import { format } from 'date-fns';
import ModifyListForm from "./ModifyListForm";



const ViewList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [isModifying, setIsModifying] = useState(false)
  
  const handleModifyList = async (modifiedData) => {
    if (selectedList) {
      try {
        const allTasksDone = modifiedData.todo.every((task) => task.statut === 1);

        const listStatut = allTasksDone ? 2 : 1;

        const modifiedDataWithStatut = {
          ...modifiedData,
          statut: listStatut,
          todo: modifiedData.todo.map((task) => ({
            ...task,
            statut: task.statut || selectedList.statut,
            description: task.description || selectedList.description,
            title: task.title || selectedList.title,
          })),
        };

        console.log("Update Payload:", modifiedDataWithStatut);

        const updateResponse = await updateDataFromApi(
          selectedList.id,
          modifiedDataWithStatut
        );
        console.log("Update Response:", updateResponse);

        await statutDataFromApi(selectedList.id, modifiedDataWithStatut.statut);

        const updatedLists = lists.map((list) =>
          list.id === selectedList.id ? { ...list, ...modifiedData } : list
        );

        setLists(updatedLists);
        setSelectedList(null); // Reset
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleModifyClick = (list) => {
    setSelectedList((prevSelectedList) => (prevSelectedList ? null : list));
    setIsModifying(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response } = await fetchDataFromApi();

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

  
  const statutLabel = (statut) => {
    let p = document.getElementById("statut");
    let statutClass = "";
    if (statut === 0) {
      statutClass = "statut-vierge";
      return "Not done";
    } else if (statut === 1) {
      statutClass = "statut-encours";
      return "Done";
    }  else {
      return "";
    };
  };

  



  const handleListDetailClick = async (listId) => {
    try {
      await checklistViewFromApi(listId);
      const { response } = await checklistViewFromApi(listId);

      if (response) {
        setSelectedList(response);
        setIsModifying(true);
      } else {
        console.warn("List not found.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='viewLists-container'>
      {lists.map((response, index) => (
        <div className={'viewLists-form'} key={index}
         >
          <h6>{format(new Date(response.created_at), "MM/dd/yyyy")}</h6>
          <h1>ID {response.id}</h1>
          <h3><span className="underline-h3">List</span> {index + 1}</h3>
          {/* <h4> <span className="underline-h3">List statut</span> : {statutLabel(response.statut)}</h4> */}
          <p> <span className="underline">Title</span>  : {response.title}</p>
          <p> <span className="underline">Description</span> :  {response.description}</p>
     
          
          <h3><span className="underline-h3">Total task</span> :  {response.todo.length}</h3>
          <h4> <span className="underline-h3">Tasks Done</span> : {response.todo.filter(task => task.statut === 1).length}</h4>

          
          {Array.isArray(response.todo) && response.todo.length > 0 ? (
            <ul className="ul-viewLists">

              {response.todo.map((task, taskIndex) => (
                <li key={taskIndex}>
                  
                  <hr></hr>
                  <p><span className="underline">Title</span> : {task.titleTask}</p>
                  <p><span className="underline">Description</span> :  {task.descriptionTask}</p>
                  <p><span className="underline">Statut</span> : {statutLabel(task.statut)} </p>
                  <hr></hr>
                </li>
               
              ))}
            </ul>
          ) : (
            <p>No tasks available.</p>
          )}

           <div id="button">
          <button
          className="modify-button"
          onClick={() => {handleModifyClick(response); setIsModifying(true);}}
          >
            Modify
          </button>
          {selectedList && selectedList.id === response.id && (
            <ModifyListForm
              list={selectedList}
              onModify={handleModifyList}
            />
          )}
         
          
            <button
              className="delete-button"
              onClick={() => {
                const shouldDelete = window.confirm("Are you sure you want to delete this item?");

                if (shouldDelete) {
                  deleteDataFromApi(response.id);
                  setLists((prevLists) => prevLists.filter((list) => list.id !== response.id));
                }
              }}
            >
              Delete
            </button>
          </div>
          
        </div>
      ))}
    
    </div>
  );
};



export default ViewList;
