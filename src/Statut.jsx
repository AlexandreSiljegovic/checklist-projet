import { useState, useEffect } from "react";
import { fetchDataFromApi, updateDataFromApi, statutDataFromApi } from "./Axios";
import ModifyListForm from "./ModifyListForm";
import { format } from 'date-fns';
import StatutEditing from "./StatutEditing";

const Statut = () => {
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


    const statutLabel = (statut) => { if  (statut === 0) {
        return "In progress";
    } else if (statut === 1) {
        return "In progress";
    } else if (statut === 2) {
        return "Done";
    } else {
        return "";
    };
    };

    const statutTaskLabel = (statut) => {
        if (statut === 0) {
            return "Not done";
        } else if (statut === 1) {
            return "Done";
        } 
    };




    return (
        <div className={`viewLists-container ${isModifying ? 'modifying' : ''}`}>
            {lists.map((response, index) => (
                <div className={'viewLists-form'} key={index}>
                    <h6>{format(new Date(response.created_at), "MM/dd/yyyy")}</h6>
                    <h1>ID {response.id}</h1>
                    <h3>List {index + 1}</h3>
                    <p><span className="underline">Title</span> : {response.title}</p>
                  
                    <p><span className="underline">Statut</span> : {statutLabel(response.statut)}</p>
                    <h3>Tasks</h3>
                    {Array.isArray(response.todo) && response.todo.length > 0 ? (
                        <ul className="ul-viewLists">
                            {response.todo.map((task, taskIndex) => (
                                <li key={taskIndex}>
                                  <p><span className="underline">Task</span> : {task.titleTask}</p>
                                    <p><span className="underline">Statut</span> : {statutTaskLabel(task.statut)}</p>
                                    <hr></hr>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks available.</p>
                    )}




                    <button className="modify-button" onClick={() => handleModifyClick(response)}>
                        Modify
                    </button>
                    {selectedList && selectedList.id === response.id && (
                        <div>
                            <StatutEditing list={selectedList} onModify={handleModifyList} />
                        </div>
                    )}
                </div>
            ))}

        </div>
    );
};

export default Statut;
