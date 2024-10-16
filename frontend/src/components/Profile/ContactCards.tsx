import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate to the form
import { recipientApi } from '../../services/api';
import { Recipient } from '../Interfaces/recipient';

interface ContactCardProps {
  contactList: Recipient[];
  setSelectedContact: (recipientId: string) => void;
  onDeleteRecipient: (id: string) => void;
}

const ContactCards: React.FC<ContactCardProps> = ({ contactList, setSelectedContact, onDeleteRecipient }) => {
  const navigate = useNavigate();

  const handleDelete = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      await recipientApi.delete(`/${id}`);
      onDeleteRecipient(id);
    } catch (error) {
      console.error('Error deleting recipient:', error);
    }
  };

  const handleEdit = (event: React.MouseEvent, contact: Recipient) => {
    event.stopPropagation();
    navigate(`/edit-recipient/${contact._id}`, { state: { contact } }); // Pass contact data to the form
  };

  return (
    <>
      {contactList?.map((contact) => (
        <button
          className="bg-white text-black h-80 rounded-lg shadow-md relative"
          key={contact._id}
          onClick={() => setSelectedContact(contact._id)}
        >
          <img
            alt="user"
            className="w-32 h-32 rounded-full mx-auto mt-7"
            src={`http://localhost:3000${contact.picture || '/uploads/empty.jpg'}`}
          />
          <figcaption className="text-center mt-5">
            <p className="text-gray-700 font-semibold text-xl mb-2">{contact.name}</p>
            <p className="text-gray-500">
              <span className="font-medium">Gender: </span>
              {contact.gender}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Age: </span>
              {contact.age}
            </p>
          </figcaption>
          <button
            onClick={(e) => handleDelete(e, contact._id)}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full"
          >
            <img src="http://localhost:3000/uploads/trash.png" alt="Delete" className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => handleEdit(e, contact)}
            className="absolute top-2 left-2 p-2 bg-blue-500 rounded-full"
          >
            <img src="http://localhost:3000/uploads/edit.png" alt="Edit" className="w-6 h-6" />
          </button>
        </button>
      ))}
    </>
  );
};

export default ContactCards;
