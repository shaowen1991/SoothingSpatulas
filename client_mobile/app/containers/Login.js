import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity, 
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Auth0Lock from 'react-native-lock';
import { getUserByEmail, postUser } from '../Network.js';
import Constants from '../Constants';
import AssetMap from '../config/AssetMap';
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
        userLoginInfo.first = profile.extraInfo.given_name + ' ' + profile.extraInfo.family_name;
        userLoginInfo.last = profile.extraInfo.family_name;
        userLoginInfo.email = profile.email;
        userLoginInfo.photo_small = profile.picture;
        userLoginInfo.photo_large = profile.extraInfo.picture_large;
      }
      
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
    // console.log('Login props: ', this.props);

    return (
      <View style={styles.container}>
        <Image 
          source={AssetMap.loginBackground} 
          style={styles.backgroundImage} 
        />
        <View style={styles.middle}>
          <Text style={styles.welcome}>
            Welcome to Momento
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onLoginClick}
          >
            <Text style={styles.buttonText}>
              {'Log In'}
            </Text>
          </TouchableOpacity> 
        </View>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  welcome: {
    fontSize: 25,
    alignContent: 'center',
    margin: 10,
    color: 'white',
    fontFamily: Constants.TEXT_FONT,
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 2,
  },
  middle: {
    position: 'absolute',
    flexDirection: 'column',
  },
  button: {
    width: 180,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Constants.ICON_COLOR,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 2,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
