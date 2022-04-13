import React, { useState, useEffect } from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

const Home = () => {
  // if user does not have a token in localStorage

  const checkLocalStorage = () => {
    localStorage.getItem(); //insert name of property you set the token to
  };

  // show button/link on home screen to "create a new list"

  // onClick generates a new token and saves to localStorage

  const handleCreateToken = (e) => {};

  const saveToLocalStorage = () => {
    localStorage.setItem();
  };

  // render "List" view

  // else (if user does have a token in localStorage)
  // render "List" view

  return (
    <div className="welcome">
      <div>
        <p>(show if user does not have a token)</p>
        <h3>Welcome to your Smart Shopping list!</h3>
        <button onClick={handleCreateToken}>Create a New List</button>

        <p>(show if user has a token)</p>

        <p> Join an existing shopping list by entering a three word token </p>
        <div>
          <form>
            <label htmlFor="share-token">Share Token:</label>
            <input type="text" placeholder="three word token" />
          </form>
        </div>
        <button>Join an existing list</button>
      </div>
    </div>
  );
};

export default Home;
