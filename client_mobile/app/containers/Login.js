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
import { firebaseApp } from '../config/config.js';
import Auth0Lock from 'react-native-lock';
// import firebase from 'firebase';
var credentials = require('./auth0-credentials');
// var provider = new firebase.auth.FacebookAuthProvider();

// const auth = firebaseApp.auth();
// const provider = firebase.auth.FacebookAuthProvider;

var lock = new Auth0Lock(credentials);

const mapStateToProps = ({ loginReducer, usernameReducer }) => ({
  loginReducer,
  usernameReducer
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (username, pw) => {
    firebaseApp.auth().signInWithEmailAndPassword(username, pw)
    .then(response => {
      dispatch(updateUsername(username));
      dispatch(updateLogin());
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage)
      console.log('error code: ', errorCode);
      console.log('error message: ', errorMessage);
    })
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
        <Text style={styles.instructions}>
          Login or Sign up:
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(typeInUsername) => this.setState({typeInUsername})}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder={'Email'}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(typeInPassword) => this.setState({typeInPassword})}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Button 
          title="Login"
          onPress={() => {
            props.onLoginClick(this.state.typeInUsername, this.state.typeInPassword);
          }} />
        <Button 
          title="Sign up"
          onPress={() => navigate('Signup')}  />
        <Button 
          title="fb"
          onPress={() => {
            // firebase.auth().signInWithRedirect(provider)
            lock.show({
              closable: true
            }, (err, profile, token) => {
              if (err) {
                console.log(err);
                return;
              }
              // Authentication worked!
              console.log('Logged in with Auth0!');
              navigate('Main');
            });
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
