import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Navigator from './containers/Navigator';

const initialState = {};

/* -----------------------
       Redux Reducers
----------------------- */
const loginReducer = (state = false, action) => {
  switch (action.type) {
    case ('LOG_IN') : return true
    case ('LOG_OUT') : return false
    default : return state
  }
};

const usernameReducer = (state = '', action) => {
  switch(action.type) {
    case ('UPDATE_USERNAME') : return action.username
    default : return state
  }
};

const reducers = combineReducers({
  loginReducer,
  usernameReducer
});

/* -----------------------
       Redux Store
----------------------- */
const store = createStore(reducers, initialState);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

