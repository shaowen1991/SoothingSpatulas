import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import AssetMap from '../../config/AssetMap';

// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

/* ----------------------------------
                Class
---------------------------------- */
export default class BackToMyLocationIcon extends Component {
  render () {
    const { clearNearbyPlace } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={() => {
          clearNearbyPlace();
        }}
      >
        <Image
          style={styles.icon}
          source={AssetMap.clear}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 34,
    right: 62,
    zIndex: 5,
  },
  icon: {
    width: 21,
    height: 21,
  },
})