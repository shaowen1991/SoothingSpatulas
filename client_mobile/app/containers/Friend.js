import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class Friend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.friend}>
        <Image
          style={styles.image}
          source={{uri: this.props.url}}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.hometown}>{this.props.hometown}</Text>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  friend: {
    flexDirection: 'row',
    marginBottom: '5%',
    marginLeft: '7%',
  },
  info: {
    flexDirection: 'column',
    marginLeft: '3%'
  },
  name: {
    marginLeft: '5%',
    fontSize: 20
  },
  hometown: {
    marginLeft: '5%',
    fontSize: 15
  },
  image: {
    height: 75,
    width: 75
  }
});

export default Friend;