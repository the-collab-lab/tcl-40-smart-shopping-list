import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';
import { getFirestore } from 'firebase/firestore';

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

  const handleJoinList = () => {
    // const token = localStorage.getItem('token')
    console.log('this is a fun console log');
    getFirestore.listCollections().then((collections) => {
      for (let collection of collections) {
        console.log(`Found collection with id: ${collection.id}`);
      }
    });
  };

  return (
    <div>
      {/* {!hasToken ? ( */}
      <CreateList newToken={handleCreateToken} />
      {/* ) : ( */}
      <p> -- or -- </p>
      <JoinList token={token} handleClick={handleJoinList} />
      {/* )} */}
    </div>
  );
};

export default Home;
