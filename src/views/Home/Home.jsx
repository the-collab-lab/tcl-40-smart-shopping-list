import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';
import { useNavigate } from 'react-router-dom';

const Home = ({ token, setToken, hasToken, setHasToken }) => {
  const [joinList, setJoinList] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJoinList(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(token !== null);
    const navigateToList = () => navigate(`/list`);
    if (hasToken) {
      navigateToList();
    }
  }, []);

  const handleCreateToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };
  const handleJoinList = () => {
    localStorage.setItem('token', joinList);
    setToken(joinList);
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
