import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';
import { getFirestore } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

const Home = ({ token, setToken, hasToken, setHasToken }) => {
  const [joinList, setJoinList] = useState();

  const handleChange = (e) => {
    setJoinList(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(token !== null);
    if (hasToken) {
      <Navigate to="/list" />;
    }
  }, []);

  const handleCreateToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };
  const handleJoinList = () => {
    // set user input token to local storage as the token
    // send user to List view
    // maybe to handle error we can use a Try Catch in the useEffect on the List view
  };

  return (
    <div>
      <CreateList newToken={handleCreateToken} />
      <JoinList
        token={token}
        handleClick={handleJoinList}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Home;
