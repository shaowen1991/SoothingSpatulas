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
    case ('LOG_IN') : return true;
    case ('LOG_OUT') : return false;
    default : return state;
  }
};

const usernameReducer = (state = '', action) => {
  switch (action.type) {
    case ('UPDATE_USERNAME') : return action.username;
    default : return state;
  }
};

const checkInOpenReducer = (state = false, action) => {
  switch (action.type) {
    case ('OPEN_CHECKIN') : return true;
    case ('CLOSE_CHECKIN') : return false;
    default : return state;
  }  
};

const textCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TEXT_COMMENT') : return [
      ...state,
      { 
        comment: action.comment,
        latitude: action.latitude,
        longitude: action.longitude,
        rating: action.rating,
        user_id: action.user_id 
      }
    ];
    case ('UPDATE_TEXT_COMMENT') : return action.textComments;
    default : return state;
  }    
};

const audioCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_AUDIO_COMMENT') : return [
      ...state,
      { 
        user: action.user,
        audioPath: action.audioPath
      }
    ];
    default : return state;
  }      
}

const testCommentIDReducer = (state = 0, action) => {
  switch (action.type) {
    case ('INCREMENT_ID') : return state + 1;
    default : return state;
  }    
}

const reducers = combineReducers({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer,
  testCommentIDReducer
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


