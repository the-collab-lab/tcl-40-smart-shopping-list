import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddItem from './views/AddItem/AddItem.jsx';
import List from './views/List/List.jsx';
import Home from './views/Home/Home.jsx';

function App() {
  const [activeToken, setActiveToken] = useState(
    localStorage.getItem('token') || '',
  );
  const [tokenList, setTokenList] = useState(
    JSON.parse(localStorage.getItem('tokenList')) || [],
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeToken={activeToken}
              setActiveToken={setActiveToken}
              tokenList={tokenList}
              setTokenList={setTokenList}
            />
          }
        />
        <Route path="/list" element={<List token={activeToken} />} />
        <Route path="/additem" element={<AddItem token={activeToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
