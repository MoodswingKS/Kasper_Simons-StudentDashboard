import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
        <Router>
          <Nav />
          <Main />
        </Router>
      <Footer />
    </div>
  );
}


export default App;
