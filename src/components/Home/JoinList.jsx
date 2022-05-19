import React from 'react';

const JoinList = ({
  token,
  handleClick,
  handleChange,
  formError,
  tokenList,
}) => {
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
          id="share-token"
          type="text"
          list="token-list"
          placeholder="three word token"
          defaultValue={token}
          onChange={handleChange}
        />
        {/* map over list of tokens, display each as an option in datalist */}
        <datalist id="token-list">
          {tokenList
            ? tokenList.map((token, index) => {
                return (
                  <option key={index} value={token}>
                    {token}
                  </option>
                );
              })
            : null}
        </datalist>
      </div>
      <button onClick={handleClick}>Join an existing list</button>
    </div>
  );
};

export default JoinList;
