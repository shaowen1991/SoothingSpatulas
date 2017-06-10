import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Image
} from 'react-native';
import Chat from './Chat';
import ChatAdd from './ChatAdd';
import Separator from './Separator.js';

class ChatList extends Component {
  constructor (props){
    super(props);
    this.state = {
      text: '',
      chatConnections: []
    };
  }

  componentDidMount(){
    setInterval(function() {
      AsyncStorage.getItem('userId')
        .then((userId) => {
            console.log('AUth id &&&&&&&',userId);

            fetch("http://localhost:3000/api/connections/5" /*+ userId*/, {
              method: 'GET'
            })
            .then((response) => {

              console.log(response);
              return response.json()})
            .then((responseJson) => {
              this.setState({chatConnections: responseJson});
            })
            .catch((error) => {
              console.error(error);
            });

            })
        .catch((e) => console.log(e));
    }.bind(this), 1000);
  }

  goToChat(userDetails){
    console.log("gtc called", this, this.props, userDetails);
    this.props.navigator.push({
    component: Chat,
    title: 'Chat',
    passProps: {userDetails}
   });
  }

  render() {
    console.log("render called");
    var chats = this.state.chatConnections;
    console.log('from chats ', chats);
    var list = chats.map((item, index) => {
      return (
        <View key={index}>
          <View>
            <TouchableHighlight
              onPress={this.goToChat.bind(this, item)}
              underlayColor='transparent'>
              <View>
              <View style={styles.containerProfile} >
              <Text style={styles.name}>{item.connection_name}</Text>
              </View>
              <Separator/>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      )
    })

    return(
      <View>
        <ChatAdd/>
        <ScrollView>
          {list}
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
    containerProfile:{
        flexDirection: 'row',
        marginLeft: 10,
        padding:5
    },
    name: {
        fontSize: 18,
        paddingBottom: 5,
        paddingTop:5,
        paddingLeft:20,
        fontFamily: 'Avenir-Medium'
    }
});

module.exports = ChatList;