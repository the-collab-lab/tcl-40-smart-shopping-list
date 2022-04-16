import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';

const Home = ({ token, setToken }) => {
  const [hasToken, setHasToken] = useState(token !== null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(token !== null);
  }, []);

  const handleCreateToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <div>
      {!hasToken ? (
        <CreateList newToken={handleCreateToken} />
      ) : (
        <JoinList token={token} />
      )}
    </div>
  );
};

export default Home;
