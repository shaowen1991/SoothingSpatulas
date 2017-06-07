import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Button, View } from 'react-native'

export default class CheckInButton extends Component {

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    const {toggleCheckIn, checkInOpenReducer} = this.props
    
    return (
      <View>
        <Button
          style={styles.checkinButton}
          onPress={() => { toggleCheckIn(checkInOpenReducer) }}
          title="Check In"
          color="black"
          accessibilityLabel="Drop a pin to show this location, along with a comment and rating, on your profile."
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 36,
    left: 22,
    zIndex: 10,
  },
  checkinButton: {
    height: "6%",
    top: 120,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    zIndex: 10,
    width: "50%",
    // backgroundColor: "#6b8e23"
    // flex: 1,
  }
})