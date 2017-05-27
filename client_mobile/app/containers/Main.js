import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

// import {

// } from '../components'

// const mapStateToProps = (state) => ({

// })

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Momento! Main
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect()(Main);
