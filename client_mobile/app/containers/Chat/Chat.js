import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toUserId: this.props.userDetails.users_b_id,
      user:{
        _id:'',
        name: ''
      }
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.socket = SocketIOClient('ws://198.199.93.251:7999');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }


determineUser() {

    return fetch("https://activesort.com/api/users/" + this.props.userId, {
    // return fetch("http://localhost:3000/api/users/" + this.props.userId, {
        method: 'GET'
      })
      .then((response) => {
        return response.json() })
      .then((responseJson) => {
        var user = {};
        user["_id"] = responseJson.id;
        user["name"] = responseJson.first + responseJson.last;

        this.setState({ user: user });
        this.socket.emit('userJoined', {
          userId: user._id,
          toId: this.state.toUserId
        });
      })
      .then(() => {

        return fetch("https://activesort.com/api/users/" + this.state.toUserId, {
        // return fetch("http://localhost:3000/api/users/" + this.state.toUserId, {
          method: 'GET'
        })
        .then((response) => {
          return response.json() })
        .then((responseJson) => {
          var other_user = {};
          other_user["_id"] = responseJson.id;
          other_user["name"] = responseJson.first + responseJson.last;

          this.setState({ other_user: other_user });
        })
        .catch((error) => {
          console.error(error);
        });

      })
      .catch((error) => {
        console.error(error);
      });

}

  onReceivedMessage(messages) {
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
    var user = {
            _id: 1,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          };

          console.log('in Chat.js', this.props.userId);

    return (<View style = {{marginTop: 45, width: 375, height: 540, backgroundColor: 'whitesmoke' }} >
      <GiftedChat messages = { this.state.messages }
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
