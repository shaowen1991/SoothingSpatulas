import React, { Component } from 'react';
import { 
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { updateUsername, updateLogin } from '../actions.js';
import { firebaseApp } from '../config/config.js';
import axios from 'axios';
import $ from 'jquery';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeInUsername: '',
      typeInPassword: ''
    }
    this.signupHanlder = this.signupHanlder.bind(this);
  }

  static navigationOptions = {
    title: 'Sign Up',
  }

  signupHanlder () {
    var config = {
      first: 'Testy',
      last: 'McTesterson',
      email: this.state.typeInUsername
      }
    
    fetch("http://localhost:3000/api/users/", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
      })
      .then((res) => {
        console.log("this is res", res)
      })
      .catch((err) => {
        console.log(err)
      })
      
    // fetch('http://localhost:3030/api/purchase', {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then((res) => {
    //   console.log("this is res", res)
    // }).catch((err) => {
    //   console.log(err)
    // })
        
    
    
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.typeInUsername, this.state.typeInPassword)
    .then(response => {
      console.log('past post');
      const { navigate } = this.props.navigation;
      Alert.alert('Success! Please Login');
      console.log('sign up response: ', response);
      navigate('Login');
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage)
    })
  }

  render() {
    let props = this.props;
    const { navigate } = props.navigation;
    console.log('Signup props: ', props);

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Sign up:
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(typeInUsername) => this.setState({typeInUsername})}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder={'Username'}
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
          title="Sign up"
          onPress={this.signupHanlder} />
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


export default connect()(Signup);
