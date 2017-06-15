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
const addComment = (comment, latitude, longitude, rating, user_id, location_id, name, comment_audio) => ({
  type: 'ADD_COMMENT',
  comment: comment,
  latitude: latitude,
  longitude: longitude,
  rating: rating,
  user_id: user_id,
  location_id: location_id,
  name: name,
  comment_audio: comment_audio
});

const updateCommentsDB = (textCommentsFromDB) => ({
  type: 'UPDATE_COMMENT',
  textComments: textCommentsFromDB
});

const addAudioComment = (user, audioPath) => ({
  type: 'ADD_AUDIO_COMMENT',
  user: user,
  audioPath: audioPath
});

const turnOnComments = () => ({
  type: 'TURN_ON_COMMENTS'
});

const turnOffComments = () => ({
  type: 'TURN_OFF_COMMENTS'
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

const addAudioList = (newAudioFilename) => ({
  type: 'ADD_AUDIO_LIST',
  newAudioFilename: newAudioFilename
});

const updateAudioList = (audioDownloadedList) => ({
  type: 'UPDATE_AUDIO_LIST',
  audioDownloadedList: audioDownloadedList
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
  addComment,
  updateCommentsDB,
  addAudioComment,
  turnOnComments,
  turnOffComments,
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
  addAudioList,
  updateAudioList,
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


