import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button, ScrollView } from 'react-native';
import HistoryItem from './HistoryItem';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.trends}>
        <Text style={styles.trendsHeader}>Recent Check-Ins</Text>
        <ScrollView>
        {this.props.userHist.map((place, key) => {
          return <HistoryItem 
            key={key}
            place={place.name}
            city={place.city}
            state={place.state}
            lat={place.lat}
            lng={place.lng}
            rating={place.rating}
            comment={place.comment}
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