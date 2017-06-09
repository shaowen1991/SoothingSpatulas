import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button, ScrollView } from 'react-native';
import HistoryItem from './HistoryItem';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [{place: 'Chipotle', city: 'San Francisco', state: 'CA', lat: 37, lng: -122, rating: 3, comment: 'Great place'}, {place: 'Hack Reactor', city: 'San Francisco', state: 'CA', lat: 37.1, lng: -122.3, rating: 5, comment: 'Mucho learning goin on here!'}, {place: 'Home', city: 'Boston', state: 'MA', lat: 42, lng: -71, rating: 5, comment: 'homie!'}, {place: 'Subway', city: 'San Francisco', state: 'CA', lat: 37, lng: -122, rating: 3, comment: 'Pretty good'},{place: 'That Mall Sandwich Place', city: 'San Francisco', state: 'CA', lat: 37, lng: -122, rating: 3, comment: 'Gotta love half off sandwiches'}
      ]
    }
  }

  render() {
    return (
      <View style={styles.trends}>
        <Text style={styles.trendsHeader}>Recent Check-Ins</Text>
        <ScrollView>
        {this.state.pins.map((pin) => {
          return <HistoryItem 
            place={pin.place}
            city={pin.city}
            state={pin.state}
            lat={pin.lat}
            lng={pin.lng}
            rating={pin.rating}
            comment={pin.comment}
            />
        })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  trends: {
    flexDirection: 'column',
    height: '65%',
    width: '100%',
    alignContent: 'center',
    fontSize: 10
  },
  trendsHeader: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '1%'
  },
  graph: {
    flexDirection: 'column',
    height: '50%',
    width: '100%',
    alignContent: 'center'
  },
  image: {
    width: '90%',
    height: '100%',
    marginLeft: '5%',
  },
  graphCaption: {
    height: '10%',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default HistoryList;