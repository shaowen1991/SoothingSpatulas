import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class HistoryItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.info}>
        <Text style={styles.name}>- {this.props.place}</Text>
        <Text style={styles.hometown}>Rating: {this.props.rating}</Text>
        <Text style={styles.hometown}>{this.props.city}, {this.props.state}</Text>
        <Text style={styles.hometown}>Pin at {this.props.lat}, {this.props.lng}</Text>
        <Text style={styles.hometown}>{this.props.comment}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'column',
    marginLeft: '3%',
    marginBottom: '5%',
  },
  name: {
    marginLeft: '3%',
    fontSize: 20
  },
  hometown: {
    marginLeft: '10%',
    fontSize: 15
  },
  image: {
    height: 75,
    width: 75
  }
});

export default HistoryItem;