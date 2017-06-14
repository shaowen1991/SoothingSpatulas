import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Auth0Lock from 'react-native-lock';
import { getUserByEmail, postUser } from '../Network.js';

const credentials = require('../config/config.js');
const lock = new Auth0Lock(credentials);

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import { 
  updateUsername, 
  updateUserid, 
  updateUserPic,
  updateUserPicSmall,
  updateLogin 
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({ 
  loginReducer, 
  usernameReducer, 
  useridReducer,
  userPicReducer
}) => ({
  loginReducer,
  usernameReducer,
  useridReducer,
  userPicReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLoginClick: () => {
    var userLoginInfo = {};
    var userPic = '';
    lock.show(
    {closable: true}, 
    (err, profile, token) => {
      if (err) {
        console.log('-------> login error: ', err);
        return;
      }

      if(!profile.extraInfo.picture_large) {
        userPic = profile.picture;
      } else {
        userPic = profile.extraInfo.picture_large;
      }
      
      if (!profile.extraInfo.given_name) {
        userLoginInfo.first = profile.nickname;
        userLoginInfo.email = profile.email;
        userLoginInfo.photo_small = profile.picture;
        userLoginInfo.photo_large = profile.picture;
      } else {
        userLoginInfo.first = profile.extraInfo.given_name;
        userLoginInfo.last = profile.extraInfo.family_name;
        userLoginInfo.email = profile.email;
        userLoginInfo.photo_small = profile.picture;
        userLoginInfo.photo_large = profile.extraInfo.picture_large;
      }
      
      console.log('PROFILE: ', profile)
      /* ----------------------------------------------------
        Firstly, check if this email is in the our DB or not.
        If it is in DB, get the userid and update Redux.
        If it is not in DB, invoke a POST new user request
      ---------------------------------------------------- */
      getUserByEmail(profile.email)
      .then((user_id) => {dispatch(updateUserid(user_id))})
      .catch((error) => {
        postUser(userLoginInfo)
        /* ----------------------------------------------------
          In this POST request, send new user login info to DB
          and get the user object back from response, 
          which include the userid
        ---------------------------------------------------- */
        .then((user_id) => {dispatch(updateUserid(user_id))})
        .catch((error) => {console.log(error)})
      })
      dispatch(updateUsername(userLoginInfo.first));
      dispatch(updateUserPic(userPic));
      dispatch(updateUserPicSmall(profile.picture));
      dispatch(updateLogin());
    });
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Login extends Component {
  state = { 
    typeInUsername: '',
    typeInPassword: ''
  }

  render() {
    const { onLoginClick } = this.props;
    console.log('Login props: ', this.props);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Momento!
        </Text>
        <Button 
          title="Log In"
          onPress={() => {onLoginClick()}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
