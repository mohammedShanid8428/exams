import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import StudentMangement from './pages/StudentMangement';




function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path='/' element={<StudentMangement />} />
   

      </Routes>
    </BrowserRouter>
  );
}

export default App;
