import React from 'react';
import '../../App.css';
import './Home.css';

const CreateList = (props) => {
  return (
    <div>
      <h3>Welcome to your Smart Shopping list!</h3>
      <button className="createButton" onClick={props.newToken}>
        Create a new token
      </button>
    </div>
  );
};

export default CreateList;
