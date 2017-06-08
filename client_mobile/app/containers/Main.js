import React, { Component } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  PermissionsAndroid, 
  Platform, 
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  updateUserid,
  updateUserPic,
  openCheckIn,
  closeCheckIn,
  moveRegion,
  openProfileView,
  closeProfileView,
  updateTextCommentsDB
} from '../Actions.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import Map from './Map';
import CheckInFooter from './CheckInFooter';
import Profile from './Profile';
import SearchMain from './SearchMain';
import { NavigationIcon, BackToMyLocationIcon, CheckInButton, ProfileIcon }  from '../components';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  profileViewOpen,
  textCommentsReducer,
  audioCommentsReducer,
  myLocationReducer,
  regionReducer
}) => ({
  loginReducer,
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  profileViewOpen,
  textCommentsReducer,
  audioCommentsReducer,
  myLocationReducer,
  regionReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
    dispatch(updateUserid(0));
  },
  toggleCheckIn: (checkInOpenReducer) => {
    console.log('checkin hamburger')
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
  backToMyLocation: (latitude, longitude, latitudeDelta, longitudeDelta) => {
    dispatch(moveRegion(latitude, longitude, latitudeDelta, longitudeDelta));
  },
  toggleProfileView: (profileViewOpen) => {
    console.log('profile hamburger')
    console.log('hamburger props: ', this.props)
    console.log('hamburger dispatch:', dispatch)
    console.log('hamburger dispatch:', profileViewOpen)
    if (profileViewOpen) {
      dispatch(closeProfileView());
    }
    else {
      dispatch(openProfileView());
    }
  },
  updateTextCommentsFromDB: (comments) => {
    dispatch(updateTextCommentsDB(comments));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component  {

  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      profileViewOpen,
      toggleCheckIn,
      toggleProfileView,
      textCommentsReducer,
      audioCommentsReducer,
      myLocationReducer,
      backToMyLocation,
      regionReducer
    } = this.props;

    // console.log('Main props: ', this.props);
    // console.log('------> comments: ', this.props.textCommentsReducer)
    return (
      <View style={styles.container}>
        <NavigationIcon 
          icon={checkInOpenReducer ? 'arrowLeft' : 'hamburger'}
          checkInOpenReducer={checkInOpenReducer}
          toggleCheckIn={toggleCheckIn}
        />
        <BackToMyLocationIcon 
          myLocationReducer={myLocationReducer}
          regionReducer={regionReducer}
          backToMyLocation={backToMyLocation}
        <ProfileIcon 
          icon={profileViewOpen ? 'arrow-left' : 'hamburger'}
          profileViewOpen={profileViewOpen}
          onPress={toggleProfileView}
        />
        <SearchMain />
        <Map 
          toggleCheckIn={toggleCheckIn}
          checkInOpenReducer={checkInOpenReducer}
        /> 
        <CheckInButton 
          toggleCheckIn={toggleCheckIn}
          checkInOpenReducer={checkInOpenReducer}
        /> 
        <CheckInFooter />
        <Profile />
        {/*<Button onPress={onLogoutClick} title="Logout" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);