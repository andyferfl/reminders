import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute user={false}>
                <HomePage/>
              </ProtectedRoute>
            }  exact/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App