// ModifyListForm.js
import React, { useState, useEffect } from "react";


const ModifyListForm = ({ list, onModify }) => {
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
    // envoie les data au parent
    onModify(modifiedData);
    //  read-only 
    setIsEditing(false);
  };

  const handleInputChange = (e, taskIndex, fieldName) => {
    const { value } = e.target;

    setModifiedData((prevData) => {
      if (fieldName === "title" || fieldName === "description" || fieldName === "statut") {
        // Handle les changements pour les taches descriptions et statut
        return {
          ...prevData,
          [fieldName]: fieldName === "statut" ? parseInt(value, 10) : value,
        };
      }

      // handle pour les taches (les changements)
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
      <div className="modify-input-primary">
        <strong>Title:</strong><br></br>{" "}
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
      

      <div className="modify-input-primary">
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
          <div className='modify-input-secondary' key={index}>
            <strong>{index + 1}</strong>{" "}<br></br>
            {isEditing ? (
              <>
                <strong>Title:</strong>{" "}<br></br>
                <input
                  type="text"
                  name={`title_${index}`}
                  value={task.title}
                  onChange={(e) => handleTaskTitleChange(e, index, "title")}
                />
                <strong>Description:</strong>{" "}
                <input
                  type="text"
                  name={`description_${index}`}
                  value={task.description}
                  onChange={(e) => handleTaskDescriptionChange(e, index, "description")}
                /><br></br>
             
              
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
