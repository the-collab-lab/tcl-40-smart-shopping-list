import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddItem from './views/AddItem/AddItem.jsx';
import List from './views/List/List.jsx';
import Home from './views/Home/Home.jsx';

function App() {
  //const [token, setToken] = useState(localStorage.getItem('token'));
  //const [hasToken, setHasToken] = useState(token !== null);
  const [activeToken, setActiveToken] = useState(localStorage.getItem('token'));
  const [tokenList, setTokenList] = useState(
    JSON.parse(localStorage.getItem('tokenList')) || [],
  );
  // useEffect(() => {

  // }, [token])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              //token={token}
              //setToken={setToken}
              //hasToken={hasToken}
              //setHasToken={setHasToken}
              activeToken={activeToken}
              setActiveToken={setActiveToken}
              tokenList={tokenList}
              setTokenList={setTokenList}
            />
          }
        />
        <Route path="/list" element={<List />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
