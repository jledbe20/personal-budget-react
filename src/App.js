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
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ContactPage from './ContactPage/ContactPage'

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
