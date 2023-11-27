



import { postDataToApi } from './Axios.jsx';
import { useState } from 'react';

const Form = () => {
    const [titleTask, setTitleTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [additionalInputs, setAdditionalInputs] = useState([]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleAddInput = () => {
        setAdditionalInputs([...additionalInputs, { title: '', description: '' }]);
    };

    const handleAdditionalInputChange = (index, field, value) => {
        const updatedInputs = [...additionalInputs];
        updatedInputs[index][field] = value;
        setAdditionalInputs(updatedInputs);
    };

    const newTodo = () => ({
        title: titleTask,
        description: descriptionTask,
        todo: [
            {
                title,
                description,
            },
            ...additionalInputs,
        ],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTodos([...todos, newTodo()]);

        console.log('Data to be sent:', newTodo());

        // Appelez la fonction postDataToApi avec les données
        await postDataToApi(newTodo());

        // Réinitialisez les états des champs
        setTitleTask('');
        setDescriptionTask('');
        setTitle('');
        setDescription('');
        setAdditionalInputs([]);
    };

    // if (window.location.pathname === '/form') {
    //     let form = document.querySelector('.form-container');
    //     form.classList.add('form-container--hidden');
    // }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="inputs-container">
                    <div className="input-row">
                        <input className='inputPrimary'
                            type="text"
                            value={titleTask}
                            onChange={handleChange(setTitleTask)}
                            placeholder="Ajouter un titre à la liste"
                        />
                        <input className='inputSecondary'
                            type="text"
                            value={descriptionTask}
                            onChange={handleChange(setDescriptionTask)}
                            placeholder="Ajouter une description à la liste"
                        />
                    </div>
                    <div className="input-row">
                        <input className='inputPrimary'
                            type="text"
                            value={title}
                            onChange={handleChange(setTitle)}
                            placeholder="Ajouter un titre à la tâche"
                        />
                        <input className='inputSecondary'
                            type="text"
                            value={description}
                            onChange={handleChange(setDescription)}
                            placeholder="Ajouter une description à la tâche"
                        />
                    </div>
    
                    {additionalInputs.map((input, index) => (
                        <div className="input-row" key={index}>
                            <input className='inputPrimary'
                                type="text"
                                value={input.title}
                                onChange={(e) => handleAdditionalInputChange(index, 'title', e.target.value)}
                                placeholder="Titre de la tâche"
                            />
                            <input className='inputSecondary'
                                type="text"
                                value={input.description}
                                onChange={(e) => handleAdditionalInputChange(index, 'description', e.target.value)}
                                placeholder="Description de la tâche"
                            />
                        </div>
                    ))}
                </div>
                <div className="button-row">
                    <button type="button" onClick={handleAddInput}>Ajouter une tâche</button>
                    <button type="submit">Confirmer la liste</button>
                </div>
            </form>
        </div>
    );
                    };    

export default Form;
