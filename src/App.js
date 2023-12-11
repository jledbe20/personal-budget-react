import React from 'react';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Menu from './pages/Menu/Menu';
import Hero from './pages/Hero/Hero';
import HomePage from './pages/HomePage/HomePage';
import Footer from './pages/Footer/Footer';
import AboutPage from './pages/AboutPage/AboutPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ChartPage from './pages/ChartPage/ChartPage';
import D3Chart from './pages/D3ChartPage/D3Chart';
import BarChart from './pages/BarChartPage/BarChart';
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
          <Route path="/signup" element={<SignupPage />}>
          </Route>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/contact" element={<ContactPage />}>
          </Route>
          <Route path="/chart" element={<ChartPage />}>
          </Route>
          <Route path="/d3_chart" element={<D3Chart />}>
          </Route> 
          <Route path="/bar_chart" element={<BarChart />}>
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
