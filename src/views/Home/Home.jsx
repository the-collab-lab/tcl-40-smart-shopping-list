import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [hasToken, setHasToken] = useState(token !== null);
  console.log('token:', token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token: ', token);
    setHasToken(token !== null);
  }, []);

  const handleCreateToken = () => {
    setToken(localStorage.setItem('token', getToken()));
    console.log('token:', token);
    // need to redirect to '/list' page on click of button
  };

  const savedToken = localStorage.getItem('token');

  return (
    <div>
      {!hasToken ? (
        <CreateList newToken={handleCreateToken} />
      ) : (
        <JoinList token={savedToken} />
      )}
    </div>
  );
};

export default Home;
