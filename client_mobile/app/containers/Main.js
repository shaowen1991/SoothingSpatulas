import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateLogout, updateUsername } from '../actions.js';
// import { firebaseApp } from '../config/config.js';

const mapStateToProps = ({ loginReducer, usernameReducer }) => ({
  loginReducer,
  usernameReducer 
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
  }
});

class Main extends Component {
  render() {
    let props = this.props;
    // let user = firebaseApp.auth().currentUser.email;
    console.log('Main props: ', props);
    // console.log('User: ', user);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Momento! {props.usernameReducer}
        </Text>
        <Button onPress={props.onLogoutClick} title="sign out" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
