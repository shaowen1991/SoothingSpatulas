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

const credentials = require('../config/config.js');
const lock = new Auth0Lock(credentials);

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import { 
  updateUsername, 
  updateUserid, 
  updateLogin 
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({ 
  loginReducer, 
  usernameReducer, 
  useridReducer 
}) => ({
  loginReducer,
  usernameReducer,
  useridReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLoginClick: () => {
    lock.show(
    {closable: true}, 
    (err, profile, token) => {
      if (err) {
        console.log('-------> login error: ', err);
        return;
      }

      let userLoginInfo = {
        first: profile.nickname,
        email: profile.email
      }
      /* ----------------------------------------------------
        Firstly, check if this email is in the our DB or not.
        If it is in DB, get the userid and update Redux.
        If it is not in DB, invoke a POST new user request
      ---------------------------------------------------- */
      fetch("http://localhost:3000/api/users/email/" + profile.email, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'            
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('-------> get login user data: ', responseJSON);
        dispatch(updateUserid(responseJSON.id));
      })
      .catch((err) => {
        console.log('-------> user id fetch err: ', err);
        /* ----------------------------------------------------
          In this POST request, send new user login info to DB
          and get the user object back from response, 
          which include the userid
        ---------------------------------------------------- */
        fetch("http://localhost:3000/api/users/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userLoginInfo)
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log('-------> new user posted: ',responseJSON);
          dispatch(updateUserid(responseJSON.id));
        })
        .catch((err) => {
          console.log('-------> new user post error: ', err)
        })
      })
      dispatch(updateUsername(profile.nickname));
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
