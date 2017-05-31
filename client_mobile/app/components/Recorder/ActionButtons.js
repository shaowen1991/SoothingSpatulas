import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import IconButton from './IconButton';

export default function ActionButtons(props) {
  const {
    isFinishRecorded, 
    isRecording, 
    playStopIcon, 
    playStopHandler, 
  } = props;
  if (isFinishRecorded) {
    return (
      <View style={styles.buttonGroup}>
        <IconButton 
          iconName={playStopIcon}
          onPressHandler={playStopHandler} 
        />
      </View>
    );
  }
  else {
    return <View />;
  }
}

ActionButtons.propTypes = {
  isFinishRecorded: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  playStopIcon: PropTypes.string.isRequired,
  playStopHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
  },
});
