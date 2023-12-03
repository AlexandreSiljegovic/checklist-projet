import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi, updateDataFromApi, statutDataFromApi } from "./Axios";
import ModifyListForm from "./ModifyListForm";
import { format } from 'date-fns';

const ViewList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [isModifying, setIsModifying] = useState(false);





  const handleModifyList = async (modifiedData) => {
    if (selectedList) {
      try {
        const modifiedDataWithStatut = {
          ...modifiedData,
          statut: modifiedData.statut,
          todo: modifiedData.todo.map((task) => ({
            ...task,
            statut: task.statut || selectedList.statut,
          })),
        };

        console.log("Update Payload:", modifiedDataWithStatut);

        const updateResponse = await updateDataFromApi(selectedList.id, modifiedDataWithStatut);
        console.log("Update Response:", updateResponse);

        await statutDataFromApi(selectedList.id, modifiedDataWithStatut.statut);

        const updatedLists = lists.map((list) =>
          list.id === selectedList.id ? { ...list, ...modifiedData } : list
        );

        setLists(updatedLists);
        setSelectedList(null); // Reset selectedList after successful modification
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

  return (
    <div className={`viewLists-container ${isModifying ? 'modifying' : ''}`}>
      {lists.map((response, index) => (
        <div className={'viewLists-form'} key={index}>
          <h6>{format(new Date(response.created_at), "MM/dd/yyyy")}</h6>
          <h1>ID {response.id}</h1>
          <h3>List {index + 1}</h3>
          <p>List title: {response.title}</p>
          <p>List description: {response.description}</p>
          <p>statut: {response.statut}</p>
          <h3>Tasks</h3>
          {Array.isArray(response.todo) && response.todo.length > 0 ? (
            <ul className="ul-viewLists">
              {response.todo.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <hr></hr>
                  <p>Title: {task.title}</p>
                  <p>Description: {task.description}</p>
                  <p>statut: {task.statut}</p>
                  <hr></hr>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available.</p>
          )}

           
          
          <button
            className="delete-button"
            onClick={() => {
              deleteDataFromApi(response.id);
              setLists((prevLists) => prevLists.filter((list) => list.id !== response.id));
            }}
          >
            Delete
          </button>
          <button className="modify-button" onClick={() => handleModifyClick(response)}>
            Modify
          </button>
          {selectedList && selectedList.id === response.id && (
            <div>
              <ModifyListForm list={selectedList} onModify={handleModifyList} />
            </div>
          )}
        </div>
      ))}
      
    </div>
  );
};

export default ViewList;
