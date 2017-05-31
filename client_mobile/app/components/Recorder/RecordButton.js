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
    console.log('-----> Not on recording');
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
    width: 100,
    height: 100,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: Constants.CUSTOM_RED,
    marginBottom: 10,
  },
  text: {
    paddingTop: 5,
    fontSize: 10,
    color: '#bbbbbb',
  },
});
