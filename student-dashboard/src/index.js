import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer, { fetchMoreData } from './redux/reducers/data-reducer';
import listReducer, { getStudentList } from './redux/reducers/list-reducer';
import assignmentReducer, { getAssignmentList } from './redux/reducers/assignment-reducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer, { filterList } from './redux/reducers/filter-reducer';

const rootReducer = combineReducers({
  list: dataReducer,
  students: listReducer,
  assignments: assignmentReducer,
  filtered: filterReducer,
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
store.dispatch(filterList)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
