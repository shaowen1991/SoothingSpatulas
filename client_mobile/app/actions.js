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
const addTextComment = (comment, latitude, longitude, rating, user_id, location_id, name) => ({
  type: 'ADD_TEXT_COMMENT',
  comment: comment,
  latitude: latitude,
  longitude: longitude,
  rating: rating,
  user_id: user_id,
  location_id: location_id,
  name: name
});

const updateTextCommentsDB = (textCommentsFromDB) => ({
  type: 'UPDATE_TEXT_COMMENT',
  textComments: textCommentsFromDB
});

const addAudioComment = (user, audioPath) => ({
  type: 'ADD_AUDIO_COMMENT',
  user: user,
  audioPath: audioPath
});

const turnOnTextComments = () => ({
  type: 'TURN_ON_TEXT_COMMENTS'
});

const turnOffTextComments = () => ({
  type: 'TURN_OFF_TEXT_COMMENTS'
});

/* Recorder Actions
--------------------------------*/
const updateAudioCurrentFileName = (filename) => ({
  type: 'UPDATE_AUDIO_CURRENT_FILENAME',
  filename: filename
});

const startRecording = () => ({
  type: 'START_RECORDING'
});

const stopRecording = () => ({
  type: 'STOP_RECORDING'
});

const finishRecording = () => ({
  type: 'FINISH_RECORDING'
});

const unfinishRecording = () => ({
  type: 'UNFINISH_RECORDING'
});

const startPlaying = () => ({
  type: 'START_PLAYING'
});

const stopPlaying = () => ({
  type: 'STOP_PLAYING'
});

const updateAudioCurrentTime = (currentTime) => ({
  type: 'UPDATE_AUDIO_CURRENT_TIME',
  currentTime: currentTime
});

const updateAudioLength = (audioLength) => ({
  type: 'UPDATE_AUDIO_LENGTH',
  audioLength: audioLength
});

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
  turnOnTextComments,
  turnOffTextComments,
  // Recorder Actions
  updateAudioCurrentFileName,
  startRecording,
  stopRecording, 
  finishRecording,  
  unfinishRecording,  
  startPlaying,  
  stopPlaying, 
  updateAudioCurrentTime,
  updateAudioLength,
  // Map Actions
  moveRegion,
  clearRegion,
  moveMyLocation,
  clearMyLocation,
  addNearbyPlace,
  clearNearbyPlace,
  selectPlace,
  clearSelectedPlace,
  // User Actions
  storeUserHistoryToState
};


