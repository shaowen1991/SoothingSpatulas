import React, { Component } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  PermissionsAndroid, 
  Platform, 
  TextInput 
} from 'react-native';
import { connect } from 'react-redux';

import { getTextComments } from '../Network.js';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  openCheckIn,
  closeCheckIn,
  updateTextCommentsDB
} from '../Actions.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import CheckInFooter from './CheckInFooter';
import Map from './Map';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
}) => ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
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
  updateTextCommentsFromDB: (comments) => {
    dispatch(updateTextCommentsDB(comments));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component  {

  componentDidMount () {
    getTextComments(comments => this.props.updateTextCommentsFromDB(comments));
  }

  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      toggleCheckIn,
      textCommentsReducer,
      audioCommentsReducer,
      updateTextCommentsFromDB
    } = this.props;

    console.log('Main props: ', this.props);
    console.log('------> comments: ', this.props.textCommentsReducer)
    return (
      <View style={styles.container}>
        <Map />  
        {/*{this.props.textCommentsReducer.map((comment, id) => (
          <Text key={id}>{comment.user_id} : {comment.comment} {comment.latitude} {comment.longitude}</Text>
        ))}

        {audioCommentsReducer.map((comment, id) => (
          <Text key={id}>{comment.user} : {comment.audioPath}</Text>
        ))}*/}

        {/*<Button onPress={onLogoutClick} title="Logout" />
        <Button onPress={() => { toggleCheckIn(checkInOpenReducer) }} title='Check In' />*/}

        {/*<CheckInFooter onPinDrop={this.onPinDrop.bind(this)}/>*/}
        <CheckInFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:  "100%",
    backgroundColor: 'grey'
  },
  map: {
    height: "85.22%",
    width: "100%"
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  rightButton: {
    flex: 1,
    width: "50%",
    // backgroundColor: "#6b8e23"
  },
  leftButton: {
    padding: "20%",
    width: "50%",
    flex: 1,
    // backgroundColor: "#6b8e23",
    alignItems: "center",
    margin: "200%"
  },
  textBox: {
    height: "6%", 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: "5%",
    backgroundColor: "#fff"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);