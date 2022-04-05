import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <NavLink to="/" activeClassName="active" className="navLinks">
        Home
      </NavLink>
      <NavLink to="/list" activeClassName="active" className="navLinks">
        List
      </NavLink>
      <NavLink to="/additem" activeClassName="active" className="navLinks">
        Add Item
      </NavLink>
    </div>
  );
}
