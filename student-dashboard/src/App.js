import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import React, { useEffect, useState } from 'react';
// csv
import Papa from 'papaparse'
import mockdata from './redux/reducers/mockdata_winc.csv'
// redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dataReducer from './redux/reducers/data-reducer';


const rootReducer = combineReducers({
  store: dataReducer
});

const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(mockdata)
      const reader = response.body.getReader()
      const result = reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value)
      const results = Papa.parse(csv, { header: true, dynamicTyping: true })
      const data = results.data
      console.log(results)
      console.log(data)
      setData(data)
    }
    fetchData()
  }, [])


  
  return (
    <Provider store={store}>
    <div className="App">
      <Header />
      <Nav />
      <Main data={data} />
      <Footer />
    </div>
    </Provider>
  );
}

export default App;
