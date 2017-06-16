import React, {Component} from 'react';
import {
  Button,
  Dimensions,
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
      return fetch("https://activesort.com/api/connections/" + this.props.userId, {
      // return fetch("http://localhost:3000/api/connections/" + this.props.userId, {
        method: 'GET'
      })
      .then((response) => {
        // console.log(response);
        return response.json()})
      .then((responseJson) => {
        this.setState({chatConnections: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
    }.bind(this), 1000);
  }

  goToChat(userDetails){
    this.props.navigator.push({
    component: Chat,
    title: 'Chat',
    passProps: { userDetails,  userId: this.props.userId }
   });
  }

  render() {
    // console.log("render called");
    let chats = this.state.chatConnections;
    // console.log('from chats ', chats);
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      height: windowHeight,
      width: windowWidth,
    }

    let list = chats.map((item, index) => {
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
    // console.log('in ChatList.js', this.props.userId);
    return(
      <View>
        <ChatAdd userId={this.props.userId}/>
        <ScrollView
          style={[style]}
          userId={this.props.userId}>
          {list}
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  containerProfile:{
    height: 50,
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