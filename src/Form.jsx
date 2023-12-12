import { postDataToApi } from "./Axios.jsx";
import { useState } from "react";

const Form = () => {
  const [titleTask, setTitleTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [additionalInputs, setAdditionalInputs] = useState([]);
  // const [statut, setStatut] = useState(0);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleAddInput = () => {
    setAdditionalInputs([...additionalInputs, { titleTask: "", descriptionTask: "" }]);
  };

  const handleAdditionalInputChange = (index, field, value) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index][field] = value;
    setAdditionalInputs(updatedInputs);
  };

  const newTodo = () => ({
    title: title,
    description: description,

    todo: [
      {
        titleTask,
        descriptionTask,
      },
      ...additionalInputs,
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // se valide si au moins une todo est présente et si les champs sont remplis
    if (titleTask || descriptionTask || additionalInputs.length < 0) {
      setTodos([...todos, newTodo()]);

      console.log("Data to be sent:", newTodo());

      // Appeler la fonction postDataToApi avec les données
      await postDataToApi(newTodo());

      // Réinitialisez les états des champs
      setTitleTask("");
      setDescriptionTask("");
      setTitle("");
      setDescription("");
      setAdditionalInputs([]);
      //   setStatut('');
    } else {
      alert(
        "Please add at least one todo and its description before confirming the list."
      );
    }
  };

  return (
    <div id="form">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <div className="input-row">
              <input
                className="inputPrimary"
                type="text"
                value={title}
                onChange={handleChange(setTitle)}
                placeholder="Ajouter un titre à la liste"
              />
              <input
                className="inputSecondary"
                type="text"
                value={description}
                onChange={handleChange(setDescription)}
                placeholder="Ajouter une description à la liste"
              />
            </div>
            <div className="input-row">
              <input
                className="inputPrimary"
                type="text"
                value={titleTask}
                onChange={handleChange(setTitleTask)}
                placeholder="Titre à la tâche"
              />
              <input
                className="inputSecondary"
                type="text"
                value={descriptionTask}
                onChange={handleChange(setDescriptionTask)}
                placeholder="Description à la tâche"
              />
            </div>

            {additionalInputs.map((input, index) => (
              <div className="input-row" key={index}>
                <input
                  className="inputPrimary"
                  type="text"
                  value={input.titleTask}
                  onChange={(e) =>
                    handleAdditionalInputChange(index, "titleTask", e.target.value)
                  }
                  placeholder="Titre de la tâche"
                />
                <input
                  className="inputSecondary"
                  type="text"
                  value={input.descriptionTask}
                  onChange={(e) =>
                    handleAdditionalInputChange(
                      index,
                      "descriptionTask",
                      e.target.value
                    )
                  }
                  placeholder="Description de la tâche"
                />
              </div>
            ))}
          </div>
          <div className="button-row">
            <button type="button" onClick={handleAddInput}>
              Ajouter une tâche
            </button>
            <button type="submit">Confirmer la liste</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
