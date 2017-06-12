import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Button, 
  View, 
  Image,
  Dimensions,
  Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Constants from '../../Constants';
import { getUserById } from '../../Network.js';

/* ----------------------------------
                Class
---------------------------------- */
export default class TextCommentPin extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      userInfo: {
        first: '',
        last: '',
        id: 0,
        email: ''
      }
    }
  }

  componentDidMount () {
    getUserById(this.props.user_id)
    .then((fetchedUserInfo) => {
      this.setState({ userInfo: fetchedUserInfo });
    })
    .catch((error) => {console.log(error)})
  }

  render() {
    const { user_id, name, comment, rating, latitude, longitude } = this.props;
    let coordinatesString = '';
    if (!name) {
      coordinatesString = 
        'Latitude: ' + 
        JSON.stringify(latitude).substring(0, 10) + 
        ', Longitude: ' + 
        JSON.stringify(longitude).substring(0, 10);
    }
    
    return (
      <Animatable.View style={[styles.container]}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.usernametext}>User: {this.state.userInfo.first || 'id-' + user_id}</Text>
        <Text style={styles.placetext}>Place: {name ? name : coordinatesString}</Text>
        <Text style={styles.rating}>Rating: {rating}</Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  button: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Constants.ICON_COLOR,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    justifyContent: 'center',
  },
  amount: {
    flex: 1,
  },
  placetext: {
    fontSize: 14,
    fontFamily: Constants.TEXT_FONT
  },
  usernametext: {
    fontSize: 14,
    fontFamily: Constants.TEXT_FONT
  },
  rating: {
    fontSize: 14,
    fontFamily: Constants.TEXT_FONT
  },
  comment: {
    fontSize: 16,
    fontWeight: 'bold', 
    fontFamily: Constants.TEXT_FONT
  },
  buttontext: {
    fontSize: 14,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
});
