import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { updateUsername, updateLogin } from '../actions.js';
import Auth0Lock from 'react-native-lock';

var credentials = require('../config/config.js');
var lock = new Auth0Lock(credentials);

const mapStateToProps = ({ loginReducer, usernameReducer }) => ({
  loginReducer,
  usernameReducer
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: () => {
    lock.show({
      closable: true
    }, (err, profile, token) => {
      console.log('hitting the thing')
      if (err) {
        console.log('login error: ', err);
        return;
      }
      console.log('profile2: ', profile);
      console.log('token2: ', token);
      console.log('Logged in with Auth02!');

      var config = {
        first: profile.nickname,
        email: profile.email
      }

      fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      })
      .catch((err) => {
        console.log('user post error: ', err)
      })

      dispatch(updateUsername(profile.nickname));
      dispatch(updateLogin());
    });
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeInUsername: '',
      typeInPassword: ''
    }
  }

  static navigationOptions = {
    title: 'Login',
  }

  render() {
    let props = this.props;
    const { navigate } = props.navigation;
    console.log('Login props: ', props);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Memento!
        </Text>
        <Button 
          title="Log In"
          onPress={() => {
            props.onLoginClick();
          }}
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
    backgroundColor: '#F5FCFF',
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
