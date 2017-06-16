import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { getUserById } from '../../Network.js';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toUserId: this.props.userDetails.users_b_id,
      user:{
        _id: '',
        name: '',
        avatar: ''
      },
      other_user:{
        _id: '',
        name: '',
        avatar: ''
      }
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.socket = SocketIOClient('ws://198.199.93.251:7999');
    // this.socket = SocketIOClient('http://localhost:8000');
  }

  componentDidMount() {
    this.socket.on('message', this.onReceivedMessage);
    getUserById(this.props.userId)
    .then((fetchedUserInfo) => {
      var user = {};
      user["_id"] = fetchedUserInfo.id;
      user["name"] = fetchedUserInfo.first + fetchedUserInfo.last;
      user["avatar"] = fetchedUserInfo.photo_small;

      this.setState({ user: user });
      this.socket.emit('userJoined', {
          userId: user._id,
          toId: this.props.userDetails.users_b_id
      });
    })
    .then(() => {
      getUserById(this.props.userDetails.users_b_id)
      .then((fetchedUserInfo) => {
        var user = {};
        user["_id"] = fetchedUserInfo.id;
        user["name"] = fetchedUserInfo.first + fetchedUserInfo.last;
        user["avatar"] = fetchedUserInfo.photo_small;

        this.setState({ other_user: user });
      })
      .catch((error) => {console.log(error)});
    })
    .catch((error) => {console.log(error)});
  }

  onReceivedMessage(messages) {
    // setInterval(function() {
      var context = this;
      var newMsgObj = messages.map(function(message) {
        var newmessage = {};
        newmessage['_id'] = message['id'];
        newmessage['text'] = message['message'];
        newmessage['createdAt'] = message['created_at'];
        if(message.from_id===context.state.user._id)
            newmessage['user'] = context.state.user;
        else
            newmessage['user'] = context.state.other_user;
        newmessage['to_user'] = message['to_id'];
        return newmessage;
      });
      messages = newMsgObj;
      this._storeMessages(messages);
    // }.bind(this), 1000);
  }

  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }

  render() {
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      height: windowHeight - 200,
      width: windowWidth,
    }

    return (
      <View style = {{marginTop: 45, width: style.width, height: style.height, backgroundColor: 'whitesmoke' }} >
        <GiftedChat 
          messages = { this.state.messages }
          onSend = {this.onSend}
          user = {this.state.user}
          keyboardShouldPersistTaps = {'always'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 300,
    color: 'black',
    alignSelf: 'center'
  }
})

module.exports = Chat;
