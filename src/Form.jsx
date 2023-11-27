
// import { postDataToApi } from './Axios.jsx';
// import { useState } from 'react';

// const Form = () => {
//     const [titleTask, setTitleTask] = useState('');
//     const [descriptionTask, setDescriptionTask] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [todo, setTodos] = useState([]);

//     const handleChange = (setter) => (e) => {
//         setter(e.target.value);
//     };

//     const newTodo = () => ({
//     title: titleTask,
//     description: descriptionTask,
//     todo: [
//         {
//             title,
//             description,
//         },
//     ],
// });


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setTodos([...todo, newTodo()]);

//         console.log('Data to be sent:', newTodo());

//         // Appelez la fonction postDataToApi avec les données
//         await postDataToApi(newTodo());

//         // Réinitialisez les états des champs
        
//         setTitleTask('');
//         setDescriptionTask('');
//         setTitle('');
//         setDescription('');
//     };

//     return (
//         <div className="flex-col">
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={titleTask}
//                 onChange={handleChange(setTitleTask)}
//                 placeholder="Ajouter un titre à la liste"
//             />
//             <input
//                 type="text"
//                 value={descriptionTask}
//                 onChange={handleChange(setDescriptionTask)}
//                 placeholder="Ajouter une description à la liste"
//             />
//             <input
//                 type="text"
//                 value={title}
//                 onChange={handleChange(setTitle)}
//                 placeholder="Ajouter un titre à la tâche"
//             />
//             <input
//                 type="text"
//                 value={description}
//                 onChange={handleChange(setDescription)}
//                 placeholder="Ajouter une description à la tâche"
//             />
//             <button type="submit">Ajouter</button>
//         </form>
//         </div>
//     );
// };

// export default Form;



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

    return (
        <div className="flex-col">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={titleTask}
                    onChange={handleChange(setTitleTask)}
                    placeholder="Ajouter un titre à la liste"
                />
                <input
                    type="text"
                    value={descriptionTask}
                    onChange={handleChange(setDescriptionTask)}
                    placeholder="Ajouter une description à la liste"
                />
                <input
                    type="text"
                    value={title}
                    onChange={handleChange(setTitle)}
                    placeholder="Ajouter un titre à la tâche"
                />
                <input
                    type="text"
                    value={description}
                    onChange={handleChange(setDescription)}
                    placeholder="Ajouter une description à la tâche"
                />
                {additionalInputs.map((input, index) => (
                    <div className='inputAdd' key={index}>
                        <input
                            type="text"
                            value={input.title}
                            onChange={(e) => handleAdditionalInputChange(index, 'title', e.target.value)}
                            placeholder="Titre de la tâche"
                        />
                        <input
                            type="text"
                            value={input.description}
                            onChange={(e) => handleAdditionalInputChange(index, 'description', e.target.value)}
                            placeholder="Description description de la tâche"
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddInput}>Ajouter une tâche</button>
                <button type="submit">Confirmer la liste</button>
            </form>
        </div>
    );
};

export default Form;
