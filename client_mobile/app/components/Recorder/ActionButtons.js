import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IconButton from './IconButton';

/* ----------------------------------
                Class
---------------------------------- */
export default function ActionButtons(props) {
  const {
    isFinishRecorded, 
    playStopIcon, 
    playStopHandler,
    onLoading
  } = props;

  if (isFinishRecorded && !onLoading) {
    return (
      <Animatable.View style={styles.playerButton}>
        <IconButton 
          iconName={playStopIcon}
          onPressHandler={playStopHandler} 
        />
      </Animatable.View>
    );
  }
  else {
    return <View style={styles.playerButton}/>;
  }
}

ActionButtons.propTypes = {
  isFinishRecorded: PropTypes.bool.isRequired,
  playStopIcon: PropTypes.string.isRequired,
  playStopHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  playerButton: {
    width: "25%",
  }
});
