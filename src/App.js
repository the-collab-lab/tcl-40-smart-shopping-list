import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddItem from './views/AddItem/AddItem.jsx';
import List from './views/List/List.jsx';
import Home from './views/Home/Home.jsx';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

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
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeToken={activeToken}
              setActiveToken={setActiveToken}
              tokenList={tokenList}
              addTokenToLocalStorage={addTokenToLocalStorage}
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
      {activeToken && <Footer />}
    </BrowserRouter>
  );
}

export default App;
