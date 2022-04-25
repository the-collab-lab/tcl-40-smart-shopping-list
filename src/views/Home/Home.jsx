import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';

const Home = ({ token, setToken, hasToken, setHasToken }) => {
  const [joinList, setJoinList] = useState();
  const [formError, setFormError] = useState();

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
  }, [hasToken, navigate, setHasToken]);

  const handleCreateToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleJoinList = async () => {
    //first we query the firebase database with the input token
    const q = query(collection(db, joinList));
    //then we take a snapshot of the results by calling getDocs() on our query
    const querySnapshot = await getDocs(q);
    // console.log('QUERY SNAPSHOT', querySnapshot.size)
    // if the snapshot.size is greater than one, we can assume it's a valid list, set the token in state, and navigate the user to the list view
    if (querySnapshot.size > 1) {
      localStorage.setItem('token', joinList);
      setToken(joinList);
      navigate(`/list`);
    }
    // otherwise set an error in state we can pass to the join list component
    setFormError(
      'This token does not match an existing shopping list. Please check your input and try again.',
    );
  };

  return (
    <div>
      <CreateList newToken={handleCreateToken} />
      <JoinList
        token={token}
        handleClick={handleJoinList}
        handleChange={handleChange}
        formError={formError}
      />
    </div>
  );
};

export default Home;
