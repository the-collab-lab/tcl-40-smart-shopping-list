import React, { useState, useEffect } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';

const Home = ({ activeToken, setActiveToken, tokenList, setTokenList }) => {
  // const [joinList, setJoinList] = useState();
  const [formError, setFormError] = useState();
  const [tokens, setTokens] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token', activeToken);
  }, [activeToken]);

  const handleChange = (e) => {
    setActiveToken(e.target.value);
  };

  const handleCreateToken = () => {
    const newToken = getToken();
    setActiveToken(newToken);
    setTokens([...tokens, newToken]);
    addTokenToLocalStorage(newToken);
  };

  //add token to local storage
  const addTokenToLocalStorage = (token) => {
    const tokens = [...tokenList, token];
    localStorage.setItem('tokenList', JSON.stringify(tokens));
    getTokenListFromLocalStorage();
  };

  //get tokens from local storage
  const getTokenListFromLocalStorage = () => {
    const tokensFromLocalStorage = JSON.parse(
      localStorage.getItem('tokenList'),
    );
    setTokenList([...tokensFromLocalStorage]);
  };

  const handleJoinList = async () => {
    try {
      //first we query the firebase database with the input token
      const q = query(collection(db, activeToken));
      //then we take a snapshot of the results by calling getDocs() on our query
      const querySnapshot = await getDocs(q);
    } catch (error) {
      console.log(error);
      // otherwise set an error in state we can pass to the join list component
      setFormError(
        'This token does not match an existing shopping list. Please check your input and try again.',
      );
    }
  };

  return (
    <div>
      <CreateList newToken={handleCreateToken} />
      <JoinList
        // token={token}
        handleClick={handleJoinList}
        handleChange={handleChange}
        formError={formError}
        tokenList={tokenList}
      />
    </div>
  );
};

export default Home;
