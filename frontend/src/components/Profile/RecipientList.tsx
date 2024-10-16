import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipientApi } from '../../services/api';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './RecipientList.css';
import ContactCards from './ContactCards';
import { Recipient } from '../Interfaces/recipient';



const RecipientList: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //if the recipient is empty navigate to the add recipient page
  useEffect(() => {
    if (!isLoading && recipients.length === 0) {
      navigate('/add-recipient');
    }
  }, [isLoading, recipients, navigate]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await recipientApi.get('/list');
        setRecipients(response.data);        
      } catch (error) {
        console.error('Error fetching recipients:', error);
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  const handleCardClick = (recipientId: string) => {
    navigate(`/catalog/${recipientId}`);
  };

  const handleAddRecipient = () => {
    navigate('/add-recipient');
  };

  const handleDeleteRecipient = (id: string) => {
    setRecipients(prevRecipients => prevRecipients.filter(recipient => recipient._id !== id));
  };

  return (
    <div className="bg-gray-100">
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold mb-2">Who is it for?</h2>
        <p className="text-sm text-gray-600">Click '+' to make a new recipient.</p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10 md:p-20 lg:p-20">
        {isLoading && <h1>Fetching data...</h1>}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && (
          <ContactCards contactList={recipients} setSelectedContact={handleCardClick} onDeleteRecipient={handleDeleteRecipient} />
        )}
      </section>
      <button className="add-recipient-button" onClick={handleAddRecipient}>
        +
      </button>
    </div>
  );
};

export default RecipientList;
