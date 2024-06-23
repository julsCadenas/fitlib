import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard'; 
import Login from './pages/login'; 
import MyCatalog from './pages/mycatalog';
import Ebooks from './pages/ebooks';
import Elibrary from './pages/elibrary';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='mycatalog' element={<MyCatalog />}></Route>
          <Route path='ebooks' element={<Ebooks />}></Route>
          <Route path='elibrary' element={<Elibrary />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
