import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer.jsx';
import AddItem from './views/AddItem/AddItem.jsx';
import List from './views/List/List.jsx';
import Home from './views/Home/Home.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [hasToken, setHasToken] = useState(token !== null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              setToken={setToken}
              hasToken={hasToken}
              setHasToken={setHasToken}
            />
          }
        />
        <Route path="/list" element={<List token={token} />} />
        <Route path="/additem" element={<AddItem token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
