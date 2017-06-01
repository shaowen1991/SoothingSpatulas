import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { getTextComments, postTextComments } from '../Network.js';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  openCheckIn,
  closeCheckIn,
  addTextComment,
  updateTextCommentsDB
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
  textCommentsReducer,
  testAudioReducer
}) => ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  testAudioReducer
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
  onCommentSubmit: (comment, latitude, longitude, rating, user_id) => {
    console.log('dispatch onCommentSubmit', comment, latitude, longitude, rating, user_id);
    dispatch(addTextComment(comment, latitude, longitude, rating, user_id));
  },
  updateTextCommentsFromDB: (comments) => {
    dispatch(updateTextCommentsDB(comments));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component {
  componentDidMount () {
    console.log('component did mount')
    getTextComments(comments => this.props.updateTextCommentsFromDB(comments));
  }

  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      toggleCheckIn,
      onCommentSubmit,
      textCommentsReducer,
      testAudioReducer,
      updateTextCommentsFromDB
    } = this.props;

    console.log('Main props: ', this.props);
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Welcome to Momento! {usernameReducer}
        </Text>

        {this.props.textCommentsReducer.map((comment, id) => (
          <Text key={id}>{comment.user_id} : {comment.comment} {comment.latitude} {comment.longitude}</Text>
        ))}

        {testAudioReducer.map((comment, id) => (
          <Text key={id}>{comment.user} : {comment.audioPath}</Text>
        ))}

        <Button onPress={onLogoutClick} title="Logout" />
        <Button onPress={() => { toggleCheckIn(checkInOpenReducer) }} title='Check In' />

        <CheckInFooter 
          visible={checkInOpenReducer}
          //(comment, latitude, longitude, rating, user_id)
          onCommentSubmit={(comment, latitude, longitude, rating) => { 
            postTextComments({comment, latitude, longitude, rating, user_id: 1});
            onCommentSubmit(comment, latitude, longitude, rating, 1) 
          }}
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
