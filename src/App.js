import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';
import SignUp from './pages/signup';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route exact path='/eciks/home' element={<About/>} />
      <Route path='/eciks/services' element={Services} />
      <Route path='/eciks/contact-us' element={Contact} />
      <Route path='/eciks/sign-up' element={SignUp} />
      <Route path="/eciks" element={<Navigate replace to="/eciks/home" />} />
      <Route path="/" element={<Navigate replace to="/eciks/home" />} />
    </Routes>
  </Router>
  );
}

export default App;
