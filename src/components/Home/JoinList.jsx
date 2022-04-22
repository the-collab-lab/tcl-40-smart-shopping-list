import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinList = ({ token, handleClick, handleChange }) => {
  return (
    <div>
      <p> Join an existing shopping list by entering a three word token </p>
      <div>
        <label htmlFor="share-token">Share Token:</label>
        <input
          type="text"
          placeholder="three word token"
          defaultValue={token}
          onChange={handleChange}
        />
      </div>
      <Link to="/list">
        <button onClick={handleClick}>Join an existing list</button>
      </Link>
    </div>
  );
};

export default JoinList;
