// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CelebritySwiper from './components/Celebrities/CelebritySwiper';
import Catalog from './components/Catalog/Catalog';
import Styling from './components/Styling/Styling';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './style.scss';
import NewRecipientForm from './components/Profile/NewRecipientForm';
import RecipientList from './components/Profile/RecipientList';
import EmailSignup from './components/EmailSignup/EmailSignup';

const App: React.FC = () => {
  const [item, setItem] = useState<any | null>(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><Navigate to="/catalog" replace /></ProtectedRoute>} />
          <Route path="/catalog/:recipientId" element={
            <ProtectedRoute>
              <Catalog setItem={setItem}/>
            </ProtectedRoute>
          } />
          {/* <Route path="/catalog/:recipientId" element={
            <ProtectedRoute>
              <Catalog likedStyles={likedStyles} setItem={setItem}/>
            </ProtectedRoute>
          } /> */}
          
          <Route path="/styling/:recipientId" element={
            <ProtectedRoute>
              <Styling upperwearItem={item}/>
            </ProtectedRoute>
          } />
          <Route path="/celebrity/:recipientId" element={
            <ProtectedRoute>
              <CelebritySwiper/>
            </ProtectedRoute>
          } />
          <Route path="/add-recipient" element={
            <ProtectedRoute>
              <NewRecipientForm/>
            </ProtectedRoute>
          } />
          <Route path="/recipient-list" element={
            <ProtectedRoute>
              <RecipientList/>
            </ProtectedRoute>
          } />
          <Route path="/edit-recipient/:id" element={
            <ProtectedRoute>
              <NewRecipientForm/>
            </ProtectedRoute>
          } />
          <Route path="/email-signup" element={<EmailSignup />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
