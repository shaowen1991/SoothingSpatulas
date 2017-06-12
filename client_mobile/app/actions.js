/* ----------------------------------
            Redux Actions
---------------------------------- */

/* General Actions
--------------------------------*/
const updateUsername = (username) => ({
  type: 'UPDATE_USERNAME',
  username: username
});

const updateUserid = (userid) => ({
  type: 'UPDATE_USERID',
  userid: userid
});

const updateUserPic = (userpic) => ({
  type: 'UPDATE_USERPIC',
  userpic: userpic
});

const updateUserPicSmall = (userpicsmall) => ({
  type: 'UPDATE_USERPIC_SMALL',
  userpic: userpicsmall
});

const updateLogin = () => ({
  type: 'LOG_IN'
});

const updateLogout = () => ({
  type: 'LOG_OUT'
});

const openCheckIn = () => ({
  type: 'OPEN_CHECKIN'
});

const closeCheckIn = () => ({
  type: 'CLOSE_CHECKIN'
});

const openProfileView = () => ({
  type: 'OPEN_PROFILE'
});

const closeProfileView = () => ({
  type: 'CLOSE_PROFILE'
});
/* Comments Actions
--------------------------------*/
const addTextComment = (comment, latitude, longitude, rating, user_id, username, location) => ({
  type: 'ADD_TEXT_COMMENT',
  comment: comment,
  latitude: latitude,
  longitude: longitude,
  rating: rating,
  user_id: user_id,
  username: username,
  location: location
});

const updateTextCommentsDB = (textCommentsFromDB) => ({
  type: 'UPDATE_TEXT_COMMENT',
  textComments: textCommentsFromDB
});

const addAudioComment = (user, audioPath) => ({
  type: 'ADD_AUDIO_COMMENT',
  user: user,
  audioPath: audioPath
})

const incrementID = () => ({
  type: 'INCREMENT_ID'
})

/* Map Actions
--------------------------------*/
const moveRegion = (latitude, longitude, latitudeDelta, longitudeDelta) => ({
  type: 'MOVE_REGION',
  latitude: latitude,
  longitude: longitude,
  latitudeDelta: latitudeDelta,
  longitudeDelta: longitudeDelta
})

const clearRegion = () => ({
  type: 'CLEAR_REGION'
})

const moveMyLocation = (latitude, longitude, latitudeDelta, longitudeDelta) => ({
  type: 'MOVE_MY_LOCATION',
  latitude: latitude,
  longitude: longitude,
  latitudeDelta: latitudeDelta,
  longitudeDelta: longitudeDelta
})

const clearMyLocation = () => ({
  type: 'CLEAR_MY_LOCATION'
})

const dropCheckInPin = (latitude, longitude, name, des) => ({
  type: 'DROP_PIN',
  coordinates: {
    latitude: latitude,
    longitude: longitude
  },
  name: name,
  des: des
})

const clearCheckInPin = () => ({
  type: 'CLEAR_PIN'
})

const addNearbyPlace = (latitude, longitude, name, address, img, category) => ({
  type: 'ADD_NEARBY_PLACE',
  coordinates: {
    latitude: latitude,
    longitude: longitude
  },
  name: name,
  address: address,
  img: img,
  category: category,
})

const clearNearbyPlace = () => ({
  type: 'CLEAR_NEARBY_PLACE'
})

const selectPlace = (latitude, longitude, category, name, city, state) => ({
  type: 'SELECT_PLACE',
  latitude: latitude,
  longitude: longitude,
  category: category,
  name: name,
  city: city,
  state: state
})

const clearSelectedPlace = () => ({
  type: 'CLEAR_SELECTED_PLACE'
})
/* User Actions
--------------------------------*/
const storeUserHistoryToState = (userhistory) => ({
  type: 'USER_HISTORY',
  userhistory: userhistory
})

/* Export Actions
--------------------------------*/
export {
  // General Actions
  updateUsername,
  updateUserid,
  updateUserPic,
  updateUserPicSmall,
  updateLogin,
  updateLogout,
  openCheckIn,
  closeCheckIn,
  openProfileView,
  closeProfileView,
  // Comments Actions
  addTextComment,
  updateTextCommentsDB,
  addAudioComment,
  incrementID,
  // Map Actions
  moveRegion,
  clearRegion,
  moveMyLocation,
  clearMyLocation,
  dropCheckInPin,
  clearCheckInPin,
  addNearbyPlace,
  clearNearbyPlace,
  selectPlace,
  // User Actions
  storeUserHistoryToState
};


