import React, { useState } from 'react';
import { saveEmail } from '../../services/emailService';

const EmailSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveEmail(email);
            setMessage("Thank you for signing up! We'll reach out when we're ready to help you with Giftwear.");
            setEmail('');
        } catch (error) {
            console.error('Error saving email:', error);
            setMessage('Failed to save your email. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Interested in Giftwear?</h1>
            <p className="text-lg mb-6">We're just getting started. Sign up for our email list, and we'll reach out when we're ready to help you.</p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
                    <input 
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="email" 
                        placeholder="Enter your email" 
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" 
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-lg text-center">{message}</p>}
        </div>
    );
};

export default EmailSignup;
