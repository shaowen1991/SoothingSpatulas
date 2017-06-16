import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions
} from 'react-native';
import ChatList from './ChatList'

class ChatMain extends Component {
  constructor (props){
    super(props);
  }

  render() {
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      height: windowHeight,
      width: windowWidth,
    }

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
        style={{height: style.height, width: style.width, top: 20, zIndex: 100, position: 'absolute'}}
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