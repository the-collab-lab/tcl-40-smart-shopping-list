import React from 'react';
import { NavLink } from 'react-router-dom';

const JoinList = (props) => {
  return (
    <div>
      <h3>Welcome to your Smart Shopping list!</h3>
      <p> Join an existing shopping list by entering a three word token </p>
      <div>
        <label htmlFor="share-token">Share Token:</label>
        <input 
            type="text" 
            placeholder="three word token" 
            defaultValue={props.token} />
      </div>
      <NavLink to="/list">
        <button>Join an existing list</button>
      </NavLink>
    </div>
  );
};

export default JoinList;