import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard'; 
import Login from './pages/login'; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
