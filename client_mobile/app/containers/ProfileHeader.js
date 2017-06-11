import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
import { connect } from 'react-redux';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

const mapStateToProps = ({
  userPicReducer
}) => ({
  userPicReducer
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      userPicReducer
    } = this.props
    var histArray = this.props.userHist;
    console.log('PROFILE HEADER PROPS', this.props)
    console.log('PROFILE HEADER STATE', this.state)
    console.log('****PROFILE HEADER item 0 name: ', this.props.userHist)
    return (
      <View style={styles.profileheader}>
        <View style={styles.placehold}>
          <Text style={styles.appName}>Momento</Text>
        </View>
        <View style={styles.header}>
          <Image
            style={styles.picture}
            source={{uri: this.props.userPic}}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{this.props.userName}</Text>
            <Text style={styles.hometown}>{}</Text>
            <Text style={styles.lastVisit}>
              Last checked in at {}, 
              rated it {} stars, 
              and commented, "{}"
            </Text>
            <Text style={styles.lastVisitDate}>on {}</Text>
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
    textAlign: 'right'
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