import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/list" activeClassName="active">
        List
      </NavLink>
      <NavLink to="/additem" activeClassName="active">
        Add Item
      </NavLink>
    </div>
  );
}
