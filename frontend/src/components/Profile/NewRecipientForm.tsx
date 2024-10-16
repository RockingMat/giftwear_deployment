import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { recipientApi, uploadHeadshot } from '../../services/api';

const NewRecipientForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact; // Get pre-existing contact data if available

  const [name, setName] = useState(contact?.name || '');
  const [gender, setGender] = useState(contact?.gender || '');
  const [age, setAge] = useState(contact?.age?.toString() || '');
  const [preferredSizes, setPreferredSizes] = useState<string[]>(contact?.preferredSizes || []);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setGender(contact.gender);
      setAge(contact.age?.toString() || '');
      setPreferredSizes(contact.preferredSizes || []);
    }
  }, [contact]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferredSizes(selectedOptions);
  };

  const handleHeadshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setHeadshot(file);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('preferredSizes', JSON.stringify(preferredSizes));
      
      // {
      //   formData.append('headshot', headshot);
      // }
  
      if (contact) {
        // Update existing recipient
        await recipientApi.put(`/update/${contact._id}`, formData);
        if (headshot) uploadHeadshot(headshot, contact!._id);
        navigate('/recipient-list');
      } else {
        // Create new recipient
        const response = await recipientApi.post('/create', formData);
        if (headshot) uploadHeadshot(headshot, response.data._id);

        if (response && response.data && response.data._id) {
          navigate(`/celebrity/${response.data._id}`);
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (err) {
      setError('Failed to save recipient. Please try again.');
      console.error('Error saving recipient:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {contact ? 'Edit Recipient' : 'Add New Recipient'}
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Recipient Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter recipient name"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter recipient's age"
          />
        </div>
        <div>
          <label htmlFor="preferredSizes" className="block text-sm font-medium text-gray-700">
            Preferred Upperwear Sizes (sizes vary, recommended to choose a size up or down)
          </label>
          <select
            id="preferredSizes"
            multiple
            value={preferredSizes}
            onChange={handleSizeChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div>
          <label htmlFor="headshot" className="block text-sm font-medium text-gray-700">
            Upload Headshot
          </label>
          <input
            type="file"
            id="headshot"
            onChange={handleHeadshotChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {contact ? 'Update Recipient' : 'Create Recipient'}
        </button>
      </form>
    </div>
  );
};

export default NewRecipientForm;
