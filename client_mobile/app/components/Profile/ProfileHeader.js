import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../../Constants.js';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let histArray = this.props.userHist;

    return (
      <View style={styles.profileheader}>
        <View style={styles.header}>
          <Image
            style={styles.picture}
            source={{uri: this.props.userPic}}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{this.props.userName}</Text>
            <Text style={styles.hometown}>{'USA'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ProfileHeader.propTypes = {
  userHist: PropTypes.array
}

const styles = StyleSheet.create({
  profileheader: {
    height: 170,
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
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    height: '90%',
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
    alignSelf: 'center',
    width: '50%',
    marginTop: 35,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontFamily: Constants.TEXT_FONT
  },
  hometown: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
    fontFamily: Constants.TEXT_FONT
  },
});

export default ProfileHeader;