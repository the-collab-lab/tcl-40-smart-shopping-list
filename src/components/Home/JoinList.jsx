import React from 'react';
import '../../App.css';
import './Home.css';

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
        <p>
          {' '}
          Join an existing shopping list by entering a valid three word token{' '}
        </p>
      )}
      <div className="share-token-div">
        <label className="share-token-input" htmlFor="share-token">
          Token:
        </label>
        <input
          id="share-token"
          // className="share-token-input"
          type="search"
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
      <button className="joinButton" onClick={handleClick}>
        Join an existing list
      </button>
    </div>
  );
};

export default JoinList;
