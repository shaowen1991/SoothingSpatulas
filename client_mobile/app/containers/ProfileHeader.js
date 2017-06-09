import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'trends',
      user: {
        name: 'Barry O',
        hometown: 'Washington, D.C.',
        url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg',
        lastVisited: {
          name: 'The White House',
          rating: 5,
          comment: 'The bathrooms were yuuuuuuuggggeeee',
          date: 'January 19, 2017'
        }
      }
    }
  }
  render() {
    return (
      <View style={styles.profileheader}>
        <View style={styles.placehold}>
          <Text style={styles.appName}>Momento</Text>
        </View>
        <View style={styles.header}>
          <Image
            style={styles.picture}
            source={{uri: this.state.user.url}}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.hometown}>{this.state.user.hometown}</Text>
            <Text style={styles.lastVisit}>Last checked in at {this.state.user.lastVisited.name}, rated it {this.state.user.lastVisited.rating} stars, and commented, "{this.state.user.lastVisited.comment}"</Text>
            <Text style={styles.lastVisitDate}>on {this.state.user.lastVisited.date}</Text>
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  profileheader: {
    height: '30%',
    marginBottom: '3%'
  },
  picture: {
    width: '40%',
    height: '80%',
    marginTop: '5%',
    marginLeft: '5%',
    borderRadius: 10
  },
  headerText: {
    flexDirection: 'column',
    width: '50%',
    marginTop: '1%',
  },
  name: {
    fontSize: 40,
    textAlign: 'center',
  },
  hometown: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 7
  },
  lastVisit: {
    fontSize: 12, 
    marginBottom: '1%',
    textAlign: 'center',
  },
  lastVisitDate: {
    color: 'grey',
    fontSize: 10,
    textAlign: 'center',
  },
  placehold: {
    width: '100%',
    height: 25,
    backgroundColor: 'grey',
    marginTop: 20,
    flexDirection: 'row'
  },
  appName: {
    fontSize: 20,
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row'
  },
  graph: {
    width: '90%',
    height: '90%',
    marginLeft: '5%',
  }
});

export default Profile;