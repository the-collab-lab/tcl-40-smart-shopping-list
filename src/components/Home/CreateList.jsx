import React from 'react';
import { NavLink } from 'react-router-dom';

const CreateList = (props) => {
  return (
    <div>
      <h3>Welcome to your Smart Shopping list!</h3>
      <NavLink to="/list">
        <button onClick={props.newToken}>Join an existing list</button>
      </NavLink>
      {/* <NavLink to='/list'><button onClick={props.newToken()}>Create a New List</button></NavLink> */}
    </div>
  );
};

export default CreateList;
