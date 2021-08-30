import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer, { fetchMoreData } from './redux/reducers/data-reducer';
import listReducer, { getStudentList } from './redux/reducers/list-reducer';
import assignmentReducer, { getAssignmentList } from './redux/reducers/assignment-reducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
  list: dataReducer,
  students: listReducer,
  assignments: assignmentReducer

});

export default function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunk)
  const composedEnhancers = composeWithDevTools(middlewareEnhancer)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}

const store = configureStore()
store.dispatch(fetchMoreData)
store.dispatch(getStudentList)
store.dispatch(getAssignmentList)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
