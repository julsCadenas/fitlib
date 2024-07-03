import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Dashboard from './pages/dashboard'; 
import Login from './pages/login'; 
import Admin from './pages/admin';
import MyCatalog from './pages/mycatalog';
import Ebooks from './pages/ebooks';
import Elibrary from './pages/elibrary';


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route index path='login' element={<Login />}></Route>
            <Route index path='admin' element={<Admin />}></Route>
            <Route path='dashboard' element={<Dashboard />}></Route>
            <Route path='mycatalog' element={<MyCatalog />}></Route>
            <Route path='ebooks' element={<Ebooks />}></Route>
            <Route path='elibrary' element={<Elibrary />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
