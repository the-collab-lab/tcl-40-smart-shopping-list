import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer.jsx';
import AddItem from './views/AddItem/AddItem.jsx';
import List from './views/List/List.jsx';
import Home from './views/Home/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
