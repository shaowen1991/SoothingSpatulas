/* -----------------------
       Redux Actions
----------------------- */
const updateUsername = (username) => ({
  type: 'UPDATE_USERNAME',
  username: username
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

const addTextComment = (comment, latitude, longitude, rating, user_id) => ({
  type: 'ADD_TEXT_COMMENT',
  comment: comment,
  latitude: latitude,
  longitude: longitude,
  rating: rating,
  user_id: user_id 
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

export {
  updateUsername,
  updateLogin,
  updateLogout,
  openCheckIn,
  closeCheckIn,
  addTextComment,
  updateTextCommentsDB,
  addAudioComment,
  incrementID
};


