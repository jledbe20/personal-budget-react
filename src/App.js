import React from 'react';
import './App.css';

// import * as ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route, Routes,
  // RouterProvider,
} from "react-router-dom";

// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";

import Menu from './Menu/Menu'
import Hero from './Hero/Hero'
import HomePage from './HomePage/HomePage'
import Footer from './Footer/Footer'
import AboutPage from './AboutPage/AboutPage'
import LoginPage from './LoginPage/LoginPage'
import ContactPage from './ContactPage/ContactPage'
import ChartPage from './ChartPage/ChartPage'
import D3Chart from './D3Chart/D3Chart';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage/>}>
          </Route>
          <Route path="/login" element={<LoginPage/>}>
          </Route>
          <Route path="/contact" element={<ContactPage/>}>
          </Route>
          <Route path="/chart" element={<ChartPage/>}>
          </Route>
          <Route path="/d3_chart" element={<D3Chart/>}>
          </Route>
          <Route path="/" element={<HomePage/>}>
          </Route>
        </Routes>
      </div>
      <HomePage />
      <Footer />
    </Router>
  );
}

export default App;
