import { useState } from 'react';
import { updateDataFromApi } from './Axios';

const ModifyListForm = ({list, onModify}) => {
  const [formData, setFormData] = useState({
    title: list.title,
    description: list.description,
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming updateDataToApi takes the list id and formData
      await updateDataFromApi(list.id, formData);
      // Trigger the onModify callback to update the local state
      onModify(list.id, formData);
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
      </label>
      {/* Add other form fields as needed */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ModifyListForm;
