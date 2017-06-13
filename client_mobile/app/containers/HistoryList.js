import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button, ScrollView } from 'react-native';
import HistoryItem from './HistoryItem';
import PropTypes from 'prop-types';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('HISTORY LIST userHist: ', this.props.userHist)
    return (
      <View>
      <View style={styles.trends}>
        <ScrollView>
        {this.props.userHist.map((place, key) => {
          return (      
            <View style={{backgroundColor: (key % 2 == 0) ? '#ecf0f1' : '#fff', paddingTop: 10, paddingBottom: 10, paddingLeft: 20}}>
              <Text style={styles.name}>- {place.name}</Text>
              <Text style={styles.des}>Rating: {place.rating / 2} Stars</Text>
              <Text style={styles.des}>San Francisco, CA</Text>
              <Text style={styles.des}>Latitude: {place.lat}, Longitude: {place.lng}</Text>
              <Text style={styles.comment}>{place.comment}</Text>
            </View>
          )
        })}
        <Text style={styles.end}> - You have no more check ins - </Text>
        </ScrollView>
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  profileheader: {
    height: 50,
    marginBottom: 20
  },
  headerBar: {
    width: '100%',
    height: 38,
    backgroundColor: '#4527A0',
    marginTop: 25,
    textAlign: 'center'
  },
  appName: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
  header: {
    flexDirection: 'row',
    height: '90%'
  },
  picture: {
    width: 150,
    height: 150,
    margin: 20,
    marginRight: '0%',
    borderRadius: 5
  },
  headerText: {
    flexDirection: 'column',
    textAlign: 'center',
    width: '50%',
    marginTop: 35,
  },
  name: {
    fontSize: 35,
    textAlign: 'center',
    color: '#9CCC65'
  },
  comment: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    color: '#9CCC65',
    fontStyle: 'italic'
  },
  trends: {
    flexDirection: 'column',
<<<<<<< HEAD
    height: '91.75%',
=======
    height: '100%',
>>>>>>> filtering db data by userid correctly
    width: '100%',
    alignContent: 'center',
    fontSize: 10,
    paddingTop: 10
  },
  trendsHeader: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '1%',
<<<<<<< HEAD
    color: '#9CCC65'
  },
  trendsBody: {
    color: '#4527A0',
    fontSize: 10,
    backgroundColor: '#ecf0f1'
=======
    marginTop: '10%'
>>>>>>> filtering db data by userid correctly
  },
  info: {
    flexDirection: 'column',
    marginLeft: '3%',
    marginBottom: '5%',
  },
  name: {
    marginLeft: '3%',
    fontSize: 20,
    color: '#4527A0',
  },
  hometown: {
    marginLeft: 20,
    fontSize: 15,
    color: '#4527A0',
  },
  image: {
    height: 75,
    width: 75
  }, 
  end: {
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
    marginTop: 20
  }
});

export default HistoryList;