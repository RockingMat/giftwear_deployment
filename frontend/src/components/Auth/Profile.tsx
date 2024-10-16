import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/profile', { username });
      // Update local user state or refetch user data
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Please log in</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};