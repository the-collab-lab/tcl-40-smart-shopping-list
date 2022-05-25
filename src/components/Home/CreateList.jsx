import React from 'react';

const CreateList = (props) => {
  return (
    <div>
      <h3>Welcome to your Smart Shopping list!</h3>
      <button onClick={props.newToken}>Create a new token</button>
    </div>
  );
};

export default CreateList;
