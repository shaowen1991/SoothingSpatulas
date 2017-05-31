import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import Constants from '../../Constants';

export default function IconButton(props) {
  const { onPressHandler, iconName } = props;
  
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPressHandler}>
      <Text>{iconName}</Text>
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPressHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  actionBtn: {
    flex: 0.5,
    alignItems: 'center',
  },
});
