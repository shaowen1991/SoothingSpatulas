import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button, ScrollView } from 'react-native';
import Friend from './Friend';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [{name: 'Jack', hometown: 'Indiana', url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}, {name: 'Nick', hometown: 'San Francisco, CA', url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}, {name: 'Mike', hometown: 'Oakland, CA', url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}, {name: 'Chris', hometown: 'Boston, MA', url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}, {name: 'Oleg', hometown: 'Russia', url: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}]
    }
  }

  render() {
    return (
      <View style={styles.trends}>
        <Text style={styles.trendsHeader}>Connections</Text>
        <ScrollView>
        {this.state.friends.map((person) => {
          return <Friend 
            name={person.name} 
            hometown={person.hometown} 
            url={person.url}
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
    fontSize: 10,

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

export default FriendList;