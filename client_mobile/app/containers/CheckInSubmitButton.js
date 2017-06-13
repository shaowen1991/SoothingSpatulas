import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { postTextComments, postLocation, getLocationId } from '../Network.js';

/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../Constants';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  addTextComment,
  clearNearbyPlace
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  useridReducer,
  myLocationReducer,
  selectedPlaceReducer
}) => ({
  useridReducer,
  myLocationReducer,
  selectedPlaceReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onCommentSubmit: (comment, latitude, longitude, rating, user_id, location_id, name) => {
    dispatch(addTextComment(comment, latitude, longitude, rating, user_id, location_id, name));
  },
  clearNearbyPlace: () => {
    dispatch(clearNearbyPlace());
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class CheckInSubmitButton extends Component {
  constructor(props) {
    super(props);
    this.postTextComment = this.postTextComment.bind(this);
  }

  postTextComment (location_id) {
    const { 
      typeInComment, 
      selectedPlaceReducer, 
      myLocationReducer, 
      rating, 
      useridReducer,
      clearTextAndRating,
      clearSelectedPlace
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
    /* ----------------------------------------------------
    Invoke clearTextAndRating callback after data inserted
    ---------------------------------------------------- */
    .then(() => {clearTextAndRating()})
    .then(() => {clearSelectedPlace()})
    .catch((error) => {console.log(error)});
  }  

  render () {
    const { 
      typeInComment, 
      toggleCheckIn, 
      onCommentSubmit, 
      selectedPlaceReducer, 
      myLocationReducer,
      rating,
      useridReducer,
      clearNearbyPlace,
    } = this.props;

    return (
      <TouchableOpacity
        style={typeInComment.length > 0 ? styles.checkinButton : styles.checkinCanClickButton}
        onPress={() => {
          /* ---------------------------------------------------------
              check in button only available when user has input
          --------------------------------------------------------- */
          if (typeInComment.length > 0) {
            toggleCheckIn();
            /* ----------------------------------------------------
              comment, latitude, longitude, rating, userid, username
                      pass the text commet details here
                    first method is send data to Redux
                      second if-block is send data to DB
            ----------------------------------------------------- */            
            onCommentSubmit(
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
            clearNearbyPlace();
            Keyboard.dismiss();
          }
        }} 
      >
        <Text style={styles.buttonText}>{"Check In"}</Text>
      </TouchableOpacity>
    )
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInSubmitButton);