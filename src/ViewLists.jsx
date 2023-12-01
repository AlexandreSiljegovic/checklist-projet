import { useState, useEffect } from "react";
import { fetchDataFromApi, deleteDataFromApi } from "./Axios";
import Modal from "./Modal";
import ModifyListForm from "./ModifyListForm";



const ViewList = () => {
  const [lists, setLists] = useState([]);

  const [selectedList, setSelectedList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModifyList = (modifiedData) => {
    // Update the selected list with the modified data
    if (selectedList) {
      const updatedLists = lists.map((list) =>
        list.id === selectedList.id ? { ...list, ...modifiedData } : list
      );

      // Update the parent component state with the modified list
      setLists(updatedLists);

      // Clear the selectedList state
      setSelectedList(null);

      // Close the modal
      setIsModalOpen(false);
    }
  };

  const handleModifyClick = (list) => {
    setSelectedList(list);
    // Open the modal
    setIsModalOpen(true);
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
      <h2>Lists</h2>
      {lists.map((response, index) => (
        <div key={index}>
          <h1>ID {response.id} </h1>
          <h3>List {index + 1}</h3>
          <p>List title: {response.title}</p>
          <p>List description: {response.description}</p>
          <h4>Tasks:</h4>
          {Array.isArray(response.todo) ? (
            response.todo.length > 0 ? (
              <ul>
                {response.todo.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    <p>Title: {task.title}</p>
                    <p>Description: {task.description}</p>
                    <p>Statut: {task.statut}</p>
                  </li>
                ))}
                <button
                  onClick={() => {
                    deleteDataFromApi(response.id);
                    setLists((prevLists) =>
                      prevLists.filter((list) => list.id !== response.id)
                    );
                  }}
                >

                  Delete
                </button>
                <button onClick={() => handleModifyClick(response)}>
                  Modify
                </button>
                {selectedList && (
        <Modal openModal={isModalOpen} setOpenModal={setIsModalOpen}>
          <ModifyListForm list={selectedList} onModify={handleModifyList} />
        </Modal>
        )}
               
              </ul>
            ) : (
              <p>No tasks available for this list. (Empty todo array)</p>
            )
          ) : (
            <p>No tasks available for this list. (todo is not an array)</p>
          )}
        </div>
      ))}

      
      
    </div>
  );
};

export default ViewList;
