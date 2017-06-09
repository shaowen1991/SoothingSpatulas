import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import Constants from '../../Constants';
import AssetMap from '../../config/AssetMap';

/* ----------------------------------
                Class
---------------------------------- */
export default function IconButton(props) {
  const { onPressHandler, iconName } = props;
  
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPressHandler}>
      <Image
        style={styles.icon}
        source={AssetMap[iconName]}
      />
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPressHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  actionBtn: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
