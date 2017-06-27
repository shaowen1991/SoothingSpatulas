import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Constants from '../../Constants.js';
class ChatAdd extends Component {
  constructor (props){
    super(props);
    state = {
      email: ''
    }
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  add = (email) => {
    this._textInput.setNativeProps({text: ''});

    email.split('').forEach((value) => {
      if(value === '@') {

        return fetch('https://activesort.com/api/connections', {
        // return fetch('http://localhost:3000/api/connections', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            id: this.props.userId
          })
        });
      }
    });
  }

  render(){
    // console.log('in ChatAdd.js', this.props.userId);
    return (
      <View style={styles.container}>
      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Enter email here"
        autoCapitalize = "none"
        ref={r => this._textInput = r}
        onChangeText = {this.handleEmail}/>
      <TouchableOpacity
        style = {styles.submitButton}
        onPress = { () => this.add(this.state.email) }>
        <Text style = {styles.text}>
          Add
        </Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 15
  },
  input: {
    marginTop: 45,
    flex: 0.7,
    padding: 10,
    height: 40,
    textAlign: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
    fontFamily: Constants.TEXT_FONT
  },

  submitButton: {
    marginTop: 45,
    flex: 0.3,
    backgroundColor: Constants.ICON_COLOR,
    padding: 10,
    height: 40,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  }
})

export default ChatAdd
