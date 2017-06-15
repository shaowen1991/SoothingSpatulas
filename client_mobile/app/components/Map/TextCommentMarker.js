import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Constants from '../../Constants';
import { getUserById } from '../../Network.js';

class TextCommentMarker extends Component { 
  constructor (props) {
    super (props);
    this.state = {
      photo_small: 'http://sourcebits.wpengine.netdna-cdn.com/wp-content/themes/sb7/images/icons/spinner.png',
    }
  }

  componentDidMount () {
    getUserById(this.props.user_id)
    .then((fetchedUserInfo) => {
      this.setState({ photo_small: fetchedUserInfo.photo_small });
    })
    .catch((error) => {console.log(error)})
  }
  
  render () {
    return (
      <View>
        <View style={styles.circle}>
          <Image
            style={styles.image}
            source={{uri: this.state.photo_small}}
          />
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.ICON_NOT_AVAILABLE_COLOR,
    width: 32,
    height: 32,
    borderRadius: 32/2,
    borderColor: Constants.COMMENT_PIN_COLOR,
    borderWidth: 3,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 28/2,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: Constants.COMMENT_PIN_COLOR,
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: Constants.COMMENT_PIN_COLOR,
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = TextCommentMarker;