import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { postTextComments, postLocation, getLocationId, postAudioComments } from '../Network.js';
import AssetMap from '../config/AssetMap'
/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../Constants';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  turnOnComments,
  turnOffComments,
  addComment,
  clearNearbyPlace,
  // Recorder Actions
  startRecording,
  stopRecording, 
  finishRecording,  
  unfinishRecording,  
  startPlaying,  
  stopPlaying, 
  updateAudioCurrentTime,
  updateAudioLength,
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  useridReducer,
  usernameReducer,
  myLocationReducer,
  selectedPlaceReducer,
  audioCurrentFileName,
  isFinishRecorded
}) => ({
  useridReducer,
  usernameReducer,
  myLocationReducer,
  selectedPlaceReducer,
  audioCurrentFileName,
  isFinishRecorded
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  addCommentToState: (comment, latitude, longitude, rating, user_id, location_id, name, comment_audio) => {
    dispatch(addComment(comment, latitude, longitude, rating, user_id, location_id, name, comment_audio));
  },
  refreshComments: () => {
    dispatch(turnOffComments());
    setTimeout(() => {dispatch(turnOnComments())}, 0);
  },
  clearNearbyPlace: () => {
    dispatch(clearNearbyPlace());
  },
  stopRecording: () => {
    dispatch(stopRecording());
  },
  unfinishRecording: () => {
    dispatch(unfinishRecording());
  },  
  stopPlaying: () => {
    dispatch(stopPlaying());
  }, 
  updateAudioCurrentTime: (currentTime) => {
    dispatch(updateAudioCurrentTime(currentTime));
  },
  updateAudioLength: (audioLength) => {
    dispatch(updateAudioLength(audioLength));
  },
});

/* ----------------------------------
                Class
---------------------------------- */
class CheckInSubmitButton extends Component {
  constructor(props) {
    super(props);
    this.postTextComment = this.postTextComment.bind(this);
    this.textCommentOnPress = this.textCommentOnPress.bind(this);
    this.postAudioComment = this.postAudioComment.bind(this);
    this.audioCommentOnPress = this.audioCommentOnPress.bind(this);
  }
  /* ----------------------------------
        Text Comment Methods
  ---------------------------------- */
  postTextComment (location_id) {
    const { 
      // props
      typeInComment, 
      toggleCheckIn,
      rating, 
      useridReducer,
      clearTextAndRating,
      clearSelectedPlace,
      refreshComments,
      // Map Actions
      selectedPlaceReducer, 
      myLocationReducer, 
      clearNearbyPlace,
      stopLoading
    } = this.props;

    postTextComments({
      comment: typeInComment,
      latitude: selectedPlaceReducer.name ? selectedPlaceReducer.latitude : myLocationReducer.latitude, 
      longitude: selectedPlaceReducer.name ? selectedPlaceReducer.longitude : myLocationReducer.longitude,
      rating: rating,
      name: selectedPlaceReducer.name ? selectedPlaceReducer.name : null,
      user_id: useridReducer,
      location_id: location_id
    })
    /* ---------------------------------------------------------
    dummy way to hard-refresh the textComments to avoid layout issue
    --------------------------------------------------------- */
    .then(() => {refreshComments()})
    .then(() => {toggleCheckIn()})
    /* ----------------------------------------------------
    Invoke clearTextAndRating callback after data inserted
    ---------------------------------------------------- */
    .then(() => {clearTextAndRating()})
    .then(() => {clearSelectedPlace()})
    .then(() => {clearNearbyPlace()})
    .then(() => {stopLoading()})
    .then(() => {Keyboard.dismiss()})
    .catch((error) => {console.log(error)});
  }  

  textCommentOnPress () {
    const { 
      // props
      typeInComment, 
      rating,
      useridReducer,
      startLoading,
      // Comments Actions
      addCommentToState, 
      // Map Actions
      selectedPlaceReducer, 
      myLocationReducer,
      clearNearbyPlace,
    } = this.props;
    /* ---------------------------------------------------------
        check in button only available when user has input
    --------------------------------------------------------- */
    if (typeInComment.length > 0) {
      startLoading();
      /* ----------------------------------------------------
        comment, latitude, longitude, rating, userid, username
                pass the text commet details here
              first method is send data to Redux
                second if-block is send data to DB
      ----------------------------------------------------- */            
      addCommentToState(
        typeInComment,
        selectedPlaceReducer.name ? selectedPlaceReducer.latitude : myLocationReducer.latitude, 
        selectedPlaceReducer.name ? selectedPlaceReducer.longitude : myLocationReducer.longitude,
        rating,
        useridReducer,
        null,
        selectedPlaceReducer.name ? selectedPlaceReducer.name : null
      );
      /* ---------------------------------------------------------
        only post new location to db when a location is selected
      --------------------------------------------------------- */
      if (selectedPlaceReducer.name) {
        let newLocation = {
          category: selectedPlaceReducer.category,
          latitude: selectedPlaceReducer.latitude,
          longitude: selectedPlaceReducer.longitude,
          name: selectedPlaceReducer.name,
          city: selectedPlaceReducer.city,
          state: ''
        }
        getLocationId(newLocation.name)
        .then((location_id) => {
          this.postTextComment(location_id);
        })
        .catch((error) => {
          postLocation(newLocation)
          /* ----------------------------------------------------
            In this POST request, send new location info to DB
            and get the location object back from response, 
            which include the locationid
          ---------------------------------------------------- */
          .then((location_id) => {this.postTextComment(location_id)})
          .catch((error) => {console.log(error)})
        })
      }
      /* ---------------------------------------------------------
            if no location selected, post comment directly
      --------------------------------------------------------- */
      else {
        this.postTextComment(null);
      }

    }
  }

  /* ----------------------------------
        Audio Comment Methods
  ---------------------------------- */
  postAudioComment (filepath, filename, location_id) {
    const { 
      // props
      rating, 
      toggleCheckIn,
      toggleTypeOfComment,
      useridReducer,
      clearTextAndRating,
      clearSelectedPlace,
      addCommentToState,
      refreshComments,
      // Map Actions
      selectedPlaceReducer, 
      myLocationReducer, 
      clearNearbyPlace,
      // Recorder Actions
      stopRecording,
      unfinishRecording, 
      stopPlaying,
      updateAudioCurrentTime,
      updateAudioLength,
      stopLoading,
    } = this.props;

    postAudioComments(
      filepath,
      filename,
      {
        latitude: selectedPlaceReducer.name ? selectedPlaceReducer.latitude : myLocationReducer.latitude, 
        longitude: selectedPlaceReducer.name ? selectedPlaceReducer.longitude : myLocationReducer.longitude,
        rating: rating,
        name: selectedPlaceReducer.name ? selectedPlaceReducer.name : null,
        user_id: useridReducer,
        location_id: location_id
      }
    )
    .then((transcription) => {
      console.log('transcription:', transcription);
      /* ----------------------------------------------------
        comment, latitude, longitude, rating, userid, username
                pass the text commet details here
              first method is send data to Redux
                second if-block is send data to DB
      ----------------------------------------------------- */            
      addCommentToState(
        transcription,
        selectedPlaceReducer.name ? selectedPlaceReducer.latitude : myLocationReducer.latitude, 
        selectedPlaceReducer.name ? selectedPlaceReducer.longitude : myLocationReducer.longitude,
        rating,
        useridReducer,
        null,
        selectedPlaceReducer.name ? selectedPlaceReducer.name : null,
        filename
      );
      stopRecording();
      unfinishRecording(); 
      stopPlaying();
      updateAudioCurrentTime(0);
      updateAudioLength(0); 
    })
    /* ---------------------------------------------------------
    dummy way to hard-refresh the textComments to avoid layout issue
    --------------------------------------------------------- */
    .then(() => {refreshComments()})
    /* ----------------------------------------------------
    Invoke clearTextAndRating callback after data inserted
    ---------------------------------------------------- */
    .then(() => {toggleCheckIn()})
    .then(() => {toggleTypeOfComment()})
    .then(() => {stopLoading()})
    .then(() => {clearTextAndRating()})
    .then(() => {clearSelectedPlace()})
    .then(() => {clearNearbyPlace()})
    .catch((error) => {
      console.log('Submit audio error: ', error);
      stopLoading();
    });
  }  

  audioCommentOnPress () {
    const { 
      // props
      toggleCheckIn,
      toggleTypeOfComment,
      usernameReducer,
      clearSelectedPlace,
      startLoading,
      // Recorder Actions
      audioCurrentFileName,
      isFinishRecorded,
      stopRecording,
      unfinishRecording, 
      stopPlaying,
      updateAudioCurrentTime,
      updateAudioLength,
      // Comments Actions
      addCommentToState, 
      // Map Actions
      selectedPlaceReducer, 
      myLocationReducer,
      clearNearbyPlace,
    } = this.props;

    const filepath = Constants.AUDIO_PATH + '/' + audioCurrentFileName;
    /* ---------------------------------------------------------
        check in button only available when user has recorded
    --------------------------------------------------------- */   
    if (isFinishRecorded) {
      startLoading();
      /* ---------------------------------------------------------
        only post new location to db when a location is selected
      --------------------------------------------------------- */
      if (selectedPlaceReducer.name) {
        let newLocation = {
          category: selectedPlaceReducer.category,
          latitude: selectedPlaceReducer.latitude,
          longitude: selectedPlaceReducer.longitude,
          name: selectedPlaceReducer.name,
          city: selectedPlaceReducer.city,
          state: ''
        }
        getLocationId(newLocation.name)
        .then((location_id) => {
          this.postAudioComment(filepath, audioCurrentFileName, location_id);
        })
        .catch((error) => {
          postLocation(newLocation)
          /* ----------------------------------------------------
            In this POST request, send new location info to DB
            and get the location object back from response, 
            which include the locationid
          ---------------------------------------------------- */
          .then((location_id) => {this.postAudioComment(filepath, audioCurrentFileName, location_id)})
          .catch((error) => {console.log(error)})
        })
      }
      /* ---------------------------------------------------------
            if no location selected, post comment directly
      --------------------------------------------------------- */
      else {
        this.postAudioComment(filepath, audioCurrentFileName, null);
      }
    }
  }
  
  render () {
    const { 
      typeInComment, 
      typeOfComment, 
      isFinishRecorded, 
      onLoading, 
      startLoading, 
      stopLoading 
    } = this.props;

    if (typeOfComment === 'Text') {
      return (
        <TouchableOpacity
          style={typeInComment.length > 0 ? styles.checkinButton : styles.checkinCanClickButton}
          onPress={() => {onLoading ? null : this.textCommentOnPress()}}
        >
        { onLoading ? 
          <Image
            style={styles.icon}
            source={AssetMap.spinner}
          />        
          :
          <Text style={styles.buttonText}>{"Check In"}</Text>
        }
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity
          style={isFinishRecorded ? styles.checkinButton : styles.checkinCanClickButton}
          onPress={() => {onLoading ? null : this.audioCommentOnPress()}}
        >
        { onLoading ? 
          <Image
            style={styles.icon}
            source={AssetMap.spinner}
          />        
          :
          <Text style={styles.buttonText}>{"Check In"}</Text>
        }
        </TouchableOpacity>        
      )
    }
  }
}

const styles = StyleSheet.create({
  checkinButton: {
    height: "170%",
    width: "37%",
    zIndex: 6,
    marginRight: "3%",
    backgroundColor: Constants.ICON_COLOR,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
  checkinCanClickButton: {
    height: "170%",
    width: "37%",
    zIndex: 6,
    marginRight: "3%",
    backgroundColor: Constants.ICON_NOT_AVAILABLE_COLOR,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
  icon: {
    width: 21,
    height: 21,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInSubmitButton);