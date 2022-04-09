import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <NavLink to="/" className="navLinks">
        Home
      </NavLink>
      <NavLink to="/list" className="navLinks">
        List
      </NavLink>
      <NavLink to="/additem" className="navLinks">
        Add Item
      </NavLink>
    </div>
  );
}
