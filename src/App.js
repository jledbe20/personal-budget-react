import React from 'react';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ContactPage from './ContactPage/ContactPage';
import ChartPage from './ChartPage/ChartPage';
import D3Chart from './D3Chart/D3Chart';
import LineChart from './LineChart.js/LineChart';
// import Data from './Data/Data'

export function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />}>
          </Route>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/contact" element={<ContactPage />}>
          </Route>
          <Route path="/chart" element={<ChartPage />}>
          </Route>
          <Route path="/d3_chart" element={<D3Chart />}>
          </Route>
          <Route path="/line_chart" element={<LineChart />}>
          </Route>          
          {/* <Route path="/data" element={<Data />}> */}
          {/* </Route>           */}
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </div>
      <HomePage />
      <Footer />
    </Router>
  );
}
