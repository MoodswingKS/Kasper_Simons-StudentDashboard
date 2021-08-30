import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <Header />
        <Nav />
        <Main />
      <Footer />
    </div>
  );
}


export default App;
