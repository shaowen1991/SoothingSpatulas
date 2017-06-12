import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Navigator from './containers/Navigator';

const initialState = {};

/* -----------------------
       Redux Reducers
----------------------- */

/* General Reducers
--------------------------------*/
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

const useridReducer = (state = 0, action) => {
  switch (action.type) {
    case ('UPDATE_USERID') : return action.userid;
    default : return state;
  }
};

const userPicReducer = (state = '', action) => {
  switch (action.type) {
    case ('UPDATE_USERPIC') : return action.userpic;
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

const profileViewOpen = (state = false, action) => {
  switch (action.type) {
    case ('OPEN_PROFILE') : return true;
    case ('CLOSE_PROFILE') : return false;
    default : return state;
  }  
};

/* Comments Reducers
--------------------------------*/
const textCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TEXT_COMMENT') : return [
      ...state,
      { 
        comment: action.comment,
        latitude: action.latitude,
        longitude: action.longitude,
        rating: action.rating,
        user_id: action.user_id,
        location_id: action.location_id,
        name: action.name
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

/* Map Reducers
--------------------------------*/
const regionReducer = (state = {}, action) => {
  switch (action.type) {
    case ('MOVE_REGION') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      latitudeDelta: action.latitudeDelta,
      longitudeDelta: action.longitudeDelta     
    };
    case ('CLEAR_REGION') : return {};
    default : return state;
  } 
}

const myLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case ('MOVE_MY_LOCATION') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      latitudeDelta: action.latitudeDelta,
      longitudeDelta: action.longitudeDelta     
    };
    case ('CLEAR_MY_LOCATION') : return {};
    default : return state;
  } 
}

const pinCoordinatesReducer = (state = {}, action) => {
  switch (action.type) {
    case ('DROP_PIN') : return {
      coordinates: {
        latitude: action.coordinates.latitude, 
        longitude: action.coordinates.longitude
      },
      name: action.name,
      des: action.des  
    }
    case ('CLEAR_PIN') : return {};
    default : return state;
  }
}

const nearbyPlacesReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_NEARBY_PLACE') : return [
      ...state,
      {
        coordinates: {
          latitude: action.coordinates.latitude, 
          longitude: action.coordinates.longitude
        },
        name: action.name,
        address: action.address,
        img: action.img,
        category: action.category,    
      }
    ];
    case ('CLEAR_NEARBY_PLACE') : return [];
    default : return state;
  }     
}

const selectedPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case ('SELECT_PLACE') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      category: action.category,
      name: action.name,
      city: action.city,
      state: action.state
    };
    case ('CLEAR_SELECTED_PLACE') : return {};
    default : return state;
  } 
}  
/* User Reducers
--------------------------------*/
const userHistoryReducer = (state = [], checkin) => {
  switch (checkin.type) {
    case ('USER_HISTORY') : return [
      ...state,
      {
        comment: checkin.comment
      }
    ];
    default : return state;
  }
}

const reducers = combineReducers({
  // General Reducers
  loginReducer,
  usernameReducer,
  useridReducer,
  userPicReducer,
  checkInOpenReducer,
  profileViewOpen,
  // Comments Reducers
  textCommentsReducer,
  audioCommentsReducer,
  testCommentIDReducer,
  // Map Reducers
  regionReducer,
  myLocationReducer,
  selectedPlaceReducer,
  pinCoordinatesReducer,
  nearbyPlacesReducer,
  // User Reducers
  userHistoryReducer
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


