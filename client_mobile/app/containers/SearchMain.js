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
  addNearbyPlace: (latitude, longitude, name, address, img, category) => {
    dispatch(addNearbyPlace(latitude, longitude, name, address, img, category));
  },
  clearNearbyPlace: () => {
    dispatch(clearNearbyPlace());
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class SearchMain extends Component  {
  constructor (props) {
    super (props);
    this.state = {
      searchTerm: '',
      onLoading: false
    };
    this.addPOI = this.addPOI.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.stopLoading = this.stopLoading.bind(this);    
  }

  addPOI () {
    this.startLoading();
    var lat = this.props.myLocationReducer.latitude;
    var lng = this.props.myLocationReducer.longitude;
    this.props.clearNearbyPlace();
    getNearbyPlaces(this.state.searchTerm, lat, lng)
    .then((places) => {
      places.forEach(place => this.props.addNearbyPlace(
        place.geometry.location.lat,
        place.geometry.location.lng,
        place.name,
        place.vicinity,
        '',
        place.types
      ))
      this.stopLoading();
    })
    .catch(error => {
      console.log(error);
      this.stopLoading();
    });
  }

  startLoading () {
    this.setState({ onLoading: true });
  }

  stopLoading () {
    this.setState({ onLoading: false});
  }

  render () {
    const {
      onLogoutClick,
      toggleCheckIn,
      checkInOpenReducer,
      myLocationReducer,
      closeCheckIn
    } = this.props;
    
    const initialRegion = {
      latitude: 10,
      longitude: 10,
      latitudeDelta: .005,
      longitudeDelta: .005
    }

    // console.log('SearchMain props: ', this.props);
    // console.log('SearchMain state: ', this.state);
    return (
      <Animatable.View style={styles.container}>
        <TextInput
          style={styles.textBox}
          ref={component => this._textInput = component}
          onChangeText={(searchTerm) => {this.setState({searchTerm})}}
          placeholder={'Search nearby locations'}
          placeholderTextColor={Constants.PLACEHOLDER_COLOR}
          autoCapitalize={'none'}
          autoCorrect={false}
          onFocus={closeCheckIn}
          returnKeyType={'search'}
          clearButtonMode={'always'}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={this.addPOI}
        />
 
        <TouchableOpacity 
          style={this.state.onLoading ? styles.searchButtonNotAvailable : styles.searchButton}
          onPress={this.state.onLoading ? null : this.addPOI}
          accessibilityLabel="Get nearby locations from a Google API"
        > 
          <Image
            style={styles.image}
            source={this.state.onLoading ? AssetMap.spinner : AssetMap.search}
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
    top: 90,
    left: 22,
    right: 22,
    zIndex: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,  
  },
  searchButton: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: Constants.ICON_COLOR,
  },
  searchButtonNotAvailable: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: Constants.ICON_NOT_AVAILABLE_COLOR,
  },
  textBox: {
    width: "80%",
    height: "100%",
    padding: 10,
    backgroundColor: "#fff",
    fontFamily: Constants.TEXT_FONT,
  },
  image: {
    width: 21,
    height: 21,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMain);