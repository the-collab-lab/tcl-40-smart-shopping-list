import { NavLink } from 'react-router-dom';
import './Footer.css';
// import '../../App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <NavLink to="/" className="navLinks btn">
        Home
      </NavLink>
      <NavLink to="/list" className="navLinks btn">
        List
      </NavLink>
      <NavLink to="/additem" className="navLinks btn">
        Add Item
      </NavLink>
    </footer>
  );
}
