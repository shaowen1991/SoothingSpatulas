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

/* Comments Actions
--------------------------------*/
const addTextComment = (comment, latitude, longitude, rating, user_id, username) => ({
  type: 'ADD_TEXT_COMMENT',
  comment: comment,
  latitude: latitude,
  longitude: longitude,
  rating: rating,
  user_id: user_id,
  username: username
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

const addNearbyPlace = (latitude, longitude, name, des, img) => ({
  type: 'ADD_NEARBY_PLACE',
  coordinates: {
    latitude: latitude, 
    longitude: longitude
  },
  name: name,
  des: des,
  img: img 
})

const clearNearbyPlace = () => ({
  type: 'CLEAR_NEARBY_PLACE'
})

/* Export Actions
--------------------------------*/
export {
  // General Actions
  updateUsername,
  updateUserid,
  updateLogin,
  updateLogout,
  openCheckIn,
  closeCheckIn,
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
  clearNearbyPlace
};


