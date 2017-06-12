import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image,
  Keyboard,
  Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import { postTextComments, postLocation, getLocationId } from '../Network.js';
import Recorder from './Recorder.js';
import AssetMap from '../config/AssetMap';

const transitionProps = ['top', 'height', 'width'];
/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../Constants';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  openCheckIn,
  closeCheckIn,
  addTextComment,
  dropCheckInPin,
  clearSelectedPlace,
  clearNearbyPlace
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer,
  pinCoordinatesReducer,
  myLocationReducer,
  selectedPlaceReducer
}) => ({
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer,
  pinCoordinatesReducer,
  myLocationReducer,
  selectedPlaceReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  toggleCheckIn: (checkInOpenReducer) => {
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
  dropCheckInPin: (latitude, longitude, name, des) => {
    dispatch(dropCheckInPin(latitude, longitude, name, des));
  },
  onCommentSubmit: (comment, latitude, longitude, rating, user_id, location_id, name) => {
    dispatch(addTextComment(comment, latitude, longitude, rating, user_id, location_id, name));
  },
  clearSelectedPlace: () => {
    dispatch(clearSelectedPlace());
  },
  clearNearbyPlace: () => {
    dispatch(clearNearbyPlace());
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class CheckInFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeInComment: '',
      rating: 0,
      typeOfComment: 'Text',
      keyboardHeight: 0
    }
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.clearText = this.clearText.bind(this);
    // this.onPinDrop = this.onPinDrop.bind(this);
    this.setRating = this.setRating.bind(this);
    this.clearTextAndRating = this.clearTextAndRating.bind(this);
    this.toggleTypeOfComment = this.toggleTypeOfComment.bind(this);
    this.postTextComment = this.postTextComment.bind(this);
  }
  /* ----------------------------------------------------
                Handle keyboard pop up
  ---------------------------------------------------- */
  componentWillMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow (event) {
    this.setState({
      keyboardHeight: event.endCoordinates.height
    })
  }

  _keyboardWillHide (event) {
    this.setState({
      keyboardHeight: 0
    })
  }

  clearText () {
    this._textInput.setNativeProps({text: ''});
    this.setState({ typeInComment: '' });
  }

  setRating (rate) {
    this.setState({ rating: rate });
  }

  clearTextAndRating () {
    this.clearText();
    this.setRating(0);
  }

  toggleTypeOfComment () {
    if (this.state.typeOfComment === 'Text') {
      this.setState({ typeOfComment: 'Voice'});
    }
    else {
      this.setState({ typeOfComment: 'Text'});     
    }
  }

  // onPinDrop (username, comment) {
  //   this.props.dropCheckInPin(
  //     this.props.selectedPlaceReducer.name ? this.props.selectedPlaceReducer.latitude : this.props.myLocationReducer.latitude, 
  //     this.props.selectedPlaceReducer.name ? this.props.selectedPlaceReducer.longitude : this.props.myLocationReducer.longitude,
  //     username,
  //     comment
  //   )
  // }

  postTextComment (location_id) {
    postTextComments({
      comment: this.state.typeInComment,
      latitude: this.props.selectedPlaceReducer.name ? this.props.selectedPlaceReducer.latitude : this.props.myLocationReducer.latitude, 
      longitude: this.props.selectedPlaceReducer.name ? this.props.selectedPlaceReducer.longitude : this.props.myLocationReducer.longitude,
      rating: this.state.rating,
      name: this.props.selectedPlaceReducer.name ? this.props.selectedPlaceReducer.name : null,
      user_id: this.props.useridReducer,
      location_id: location_id
    })
    /* ----------------------------------------------------
    Invoke clearTextAndRating callback after data inserted
    ---------------------------------------------------- */
    .then(() => {this.clearTextAndRating()})
    .then(() => {this.props.clearSelectedPlace()})
    .catch((error) => {console.log(error)});
  }

  render() {
    const {
      checkInOpenReducer, 
      toggleCheckIn, 
      onCommentSubmit, 
      myLocationReducer, 
      usernameReducer,
      useridReducer,
      selectedPlaceReducer,
      clearSelectedPlace,
      clearNearbyPlace
    } = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      top: checkInOpenReducer ? windowHeight - 270 - this.state.keyboardHeight : windowHeight,
      height: windowHeight,
      width: windowWidth,
    }
    const starsDisplay = {
      first: this.state.rating >= 1 ? 'starFull' : 'starEmpty',
      second: this.state.rating >= 2 ? 'starFull' : 'starEmpty',
      third: this.state.rating >= 3 ? 'starFull' : 'starEmpty',
      forth: this.state.rating >= 4 ? 'starFull' : 'starEmpty',
      fifth: this.state.rating === 5 ? 'starFull' : 'starEmpty'
    }

    let coordinatesString = '';
    if (Object.keys(myLocationReducer).length !== 0) {
      coordinatesString = 
        'Latitude: ' + 
        JSON.stringify(myLocationReducer.latitude).substring(0, 10) + 
        ', Longitude: ' + 
        JSON.stringify(myLocationReducer.longitude).substring(0, 10);
    }

    // console.log('CheckInFooter props: ', this.props);
    // console.log('CheckInFooter states: ', this.state);
    return (
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out"}
        transition={transitionProps}
      >
        {/* ---------------------------------
          Header that include text and stars
        ---------------------------------- */}
        <Animatable.View style={styles.titleHeader}>
          <Animatable.View style={styles.headerText}>
            <Animatable.Text style={styles.titletext}>
              {'How is this place?'}
            </Animatable.Text>
            <Animatable.Text style={styles.addresstext}>
              {selectedPlaceReducer.name ? selectedPlaceReducer.name : coordinatesString}
            </Animatable.Text>
          </Animatable.View>
        </Animatable.View>
        {/* ---------------------------------
                        Stars
        ---------------------------------- */}   
        <Animatable.View style={styles.ratingHeader}>       
          <TouchableOpacity 
            style={styles.starContainer}
            onPress={() => {this.setRating(1)}}
          >
            <Image
              style={styles[starsDisplay.first]}
              source={AssetMap[starsDisplay.first]}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.starContainer}
            onPress={() => {this.setRating(2)}}
          >
            <Image
              style={styles[starsDisplay.second]}
              source={AssetMap[starsDisplay.second]}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.starContainer}
            onPress={() => {this.setRating(3)}}
          >
            <Image
              style={styles[starsDisplay.third]}
              source={AssetMap[starsDisplay.third]}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.starContainer}
            onPress={() => {this.setRating(4)}}
          >
            <Image
              style={styles[starsDisplay.forth]}
              source={AssetMap[starsDisplay.forth]}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.starContainer}
            onPress={() => {this.setRating(5)}}
          >
            <Image
              style={styles[starsDisplay.fifth]}
              source={AssetMap[starsDisplay.fifth]}
            />
          </TouchableOpacity>
        </Animatable.View>
        {/* ---------------------------------
              Text Comments Input Box
              or Audio Comments Box
        ---------------------------------- */}
        {this.state.typeOfComment === 'Text' ? 
          <TextInput
            style={styles.inputbox}
            ref={component => this._textInput = component}
            onChangeText={(typeInComment) => {this.setState({typeInComment})}}
            placeholder={'Please write your comments'}
            placeholderTextColor={Constants.PLACEHOLDER_COLOR}
            multiline={true}
            maxLength={200}
            numberOfLines={4}
            clearButtonMode={'always'}
          />
          :
          <Recorder />  
        }
        {/* ---------------------------------
                      Buttons
        ---------------------------------- */} 
        <Animatable.View style={styles.buttons}>
          {/* ---------------------------------
                       Back Button
          ---------------------------------- */} 
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              toggleCheckIn(checkInOpenReducer);
              Keyboard.dismiss();
              if (this.state.typeOfComment === 'Text') this.clearText();
              this.setRating(0);
              clearSelectedPlace();
            }}
          >
            <Text style={styles.buttontext}>{"Back"}</Text>
          </TouchableOpacity>
          {/* ---------------------------------
                 Switch Recorder Buttons
          ---------------------------------- */} 
          <TouchableOpacity
            style={styles.checkinbutton}
            onPress={() => {
              if (this.state.typeOfComment === 'Text') this.clearText();
              this.toggleTypeOfComment();
              Keyboard.dismiss();
            }}
          >
            <Text style={styles.buttontext}>
              {this.state.typeOfComment === 'Text' ? "Voice Check In" : "Text Check In"}
            </Text>
          </TouchableOpacity>
          {/* ---------------------------------
                    CheckIn Buttons
          ---------------------------------- */} 
          <TouchableOpacity
            style={this.state.typeInComment.length > 0 ? styles.checkinbutton : styles.checkinCanClickbutton}
            onPress={() => {
              /* ---------------------------------------------------------
                  check in button only available when user has input
              --------------------------------------------------------- */
              if (this.state.typeInComment.length > 0) {
                toggleCheckIn(checkInOpenReducer);
                /* ----------------------------------------------------
                  comment, latitude, longitude, rating, userid, username
                          pass the text commet details here
                        first method is send data to Redux
                          second if-block is send data to DB
                ----------------------------------------------------- */            
                onCommentSubmit(
                  this.state.typeInComment,
                  selectedPlaceReducer.name ? selectedPlaceReducer.latitude : myLocationReducer.latitude, 
                  selectedPlaceReducer.name ? selectedPlaceReducer.longitude : myLocationReducer.longitude,
                  this.state.rating,
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
                {/*this.onPinDrop(usernameReducer, this.state.typeInComment);*/}
                clearNearbyPlace();
                Keyboard.dismiss();
              }
            }} 
          >
            <Text style={styles.buttontext}>{"Check In"}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: Constants.BACK_GROUND_GREY,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
  },
  inputbox: {
    position: 'absolute',
    left: 22,
    right: 22,
    top: 100,
    height: 100,
    zIndex: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
    fontFamily: Constants.TEXT_FONT,
  },
  buttons: {
    position: 'absolute',
    top: 220,
    left: 22,
    right: 22,
    flexDirection: 'row',
    alignItems: "center",
  },
  backbutton: {
    // flex: 1,
    height: "170%",
    width: "20%",
    zIndex: 6,
    marginRight: "3%",
    backgroundColor: Constants.ICON_COLOR,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
  checkinbutton: {
    // flex: 1,
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
  checkinCanClickbutton: {
    // flex: 1,
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
  titleHeader: {
    position: 'absolute',
    left: 22,
    height: 60,
    flexDirection: 'row',
    alignItems: "center",
  },
  headerText: {
    zIndex: 6,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  ratingHeader: {
    position: 'absolute',
    left: "25%",
    right: "25%",
    height: 35,
    top: 58,
    flexDirection: 'row',
    alignItems: "center",
  },
  starContainer: {
    padding: "0.6%",
    alignItems: "center",
  },
  starFull: {
    width: 35,
    height: 35,
  },
  starEmpty: {
    width: 29.5,
    height: 29.5,
    margin: 2.8
  },
  buttontext: {
    fontSize: 16,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
  titletext: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold', 
    fontFamily: Constants.TEXT_FONT
  },
  addresstext: {
    fontSize: 14,
    color: 'black',
    fontFamily: Constants.TEXT_FONT
  },  
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInFooter);
