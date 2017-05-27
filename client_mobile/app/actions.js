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

export {
  updateUsername,
  updateLogin,
  updateLogout
};


