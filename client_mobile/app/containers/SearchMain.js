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
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=200&keyword=${this.state.searchTerm}&key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc`)
    .then((response) => {
      if(response.status === 200) {
        response
        .text()
        .then((responseText) => {
          var parsedResults = JSON.parse(responseText).results
          console.log('parsedResults: ', parsedResults)
          
          for (let entry of parsedResults) {
            this.props.addNearbyPlace(
              entry.geometry.location.lat,
              entry.geometry.location.lng,
              entry.name,
              `${entry.name} description`,
              ''
            )
          }
        })
        .catch(function (error) {
          console.log('addPOI error: ', error);
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

  render() {
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