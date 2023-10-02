import React from 'react';
import {
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav id="masthead">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/chart">Budget Chart</Link></li>
            <li><Link to="/d3_chart">D3 Chart</Link></li>
            {/* <li><Link to="/line_chart">Line Chart</Link></li> */}
            <li><Link to="https://jtledbet.github.io/portfolio.html">Other Projects</Link></li>
            {/* <li><Link to="https://google.com">Google</Link></li> */}
        </ul>
    </nav>
  );
}

export default Menu;
