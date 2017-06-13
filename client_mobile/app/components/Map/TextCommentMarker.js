import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Constants from '../../Constants';

class TextCommentMarker extends Component {
  render () {
    const { user_id } = this.props;
    return (
      <View>
        <View style={styles.circle}>
          <Image
            style={styles.image}
            source={{uri: 'https://cdn-images-1.medium.com/fit/c/36/36/1*N1v5rIR69gke7ZqC-C9cQg.png'}}
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