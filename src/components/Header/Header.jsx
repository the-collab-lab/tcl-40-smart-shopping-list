import React from 'react';
import { SiProbot } from 'react-icons/si';
import '../../App.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Smart Shopping List</h1>
      <div className="icons">
        <SiProbot className="icon" />
      </div>
    </div>
  );
};

export default Header;
