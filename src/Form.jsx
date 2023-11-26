import {postDataToApi} from './Axios.jsx';
import React, { useState } from 'react';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = { title, description };
        setTodos([...todos, newTodo]);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ajouter un titre à la tâche"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ajouter une description à la tâche"
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default Form;
