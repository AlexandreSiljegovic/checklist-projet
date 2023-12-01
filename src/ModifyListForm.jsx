// ModifyListForm.js
import React, { useState, useEffect } from "react";
import { updateDataFromApi } from "./Axios";

const ModifyListForm = ({ list, onModify }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [modifiedData, setModifiedData] = useState({
    id: null,
    title: "",
    description: "",
    todo: [],
  });
  
  useEffect(() => {
    // Update modifiedData whenever the list prop changes
    if (list) {
      setModifiedData({
        id: list.id,
        title: list.title,
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
    // Toggle back to read-only mode after modification
    setIsEditing(false);
  };

  const handleInputChange = (e, taskIndex, fieldName) => {
    const { value } = e.target;

    setModifiedData((prevData) => ({
      ...prevData,
      todo: prevData.todo.map((task, index) =>
        index === taskIndex
          ? { ...task, [fieldName]: value }
          : task
      ),
    }));
  };

  return (
    <div>
      <div>
        <strong>Title:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={modifiedData.title}
            onChange={(e) => handleInputChange(e, -1, "title")}
          />
        ) : (
          <span>{modifiedData.title}</span>
        )}
      </div>

      <div>
        <strong>Description:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={modifiedData.description}
            onChange={(e) => handleInputChange(e, -1, "description")}
          />
        ) : (
          <span>{modifiedData.description}</span>
        )}
      </div>

      <div>
        <strong>Tasks:</strong>
        {modifiedData.todo.map((task, index) => (
          <div key={index}>
            <strong>Task {index + 1}:</strong>{" "}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name={`title_${index}`}
                  value={task.title}
                  onChange={(e) => handleInputChange(e, index, "title")}
                />
                <input
                  type="text"
                  name={`description_${index}`}
                  value={task.description}
                  onChange={(e) => handleInputChange(e, index, "description")}
                />
                <input 
                  type="text"
                  name={`statut_${index}`}
                  value={task.statut}
                  onChange={(e) => handleInputChange(e, index, "statut")}
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

export default ModifyListForm;
