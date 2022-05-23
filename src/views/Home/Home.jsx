import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';

const Home = ({
  activeToken,
  setActiveToken,
  tokenList,
  addTokenToLocalStorage,
}) => {
  const [formError, setFormError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setActiveToken(e.target.value);
    localStorage.setItem('token', e.target.value);
  };

  const handleCreateToken = () => {
    const newToken = getToken();
    console.log(newToken);
    setActiveToken(newToken);
    localStorage.setItem('token', newToken);
    //addTokenToLocalStorage(newToken);
    navigate('/additem');
    //add a dummy item to the list so it will exist
  };

  const handleJoinList = async () => {
    //check for valid input
    if (activeToken) {
      //first we query the firebase database with the input token
      const q = query(collection(db, activeToken));
      //then we take a snapshot of the results by calling getDocs() on our query
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.size, activeToken);
      // if the query returns a found list and the size is greater than one its an existing list and should be added to local storage
      //if the query returns a found list and the size is equal to one
      if (querySnapshot.size >= 1 && !tokenList.includes(activeToken)) {
        addTokenToLocalStorage(activeToken);
        navigate('/list');
      } else if (querySnapshot.size >= 1) {
        navigate('/list');
      }
      //if the size is less than 1, either theres no list attached to that token yet or the user entered an invalid token
      else if (querySnapshot.size < 1) {
        setFormError(
          'This token does not match an existing shopping list. Please check your input and try again.',
        );
      }
    } else {
      setFormError('Token cannot be blank!');
    }
  };

  return (
    <div>
      <CreateList newToken={handleCreateToken} />
      <JoinList
        token={activeToken}
        handleClick={handleJoinList}
        handleChange={handleChange}
        formError={formError}
        tokenList={tokenList}
      />
    </div>
  );
};

export default Home;
