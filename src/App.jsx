import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige a login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App
