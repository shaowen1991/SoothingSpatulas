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
import Constants from '../../Constants';

/* ----------------------------------
                Class
---------------------------------- */
export default class NearbyPlacesCallout extends React.Component {

  render() {
    const { title, address, onSelect, checkInOpenReducer } = this.props;

    return (
      <Animatable.View style={[styles.container]}>
        <Text style={styles.titletext}>{title}</Text>
        <Text style={styles.destext}>{address}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onSelect}
        >
          <Text style={styles.buttontext}>
            {checkInOpenReducer ? 'Cancel' : 'Check In Here'}
          </Text>
        </TouchableOpacity>    
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  button: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Constants.ICON_GREY_COLOR,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    justifyContent: 'center',
  },
  amount: {
    flex: 1,
  },
  titletext: {
    fontSize: 16,
    fontWeight: 'bold', 
  },
  destext: {
    fontSize: 14,
  },
  buttontext: {
    fontSize: 14,
    color: 'white',
  },
});