import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { updateUsername, updateLogin } from '../actions.js';
import Main from './Main';
import Login from './Login';

class Navigator extends Component {
  render() {
    let props = this.props;
    console.log('props: ', props);

    return (
      props.loginReducer ? <Main /> : <Login />
    );
  }
}

const mapStateToProps = ({ loginReducer, usernameReducer }) => ({
  loginReducer,
  usernameReducer
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (username, pw) => {
    if (username !== '') {
      dispatch(updateUsername(username));
      dispatch(updateLogin());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
