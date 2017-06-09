import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  PermissionsAndroid, 
  Platform, 
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import $ from 'jquery';

import { getTextComments } from '../Network.js';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateTextCommentsDB,
  moveRegion,
  moveMyLocation,
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  regionReducer,
  myLocationReducer,
  pinCoordinatesReducer,
  nearbyPlacesReducer
}) => ({
  regionReducer,
  myLocationReducer,
  pinCoordinatesReducer,
  nearbyPlacesReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  moveRegion: (latitude, longitude, latitudeDelta, longitudeDelta) => {
    dispatch(moveRegion(latitude, longitude, latitudeDelta, longitudeDelta));
  },
  moveMyLocation: (latitude, longitude, latitudeDelta, longitudeDelta) => {
    dispatch(moveMyLocation(latitude, longitude, latitudeDelta, longitudeDelta));
  },
  updateTextCommentsFromDB: (comments) => {
    dispatch(updateTextCommentsDB(comments));
  }
});
/* ----------------------------------
            Other Props
---------------------------------- */
const myLocationMarkerColor = 'orange';

const defaultProps = {
  enableHack: false,
  geolocationOptions: { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
}

/* ----------------------------------
                Class
---------------------------------- */
class Map extends Component  {
  constructor (props) {
    super (props);
    this.state = {
      searchTerm: ''
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount () {
    this.watchLocation();
    getTextComments(comments => this.props.updateTextCommentsFromDB(comments));
  }

  watchLocation () {
    navigator.geolocation.watchPosition((position) => {
      if (!isEqual(this.props.myLocationReducer, position.coords)) {
        console.log('move',position.coords);
        this.props.moveMyLocation(
          position.coords.latitude,
          position.coords.longitude,
          .05,
          .05
        )
      }
    }, null)
  }

  onRegionChange (region) {
    this.props.moveRegion(
      region.latitude,
      region.longitude,
      region.latitudeDelta,
      region.longitudeDelta
    );
  }

  render() {
    const {
      onLogoutClick,
      myLocationReducer,
      pinCoordinatesReducer,
      nearbyPlacesReducer
    } = this.props;
    
    const initialRegion = {
      latitude: 10,
      longitude: 10,
      latitudeDelta: .005,
      longitudeDelta: .005
    }

    // console.log('Map props: ', this.props);
    // console.log('Map state: ', this.state);
    return (
        <MapView 
          style={styles.map}
          initialRegion={Object.keys(myLocationReducer).length === 0 ? initialRegion : myLocationReducer}
          onRegionChange={this.onRegionChange}
          userLocationAnnotationTitle="You"
          key="AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc"
          mapType="standard"
          showsUserLocation={true}
          followsUserLocation={true}
          showsPointsOfInterest={false}
          showCompass={true}
          showsBuildings={true}
          rotateEnabled={false}
          showsTraffic={true}
          loadingEnabled={true}
          showMyLocationButton={true}
        >
          {/* user pin drop */}
          {(Object.keys(pinCoordinatesReducer)).length > 0 ?
            <MapView.Marker
              key="1"
              coordinate={pinCoordinatesReducer.coordinates}
              title={pinCoordinatesReducer.name}
              description={pinCoordinatesReducer.des}
            />    
            :
            null
          }
          {/* nearby locations */}
          {nearbyPlacesReducer.map((place, key) => (
            <MapView.Marker
              key={key}
              coordinate={place.coordinates}
              title={place.name}
              description={place.des}
            />          
          ))}
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: "94%",
    width: "100%",
    zIndex: -1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);