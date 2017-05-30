import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Button, AppRegistry, PermissionsAndroid, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import $ from 'jquery';
/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  openCheckIn,
  closeCheckIn,
  addTextComment
} from '../actions.js';

/* ----------------------------------
   Import Presentational Component
---------------------------------- */
import {
  CheckInFooter
} from '../components';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  testCommentsReducer 
}) => ({
  loginReducer,
  usernameReducer,
  checkInOpenReducer,
  testCommentsReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
  },
  toggleCheckIn: (checkInOpenReducer) => {
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
  onCommentSubmit: (user, text) => {
    dispatch(addTextComment(user, text));
  }
});

const myLocationMarkerColor = 'orange';

const defaultProps = {
  enableHack: false,
  geolocationOptions: { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
}

class Main extends Component  {
  constructor (props) {
    super (props);
    this.state = {
      myLocation: {
        latitude: 37.7806579, 
        longitude: -122.4070832,
        latitudeDelta: .005,
        longitudeDelta: .005
      },
      pinCoordinates: {
        coordinates: {
          latitude: 37.7806579, 
          longitude: -122.4070832
        },
        name: "My Location",
        des: "Pin Des"
      },
      placeOne: {
        coordinates: {
          lat: 37.78066, 
          lng: -122.40709
        },
        name: "placeOne",
        des: "PlaceOne Des",
        img: ''
      }, 
      placeTwo: {
        coordinates: {
          lat: 37.78065, 
          lng: -122.40708
        },
        name: "placeTwo",
        des: "PlaceTwo Des",
        img: ''
      },
      placeThree: {
        coordinates: {
          lat: 37.7806579, 
          lng: -122.4070832
        },
        name: "placeThree",
        des: "PlaceThree Des",
        img: ''
      },
      searchTerm: "tourist+attraction"
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.addPOI = this.addPOI.bind(this);
  }

  componentDidMount () {
    this.watchLocation();
    this.addPOI();
  }

  watchLocation () {
    this.watchID - navigator.geolocation.watchPosition((position) => {
      if (!isEqual(this.state.myLocation, position.coords)) {
        this.setState({
          myLocation: position.coords
        })
        this.setState({
          region: {
            latitude: position.coords.lat,
            longitude: position.coords.lng,
            latitudeDelta: .02,
            longitudeDelta: .02
          }
        })
      }
    }, null)
  }

  setProp (key, val) {
    this.setState({
      [key]: val
    })
  }

  onRegionChange (region) {
    this.setState ({myLocation: region })
  }

  onPinDrop () {
    this.setState({
      pinCoordinates: {
        latitude: this.state.myLocation.latitude,
        longitude: this.state.myLocation.longitude
      }
    })
  }

  updateSearchTerm1 (event) {
    // console.log('here', this.state.searchTerm)
    var term = event//.target//.value//.split(' ').join('+');
    // console.log('term', term)
    this.setState({
      searchTerm: term
    })
  }

  updateSearchTerm(e) {
    console.log('state', this.state.searchTerm)
    this.setState({
      searchTerm: e.target.value
    })
  }

  addPOI () {
    var lat = this.state.myLocation.latitude;
    var lng = this.state.myLocation.longitude;
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=200&keyword=${this.state.searchTerm}&key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc`)
    .then((response) => {
        if(response.status == 200) {
          response.text().then((responseText) => {
            var parsedResults = JSON.parse(responseText).results
            console.log('parsedResults', parsedResults)
            var entry1 = parsedResults[1]
            var entry2 = parsedResults[2]
            var entry3 = parsedResults[3]
            this.setState({
              placeOne: {
                coordinates: {
                  latitude: entry1.geometry.location.lat, 
                  longitude: entry1.geometry.location.lng
                },
                name: entry1.name,
                des: `${entry1.name} description`
              }, 
              placeTwo: {
                coordinates: {
                  latitude: entry2.geometry.location.lat,
                  longitude: entry2.geometry.location.lng
                },
                name: entry2.name,
                des: `${entry2.name} description`
              },
              placeThree: {
                coordinates: {
                  latitude: entry3.geometry.location.lat,
                  longitude: entry3.geometry.location.lng
                },
                name: entry3.name,
                des: `${entry3.name} description`
              }
            })
            // console.log(this.state)
          }).catch(function (error) {
            console.log('error', error);
          })
        }
        else throw new Error('Something went wrong on api server!');
    })
    // .then(function(response) {
    //     console.debug(response);
    //     // ...
    // })
    .catch(function(error) {
        console.log('error', error);
    })

    // $.ajax({
    //   type: 'GET',
    //   url: '/coordinates',
    //   contentType: 'application/json',
    //   data: ({lat: this.state.lat, lng: this.state.lng}),
    //   dataType: 'text',
    //   success: (data) => {
    //     var result = JSON.parse(data);
    //     console.log('data: ', data)
    //     this.setState({
    //       data: result
    //     })
    //   },
    //   error: (err) => {
    //     alert('ERROR')
    //     console.log('error is ', err)
    //   }
    // })
  }

  addSearchTerm (event) {
    console.log(this.state.searchTerm)
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      toggleCheckIn,
      onCommentSubmit,
      testCommentsReducer
    } = this.props;
    console.log('Main props: ', this.props);
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.textBox}
        onChange={(event) => {console.log(event.nativeEvent); this.setState({searchTerm:event.nativeEvent.text})}}
        //{onChangeText={this.updateSearchTerm.bind(this)}}
        value={this.state.searchTerm}
        />
        <MapView 
          style={styles.map}
          initialRegion={this.state.myLocation}
          onRegionChange={this.onRegionChange}
          userLocationAnnotationTitle="true"
          key="AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc"
          mapType="standard"
          showsUserLocation="true"
          followsUserLocation="true"
          showsPointsOfInterest="false"
          showCompass="true"
          showsBuildings="true"
          rotateEnabled="false"
          showsTraffic="true"
          loadingEnabled="true"
        >
        <MapView.Marker
          key="1"
          coordinate={this.state.pinCoordinates}
          title={this.state.pinCoordinates.name}
          description={this.state.pinCoordinates.des}
        />
        <MapView.Marker
          key="2"
          coordinate={this.state.placeOne.coordinates}
          title={this.state.placeOne.name}
          description={this.state.placeOne.des}
        />
        <MapView.Marker
          key="3"
          coordinate={this.state.placeTwo.coordinates}
          title={this.state.placeTwo.name}
          description={this.state.placeTwo.des}
        />
        <MapView.Marker
          key="4"
          coordinate={this.state.placeThree.coordinates}
          title={this.state.placeThree.name}
          description={this.state.placeThree.des}
        />
        </MapView>
        <View style={{flex: 1, flexDirection: 'row'}}>  
          <Button 
            style={styles.leftButton}
            onPress={this.addPOI}
            color="#fff"
            title="        Nearby Locations"
            accessibilityLabel="Get nearby locations from a Google API"
          />
          <Button
            style={styles.rightButton}
            onPress={this.onPinDrop.bind(this)}
            title="Check In Here!          "
            color="#fff"
            accessibilityLabel="Drop a pin to show this location, along with a comment and rating, on your profile."
          />
        </View>

        <Text style={styles.welcome}>
          Welcome to Momento! {usernameReducer}
        </Text>

        {testCommentsReducer.map((comment, id) => (
          <Text key={id}>{comment.user} : {comment.text}</Text>
        ))}

        <Button onPress={onLogoutClick} title="Logout" />
        <Button onPress={() => { toggleCheckIn(checkInOpenReducer) }} title='Check In' />

        <CheckInFooter 
          visible={checkInOpenReducer}
          onCommentSubmit={(text) => { onCommentSubmit(usernameReducer, text) }}
          toggleCheckIn={() => { toggleCheckIn(checkInOpenReducer) }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b8e23'
  },
  map: {
    height: "88.22%",
    width: "100%"
  },
  rightButton: {
    flex: 1,
    width: "50%",
    backgroundColor: "#6b8e23"
  },
  leftButton: {
    width: "50%",
    flex: 1,
    backgroundColor: "#6b8e23",
    alignItems: "center",
    margin: "200%"
  },
  textBox: {
    height: "6%", 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: "5%",
    backgroundColor: "#fff"
  }
});