import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { getNearbyPlaces } from '../Network.js';

/* ----------------------------------
      Import Constants and Asset
---------------------------------- */
import Constants from '../Constants';
import AssetMap from '../config/AssetMap';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  addNearbyPlace,
  clearNearbyPlace
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  myLocationReducer
}) => ({
  myLocationReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  addNearbyPlace: (latitude, longitude, name, des, img) => {
    dispatch(addNearbyPlace(latitude, longitude, name, des, img));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class SearchMain extends Component  {
  constructor (props) {
    super (props);
    this.state = {
      searchTerm: ''
    };
    this.addPOI = this.addPOI.bind(this);
  }

  addPOI () {
    var lat = this.props.myLocationReducer.latitude;
    var lng = this.props.myLocationReducer.longitude;
    getNearbyPlaces(this.state.searchTerm, lat, lng,
     (latitude, longitude, name, des, img) => {
      this.props.addNearbyPlace(latitude, longitude, name, des, img);
     });
  }

  render () {
    const {
      onLogoutClick,
      toggleCheckIn,
      checkInOpenReducer,
      myLocationReducer,
    } = this.props;
    
    const initialRegion = {
      latitude: 10,
      longitude: 10,
      latitudeDelta: .005,
      longitudeDelta: .005
    }

    console.log('SearchMain props: ', this.props);
    console.log('SearchMain state: ', this.state);
    return (
      <Animatable.View style={styles.container}>
        <TextInput
          style={styles.textBox}
          ref={component => this._textInput = component}
          onChangeText={(searchTerm) => {this.setState({searchTerm})}}
          placeholder={'Search nearby locations'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
 
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={this.addPOI}
          accessibilityLabel="Get nearby locations from a Google API"
        >
          <Image
            style={styles.image}
            source={AssetMap.search}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 70,
    left: 22,
    right: 22,
    zIndex: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,  
  },
  searchButton: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: Constants.ICON_GREY_COLOR,
  },
  textBox: {
    width: "80%",
    height: "100%",
    padding: 10,
    backgroundColor: "#fff"
  },
  image: {
    width: 21,
    height: 21,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMain);