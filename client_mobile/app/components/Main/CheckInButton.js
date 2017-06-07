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
import AssetMap from '../../config/AssetMap';

export default class CheckInButton extends Component {

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    const {toggleCheckIn, checkInOpenReducer} = this.props
    const {height: windowHeight, width: windowWidth} = Dimensions.get('window')

    const containerStyle = {
      top: checkInOpenReducer ? windowHeight - 160 : windowHeight + 30,
    }

    const gradientStyle = {
      width: windowWidth,
    }
 
    return (
      <Animatable.View style={[styles.container]}>
        <Image
          style={[styles.gradient, gradientStyle]}
          source={AssetMap.bottom_gradient}
        />
        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => { toggleCheckIn(checkInOpenReducer) }}
          accessibilityLabel="Drop a pin to show this location, along with a comment and rating, on your profile."
        >
          <Text style={styles.text}>{"Check In"}</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // height: "6%",
    position: 'absolute',
    top: "85%",
    left: 30,
    right: 30,
    zIndex: 5,
    backgroundColor: 'transparent',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkinButton: {
    height: "100%",
    width: "50%",
    padding: 10,
    // top: "50%",
    // backgroundColor: 'transparent',
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    zIndex: 6,
    alignItems: "center",
    // backgroundColor: "#6b8e23",
    // flex: 1
  },
  gradient: {
    position: 'absolute',
    // left: -30,
    // right: -30,
    top: -40,
    // bottom: 0,
    // height: "500%",
    // width: "100%",
    zIndex: 5,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
})