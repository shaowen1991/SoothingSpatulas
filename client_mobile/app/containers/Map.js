import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  PermissionsAndroid, 
  Platform, 
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import $ from 'jquery';

import { getTextComments } from '../Network.js';
import Constants from '../Constants';

/* ----------------------------------
         Import Components
---------------------------------- */
import { NearbyPlacesCallout, TextCommentCallout, TextCommentMarker }  from '../components';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateCommentsDB,
  moveRegion,
  moveMyLocation,
  selectPlace,
  clearSelectedPlace,
  startPlaying,  
  stopPlaying,
  addAudioList
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  regionReducer,
  myLocationReducer,
  nearbyPlacesReducer,
  selectedPlaceReducer,
  commentsReducer,
  useridReducer,
  commentsRefreshIndicatorReducer,
  isPlaying,
  audioDownloadedList
}) => ({
  regionReducer,
  myLocationReducer,
  nearbyPlacesReducer,
  selectedPlaceReducer,
  commentsReducer,
  useridReducer,
  commentsRefreshIndicatorReducer,
  isPlaying,
  audioDownloadedList
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
  updateCommentsFromDB: (comments) => {
    dispatch(updateCommentsDB(comments));
  },
  selectPlace: (latitude, longitude, category, name, city, state) => {
    dispatch(selectPlace(latitude, longitude, category, name, city, state));
  },
  clearSelectedPlace: () => {
    dispatch(clearSelectedPlace());
  },
  startPlaying: () => {
    dispatch(startPlaying());
  },  
  stopPlaying: () => {
    dispatch(stopPlaying());
  }, 
  addAudioList: (newAudioFilenane) => {
    dispatch(addAudioList(newAudioFilenane));
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
    getTextComments()
    .then((comments) => {
      this.props.updateCommentsFromDB(comments);
    })
    .catch((error) => {console.log(error)});
  }

  watchLocation () {
    navigator.geolocation.watchPosition((position) => {
      if (!isEqual(this.props.myLocationReducer, position.coords)) {
        // console.log('Move to: ', position.coords);
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
      openCheckIn,
      closeCheckIn,
      onLogoutClick,
      selectPlace,
      myLocationReducer,
      nearbyPlacesReducer,
      selectedPlaceReducer,
      clearSelectedPlace,
      regionReducer,
      commentsReducer,
      useridReducer,
      commentsRefreshIndicatorReducer,
      isPlaying,
      startPlaying,
      stopPlaying,
      audioDownloadedList,
      addAudioList
    } = this.props;
    
    const initialRegion = {
      latitude: 10,
      longitude: 10,
      latitudeDelta: .005,
      longitudeDelta: .005
    }

    // console.log('Map props: ', this.props);
    // console.log('Map state: ', this.state);
          {/*initialRegion={Object.keys(myLocationReducer).length === 0 ? initialRegion : myLocationReducer}*/}
    return (
        <MapView 
          style={styles.map}
          onRegionChange={this.onRegionChange}
          region={Object.keys(regionReducer).length === 0 ? initialRegion : regionReducer}
          userLocationAnnotationTitle="You"
          key="AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc"
          mapType="standard"
          showsUserLocation={true}
          followsUserLocation={true}
          showsPointsOfInterest={false}
          showCompass={true}
          showsBuildings={true}
          rotateEnabled={false}
          showsTraffic={false}
          loadingEnabled={true}
          onPress={Keyboard.dismiss}
        >
          {/*text comments pin*/}
          {useridReducer !== 0 && nearbyPlacesReducer.length === 0 && commentsRefreshIndicatorReducer ?
            commentsReducer.map((comment, key) => (
              <MapView.Marker
                key={key}
                flat={true}
                coordinate={{
                  latitude: JSON.parse(comment.latitude),
                  longitude: JSON.parse(comment.longitude)
                }}
              >
                <TextCommentMarker                 
                  user_id={comment.user_id}
                />
                <MapView.Callout>
                  <TextCommentCallout
                    user_id={comment.user_id}
                    name={comment.name}
                    comment={comment.comment}
                    comment_audio={comment.comment_audio}
                    rating={comment.rating}
                    latitude={JSON.parse(comment.latitude)}
                    longitude={JSON.parse(comment.longitude)}
                    isPlaying={isPlaying}
                    startPlaying={startPlaying}
                    stopPlaying={stopPlaying}
                    audioDownloadedList={audioDownloadedList}
                    addAudioList={addAudioList}
                  />
                </MapView.Callout>
              </MapView.Marker>        
            ))
            :
            null
          }          
          {/* nearby locations */}
          {nearbyPlacesReducer.map((place, key) => (
            <MapView.Marker
              key={key}
              pinColor={Constants.NEARBY_PIN_COLOR}
              coordinate={place.coordinates}
            >
              <MapView.Callout>
                <NearbyPlacesCallout
                  title={place.name}
                  address={place.address}
                  onSelect={() => {
                    // name indicate we have a select place or not
                    if (!selectedPlaceReducer.name) { 
                      selectPlace(
                        place.coordinates.latitude, 
                        place.coordinates.longitude, 
                        place.category, 
                        place.name,
                        // parse the city name from address
                        place.address.split(', ')[1] ? place.address.split(', ')[1] : place.address.split(', ')[0], 
                        ''
                      );
                      openCheckIn();
                    }
                    else {
                      clearSelectedPlace();
                      closeCheckIn();
                    }
                  }}
                  selectedPlaceReducer={selectedPlaceReducer}
                />
              </MapView.Callout>
            </MapView.Marker>        
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);