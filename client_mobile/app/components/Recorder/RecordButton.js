import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import Constants from '../../Constants';

export default function RecordButton(props) {
  const { isRecording, isFinishRecorded, onPressInHandler, onPressOutHandler} = props;
  
  let text = 'Press and hold to record';
  if (isRecording) {
    text = 'Recording...';
  } 
  if (isFinishRecorded) {
    text = 'Press and hold to renew';
  }
  
  if (isRecording) {
    console.log('-----> On recording');
    return (
      <TouchableOpacity style={styles.button} onPressOut={onPressOutHandler}>
        <Text style={styles.text}>{ text }</Text>
      </TouchableOpacity>
    );
  } 
  else {
    console.log('-----> Off recording');
    return (
      <TouchableOpacity style={styles.button} onPressIn={onPressInHandler}>
        <Text style={styles.text}>{ text }</Text>
      </TouchableOpacity>
    );
  }
}

RecordButton.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  isFinishRecorded: PropTypes.bool.isRequired,
  onPressInHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 70,
    // top: 1,
    // marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: Constants.CUSTOM_RED,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
  },
  text: {
    fontSize: 12,
    color: '#fff',
  },
});
