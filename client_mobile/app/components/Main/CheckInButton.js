import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Button, 
  View, 
  Image,
  Dimensions,
  Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../../Constants';
import AssetMap from '../../config/AssetMap';

/* ----------------------------------
                Class
---------------------------------- */
export default class CheckInButton extends Component {

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    const {toggleCheckIn, checkInOpenReducer} = this.props
    const {height: windowHeight, width: windowWidth} = Dimensions.get('window')

    const gradientStyle = {
      width: windowWidth,
    }
 
    return (
      <Animatable.View style={styles.container}>
        <Image
          style={[styles.gradient, gradientStyle]}
          source={AssetMap.bottom_gradient}
        />
        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => { toggleCheckIn(checkInOpenReducer) }}
          accessibilityLabel="Toggle check in footer"
        >
          <Text style={styles.text}>{"Check In"}</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: "88%",
    left: 30,
    right: 30,
    zIndex: 5,
    backgroundColor: 'transparent',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkinButton: {
    height: "100%",
    width: "70%",
    zIndex: 6,
    padding: 10,
    backgroundColor: Constants.ICON_COLOR,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    alignItems: "center",
  },
  gradient: {
    position: 'absolute',
    top: -40,
    zIndex: 5,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
})