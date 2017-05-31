import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  openCheckIn,
  closeCheckIn,
  addTextComment
} from '../Actions.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import CheckInFooter from './CheckInFooter';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  testCommentsReducer 
}) => ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  testCommentsReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
  },
  toggleCheckIn: (checkInOpenReducer) => {
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
  onCommentSubmit: (user, text) => {
    dispatch(addTextComment(user, text));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component {
  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      toggleCheckIn,
      onCommentSubmit,
      testCommentsReducer
    } = this.props;
    console.log('Main props: ', this.props);

    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Welcome to Momento! {usernameReducer}
        </Text>

        {testCommentsReducer.map((comment, id) => (
          <Text key={id}>{comment.user} : {comment.text}</Text>
        ))}

        <Button onPress={onLogoutClick} title="Logout" />
        <Button onPress={() => { toggleCheckIn(checkInOpenReducer) }} title='Check In' />

        <CheckInFooter 
          visible={checkInOpenReducer}
          onCommentSubmit={(text) => { onCommentSubmit(usernameReducer, text) }}
          toggleCheckIn={() => { toggleCheckIn(checkInOpenReducer) }}
        />
        
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
