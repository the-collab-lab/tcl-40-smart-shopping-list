import React, { useState } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import CreateList from '../../components/Home/CreateList';
import JoinList from '../../components/Home/JoinList';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Home = ({
  activeToken,
  setActiveToken,
  tokenList,
  addTokenToLocalStorage,
}) => {
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setActiveToken(e.target.value);
    localStorage.setItem('token', e.target.value);
  };

  const handleCreateToken = () => {
    const newToken = getToken();
    setActiveToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/additem');
  };

  const handleJoinList = async () => {
    //check for valid input
    if (activeToken) {
      //first we query the firebase database with the input token
      const q = query(collection(db, activeToken));
      //then we take a snapshot of the results by calling getDocs() on our query
      const querySnapshot = await getDocs(q);
      // if the query returns an existing list and the active token is not already in the token array
      if (querySnapshot.size >= 1 && !tokenList.includes(activeToken)) {
        addTokenToLocalStorage(activeToken);
        navigate('/list');
      } else if (querySnapshot.size >= 1) {
        navigate('/list');
      } else if (querySnapshot.size < 1) {
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
      {/* <Header /> */}
      <CreateList newToken={handleCreateToken} />
      <JoinList
        token={activeToken}
        handleClick={handleJoinList}
        handleChange={handleChange}
        formError={formError}
        tokenList={tokenList}
      />
      {/* <div>{activeToken ? <Footer /> : null}</div> */}
    </div>
  );
};

export default Home;
