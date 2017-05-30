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

const addTextComment = (user, text) => ({
  type: 'ADD_TEXT_COMMENT',
  user: user,
  text: text
});

export {
  updateUsername,
  updateLogin,
  updateLogout,
  openCheckIn,
  closeCheckIn,
  addTextComment
};


