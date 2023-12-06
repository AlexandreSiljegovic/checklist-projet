// ModifyListForm.js
import React, { useState, useEffect } from "react";


const StatutEditing = ({ list, onModify }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [modifiedData, setModifiedData] = useState({
        id: null,
        title: "",
        description: "",
        statut: 0,
        todo: [],
    });

    useEffect(() => {
        // Update modifiedData 
        if (list) {
            setModifiedData({
                id: list.id,
                title: list.title,
                statut: list.statut,
                description: list.description,
                todo: list.todo.map((task) => ({ ...task })),
            });
        }
    }, [list]);

    const handleToggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleModifyClick = () => {
        // Pass the modified data to the parent component
        onModify(modifiedData);
        //  read-only 
        setIsEditing(false);
    };

    const handleInputChange = (e, taskIndex, fieldName) => {
        const { value } = e.target;

        setModifiedData((prevData) => {
            if (fieldName === "title" || fieldName === "description" || fieldName === "statut") {
                // Handle changes for title, description, and statut in the main form
                return {
                    ...prevData,
                    [fieldName]: fieldName === "statut" ? parseInt(value, 10) : value,
                };
            }

            // Handle changes for tasks
            const updatedTodo = prevData.todo.map((task, index) =>
                index === taskIndex ? { ...task, [fieldName]: value } : task
            );

            return {
                ...prevData,
                todo: updatedTodo,
            };
        });
    };


    const handleListStatutChange = (e) => {
        const { value } = e.target;
        setModifiedData((prevData) => ({
            ...prevData,
            statut: parseInt(value, 10),
        }));
    };
    const handleTaskStatutChange = (e, taskIndex) => {
        const { value } = e.target;
        setModifiedData((prevData) => {
            const updatedTodo = prevData.todo.map((task, index) =>
                index === taskIndex ? { ...task, statut: parseInt(value, 10) } : task
            );


            return {
                ...prevData,
                todo: updatedTodo,
            };
        });
    };


    const handleTaskTitleChange = (e, taskIndex) => {
        const { value } = e.target;
        setModifiedData((prevData) => {
            const updatedTodo = prevData.todo.map((task, index) =>
                index === taskIndex ? { ...task, title: value } : task
            );


            return {
                ...prevData,
                todo: updatedTodo,
            };
        });
    };

    const handleTaskDescriptionChange = (e, taskIndex) => {
        const { value } = e.target;
        setModifiedData((prevData) => {
            const updatedTodo = prevData.todo.map((task, index) =>
                index === taskIndex ? { ...task, description: value } : task
            );


            return {
                ...prevData,
                todo: updatedTodo,
            };
        });
    };






    return (
        <div>
               
            
            {isEditing ? (
                <div className="modify-input-primary">
                    <strong>statut:</strong><br></br>{" "}
                    <input
                        type="number"
                        name="statut"
                        value={modifiedData.statut}
                        min={0}
                        max={2}
                        onChange={(e) => handleListStatutChange(e, -1, "statut")}
                    />
                </div>
            ) : null}

           

            <div>
                <strong>Tasks:</strong>
                {modifiedData.todo.map((task, index) => (
                    <div className='modify-input-secondary' key={index}>
                        <strong>{index + 1}</strong>{" "}<br></br>
                        {isEditing ? (
                            <>
                              
                                <strong>statut:</strong>{" "}<br></br>
                                <input
                                    type="number"
                                    name={`statut_${index}`}
                                    value={task.statut}
                                    min={0}
                                    max={2}
                                    onChange={(e) => handleTaskStatutChange(e, index, "statut")}
                                />

                            </>

                        ) : (
                            <span>
                                <br></br> Titre : {task.title} <br></br> Description : {task.description}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {isEditing ? (
                <button onClick={handleModifyClick}>Save</button>
            ) : (
                <button onClick={handleToggleEdit}>Edit</button>
            )}
        </div>
    );
};

export default StatutEditing;