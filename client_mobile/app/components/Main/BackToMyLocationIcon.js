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
    const { myLocationReducer, regionReducer, backToMyLocation } = this.props;
    
    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={() => {
          backToMyLocation(
            myLocationReducer.latitude,
            myLocationReducer.longitude,
            regionReducer.latitudeDelta,
            regionReducer.longitudeDelta
          )}}
      >
        <Image
          style={styles.icon}
          source={AssetMap.mapMarker}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 36,
    right: 22,
    zIndex: 5,
  },
  icon: {
    width: 21,
    height: 21,
  },
})