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
        onModify(modifiedData);
        setIsEditing(false);
    };

    const handleStatutClick = () => {
        if (isEditing) {
            const newStatut = (modifiedData.statut + 1) % 3;
            setModifiedData((prevData) => ({
                ...prevData,
                statut: newStatut,
            }));
        }
    };

    const handleTaskStatutChange = (taskIndex) => {
        if (isEditing) {
            const newStatut = (modifiedData.todo[taskIndex].statut + 1) % 3;
            setModifiedData((prevData) => {
                const updatedTodo = prevData.todo.map((task, index) =>
                    index === taskIndex ? { ...task, statut: newStatut } : task
                );
                return {
                    ...prevData,
                    todo: updatedTodo,
                };
            });
        }
    };

    return (
        <div>
            <span
                onClick={handleStatutClick}
                style={{ cursor: isEditing ? "pointer" : "auto" }}
            >
                {isEditing
                    ? `Statut: ${statutLabel(modifiedData.statut)} (Click to update the state)`
                    : `Statut: ${statutLabel(modifiedData.statut)}`}
            </span>

            <div>
                <strong>Tasks:</strong>
                {modifiedData.todo.map((task, index) => (
                    <div key={index}>
                        <strong>{index + 1}</strong>{" "}
                        <span
                            onClick={() => handleTaskStatutChange(index)}
                            style={{ cursor: isEditing ? "pointer" : "auto" }}
                        >
                            {isEditing
                                ? `Statut: ${statutLabel(task.statut)} (Click to update the state)`
                                : `Statut: ${statutLabel(task.statut)}`}
                        </span>
                        {isEditing ? null : (
                            <span>
                                <br /> Titre : {task.title} <br /> Description : {task.description}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {isEditing && <button className="modify-button" onClick={handleModifyClick}>Save</button>}
            <button className="modify-button" onClick={handleToggleEdit}>
                {isEditing ? "Cancel" : "Edit"}
            </button>
        </div>
    );
};

const statutLabel = (statut) => {
    if (statut === 0) {
        return "Virgin";
    } else if (statut === 1) {
        return "In progress";
    } else if (statut === 2) {
        return "Done";
    } else {
        return "";
    }
};

export default StatutEditing;
