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

  // add token to local storage
  const addTokenToLocalStorage = (token) => {
    const tokens = [...tokenList, token];
    localStorage.setItem('token', token);
    localStorage.setItem('tokenList', JSON.stringify(tokens));
    getTokenListFromLocalStorage();
  };

  //populate token array from local storage
  const getTokenListFromLocalStorage = () => {
    const tokensFromLocalStorage = JSON.parse(
      localStorage.getItem('tokenList'),
    );
    setTokenList([...tokensFromLocalStorage]);
  };

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
              addTokenToLocalStorage={addTokenToLocalStorage}
              getTokenListFromLocalStorage={getTokenListFromLocalStorage}
            />
          }
        />
        <Route
          path="/list"
          element={<List token={activeToken} tokenList={tokenList} />}
        />
        <Route
          path="/additem"
          element={
            <AddItem
              token={activeToken}
              addTokenToLocalStorage={addTokenToLocalStorage}
              tokenList={tokenList}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
