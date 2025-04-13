import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Dashboard from './pages/Dashboard.jsx';
import {isLoggedIn} from './utils/auth.js';
import ProtectedRoute from './components/protectedRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={isLoggedIn() ? <Navigate to={"/dashboard"}/> : <SignupPage/>} />
    <Route path='/dashboard' element={
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
