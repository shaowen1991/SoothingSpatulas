import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import Constants from '../../Constants';

/* ----------------------------------
                Class
---------------------------------- */
export default function RecordButton(props) {
  const { isRecording, isFinishRecorded, onPressInHandler, onPressOutHandler, onLoading} = props;
  
  let text = 'Press and hold to record';
  if (isRecording) {
    text = 'Recording...';
  } 
  if (isFinishRecorded) {
    text = 'Press and hold to renew';
  }
  if (onLoading) {
    return (
      <TouchableOpacity style={styles.buttonNotAvailable}>
        <Text style={styles.text}>{ 'Uploading Voice' }</Text>
      </TouchableOpacity>
    );
  }
  else if (isRecording) {
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
  onPressOutHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.COMMENT_PIN_COLOR,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
  },
  buttonNotAvailable: {
    width: "50%",
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.ICON_NOT_AVAILABLE_COLOR,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontFamily: Constants.TEXT_FONT,
  },
});
