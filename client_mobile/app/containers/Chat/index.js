import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
import ChatList from './ChatList'

class ChatMain extends Component {
  constructor (props){
    super(props);
  }

  render() {

    console.log('in index.js', this.props.userId);
      return (
        <NavigatorIOS
          initialRoute={{
            component: ChatList,
            title:'Momento',
            passProps: { userId: this.props.userId }
          }}
          barTintColor='#260b7c'
          titleTextColor='#fff'
          tintColor='#fff'
          navigationBarHidden={false}
          style={{width: '100%', height: 500, top: 20, zIndex: 100, position: 'absolute', zIndex: 1000}}
         />
      )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    },
    text: {
      fontSize: 24,
      marginTop: 300,
      color: 'black',
      alignSelf: 'center'
  }
});

module.exports = ChatMain;