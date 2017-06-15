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
import RNFetchBlob from 'react-native-fetch-blob';
/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../Constants';

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
  updateAudioList
} from '../Actions.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import Map from './Map';
import CheckInFooter from './CheckInFooter';
import Profile from './Profile';
import SearchMain from './SearchMain';
import { BackToMyLocationIcon, CheckInButton, ProfileIcon }  from '../components';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  useridReducer,
  userPicReducer,
  checkInOpenReducer,
  profileViewOpen,
  myLocationReducer,
  regionReducer,
  audioDownloadedList
}) => ({
  loginReducer,
  usernameReducer,
  useridReducer,
  userPicReducer,
  checkInOpenReducer,
  profileViewOpen,
  myLocationReducer,
  regionReducer,
  audioDownloadedList
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
    dispatch(updateUserid(0));
    dispatch(updateUserPic(''));
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
  openCheckIn: () => {
    dispatch(openCheckIn());
  },
  closeCheckIn: () => {
    dispatch(closeCheckIn());
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
  updateAudioList: (audioDownloadedList) => {
    dispatch(updateAudioList(audioDownloadedList));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component  {
  componentDidMount() {
    // Once the Main component is mounted, updateing the audioList in Redux
    RNFetchBlob.fs.ls(Constants.AUDIO_PATH)
    .then((files) => {
      console.log('Updating audio file list');
      this.props.updateAudioList(files);
    })
  }

  render() {
    const {
      usernameReducer,
      userPicReducer,
      onLogoutClick,
      checkInOpenReducer,
      profileViewOpen,
      toggleCheckIn,
      openCheckIn,
      closeCheckIn,
      toggleProfileView,
      myLocationReducer,
      backToMyLocation,
      regionReducer
    } = this.props;

    // console.log('Main props: ', this.props);
    return (
      <View style={styles.container}>
        <ProfileIcon 
          icon={profileViewOpen ? 'arrowLeft' : 'hamburger'}
          profileViewOpen={profileViewOpen}
          onPress={toggleProfileView}
        />
        <BackToMyLocationIcon 
          myLocationReducer={myLocationReducer}
          regionReducer={regionReducer}
          backToMyLocation={backToMyLocation}
        />
        <SearchMain 
          closeCheckIn={closeCheckIn}
        />
        <Map 
          openCheckIn={openCheckIn}
          closeCheckIn={closeCheckIn}
        /> 
        <CheckInButton 
          toggleCheckIn={toggleCheckIn}
          checkInOpenReducer={checkInOpenReducer}
        /> 
        <CheckInFooter />
        <Profile 
          userPic={this.props.userPicReducer}
          userName={this.props.usernameReducer}
        />
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