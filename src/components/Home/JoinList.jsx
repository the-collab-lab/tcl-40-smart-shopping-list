import React from 'react';

const JoinList = ({ token, handleClick, handleChange, formError }) => {
  return (
    <div>
      {formError ? (
        <p>{formError}</p>
      ) : (
        <p> Join an existing shopping list by entering a three word token </p>
      )}

      <div>
        <label htmlFor="share-token">Share Token:</label>
        <input
          type="text"
          placeholder="three word token"
          defaultValue={token}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleClick}>Join an existing list</button>
    </div>
  );
};

export default JoinList;
