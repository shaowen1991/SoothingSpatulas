import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class MomentoBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.profileheader}>
        <View style={styles.headerBar}>
          <Text style={styles.appName}>Momento</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileheader: {
    height: 55,
    marginBottom: 10
  },
  headerBar: {
    width: '100%',
    height: 44,
    backgroundColor: '#4527A0',
    marginTop: 20,
    alignSelf: 'center'
  },
  appName: {
    fontSize: 16.9,
    textAlign: 'center',
    color: 'white',
    lineHeight: 30,
    paddingTop: 6,
    fontWeight: '600'
  },
});

export default MomentoBar;