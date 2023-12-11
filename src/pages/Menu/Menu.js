import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

function Menu() {
  return (
    <nav id="masthead">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/table">Table</Link></li>
        <li><Link to="/chart">Budget Chart</Link></li>
        <li><Link to="/d3_chart">D3 Chart</Link></li>
        <li><Link to="/bar_chart">Bar Chart</Link></li>

        <li className="dropdown">
          <button className="dropbtn">Account</button>
          <div className="dropdown-content">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        </li>

        <li className="dropdown">
          <button className="dropbtn">More</button>
          <div className="dropdown-content">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://jtledbet.github.io/portfolio.html" target="_blank" rel="noopener noreferrer">Other Projects</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;