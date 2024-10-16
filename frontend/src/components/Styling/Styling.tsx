import React, { useEffect, useState } from 'react';
import { getLowerwearItems, getFootwearItems } from "../../services/catalogueService";
import { slide } from '../Interfaces/Item';
import ItemList from '../Catalog/ItemList';
import { recipientApi } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
interface StylingProps {
    upperwearItem: any;
}

const Styling: React.FC<StylingProps> = ({ upperwearItem }) => {
    const { recipientId } = useParams<{ recipientId: string }>();
    const navigate = useNavigate();
    const [lowerwearItems, setLowerwearItems] = useState<any[]>([]); 
    const [lowerwearActiveIndex, setLowerwearActiveIndex] = useState(0); 
    const [footwearItems, setFootwearItems] = useState<any[]>([]);
    const [footwearActiveIndex, setFootwearActiveIndex] = useState(0);
    const [headshot, setHeadshot] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [headshotFile, setHeadshotFile] = useState<File | null>(null); // Store the file

    // New state for the form
    const [message, setMessage] = useState('');
    const [occasion, setOccasion] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchRecipient = async () => {
          const response = await recipientApi.get(`/${recipientId}`);
          if (response.data.picture) {
            setHeadshot(`http://localhost:3000${response.data.picture}`);
          }
        };
      
        fetchRecipient();
      }, [recipientId]);

    useEffect(() => {
        const fetchLowerwearItems = async () => {
            try {
                const data = await getLowerwearItems();
                setLowerwearItems(data.length ? data : []);
            } catch (error) {
                console.error('Error fetching lowerwear items:', error);
            }
        };
    
        const fetchFootwearItems = async () => {
            try {
                const data = await getFootwearItems();
                setFootwearItems(data.length ? data : []);
            } catch (error) {
                console.error('Error fetching footwear items:', error);
            }
        };
    
        fetchLowerwearItems();
        fetchFootwearItems();
    }, []);

    const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeadshot(reader.result as string);
                //setHeadshotFile(file); // Store the file for upload
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeHeadshot = () => {
        setHeadshot(null);
        //setHeadshotFile(null);
    };

    const lowerwearSlides: slide[] = lowerwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));
    
    const footwearSlides: slide[] = footwearItems.map(item => ({
        image: item.fields["Front Image"]?.[0].url,
        name: "slide"
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Save card information to the database
            //await saveCardInformation({ message, occasion, date, recipientId });
            // Redirect to the email signup page
            navigate('/email-signup');
        } catch (error) {
            console.error('Error saving card information:', error);
            setError('Failed to save card information. Please try again.');
        }
    };

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            {/* Left side - Styling */}
            <div className="w-1/2 p-4 flex flex-col h-full">
                {/* New text section */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-1">Build something they'll love.</h2>
                    <p className="text-base">You've chosen the piece - now create something special with it.</p>
                </div>

                {/* Headshot upload button and error message */}
                <div className="mb-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeadshotUpload}
                        style={{ display: 'none' }}
                        id="headshot-upload"
                    />
                    <label htmlFor="headshot-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded cursor-pointer text-sm mr-2">
                        Upload Headshot
                    </label>
                    {headshot && (
                        <button 
                            onClick={removeHeadshot}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                            Remove Headshot
                        </button>
                    )}
                    {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
                </div>

                {/* Upperwear Image with Headshot */}
                <div className="flex justify-center items-center mb-3 relative">
                    {headshot && (
                        <img
                            src={headshot}
                            alt="Recipient Headshot"
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full object-cover border-2 border-white"
                        />
                    )}
                    <img
                        src={upperwearItem.fields["Front"]?.[0].url}
                        alt={upperwearItem.fields.Name}
                        className="object-contain max-h-48"
                    />
                </div>
        
                {/* Lowerwear Component */}
                <div className="mb-3">
                    <ItemList
                        name="lowerwear"
                        items={lowerwearSlides}
                        activeIndex={lowerwearActiveIndex}
                        setActiveIndex={setLowerwearActiveIndex}
                        height={12}
                    />
                </div>
        
                {/* Footwear Component */}
                <div>
                    <ItemList
                        name="footwear"
                        items={footwearSlides}
                        activeIndex={footwearActiveIndex}
                        setActiveIndex={setFootwearActiveIndex}
                        height={10}
                    />
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-3">Card Information</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="message" className="block mb-1 text-sm">Personalized Message:</label>
                        <textarea 
                            id="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            rows={3}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="occasion" className="block mb-1 text-sm">Occasion:</label>
                        <select 
                            id="occasion" 
                            value={occasion} 
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                        >
                            <option value="">Select an occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="holiday">Holiday</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-1 text-sm">Date of Occasion:</label>
                        <input 
                            type="date" 
                            id="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                        Save Card Information
                    </button>
                </form>
            </div>
        </div>
    );      
};

export default Styling;
