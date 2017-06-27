import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image, Keyboard } from 'react-native'

import AssetMap from '../../config/AssetMap'

const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class ProfileIcon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    const {onPress, icon, profileViewOpen, closeCheckIn} = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={() => {
          onPress(profileViewOpen);
          Keyboard.dismiss();
          closeCheckIn();
        }}
      >
        <Image
          style={styles.icon}
          source={AssetMap[icon]}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 34,
    left: 21,
    zIndex: 10,
  },
  icon: {
    width: 21,
    height: 21,
  },
})