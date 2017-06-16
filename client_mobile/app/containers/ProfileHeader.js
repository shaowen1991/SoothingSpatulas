import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

const mapStateToProps = ({
  userPicReducer
}) => ({
  userPicReducer
});

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
  }

  // call to database w/ userid
  // lastCheckin() {
  //   fetch("http://localhost:3000/api/locationsusers/", {
  //     method: "GET",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'            
  //     }
  //     })
  //   }

  render() {
    const {
      userPicReducer
    } = this.props

    var histArray = this.props.userHist;
    console.log('PROFILE HEADER PROPS', this.props)
    console.log('PROFILE HEADER STATE', this.state)
    console.log('****PROFILE HEADER userHist: ', this.props.userHist)
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
    alignSelf: 'center',
    width: '50%',
    marginTop: 35,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    color: '#9CCC65'
  },
  hometown: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    color: '#9CCC65'
  },
});

export default ProfileHeader;