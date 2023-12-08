import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi, } from "./Axios";
// import ModifyListForm from "./ModifyListForm";
import { format } from 'date-fns';


const ViewList = () => {
  const [lists, setLists] = useState([]);

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
    <div className='viewLists-container'>
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
        
          
        </div>
      ))}
    
    </div>
  );
};

export default ViewList;
