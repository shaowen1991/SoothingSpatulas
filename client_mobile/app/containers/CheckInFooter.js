import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import { postTextComments } from '../Network.js';
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
  dropCheckInPin
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
  myLocationReducer
}) => ({
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer,
  pinCoordinatesReducer,
  myLocationReducer
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
  onCommentSubmit: (comment, latitude, longitude, rating, user_id, username) => {
    dispatch(addTextComment(comment, latitude, longitude, rating, user_id, username));
  },
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
      typeOfComment: 'Text'
    }
    this.clearText = this.clearText.bind(this);
    this.onPinDrop = this.onPinDrop.bind(this);
    this.setRating = this.setRating.bind(this);
    this.toggleTypeOfComment = this.toggleTypeOfComment.bind(this);
  }

  clearText () {
    this._textInput.setNativeProps({text: ''});
  }

  setRating (rate) {
    this.setState({ rating: rate });
  }

  toggleTypeOfComment () {
    if (this.state.typeOfComment === 'Text') {
      this.setState({ typeOfComment: 'Voice'});
    }
    else {
      this.setState({ typeOfComment: 'Text'});     
    }
  }

  onPinDrop (username, comment) {
    this.props.dropCheckInPin(
      this.props.myLocationReducer.latitude, 
      this.props.myLocationReducer.longitude,
      username,
      comment
    )
  }

  render() {
    const {
      checkInOpenReducer, 
      toggleCheckIn, 
      onCommentSubmit, 
      myLocationReducer, 
      usernameReducer,
      useridReducer,
    } = this.props

    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      top: checkInOpenReducer ? windowHeight - 220 : windowHeight,
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

    console.log('CheckInFooter props: ', this.props);
    return (
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out-circ"}
        transition={transitionProps}
      >
        {/* ---------------------------------
          Header that include text and stars
        ---------------------------------- */}
        <Animatable.View style={styles.ratingHeader}>
          <Animatable.Text style={styles.headerText}>
            {'How is this place?'}
          </Animatable.Text>
          {/* ---------------------------------
                         Stars
          ---------------------------------- */}          
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
              if (this.state.typeOfComment === 'Text') this.clearText();
              this.setRating(0);
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
            style={styles.checkinbutton}
            onPress={() => {
              toggleCheckIn(checkInOpenReducer);
              /* ----------------------------------------------------
                comment, latitude, longitude, rating, userid, username
                        pass the text commet details here
                       first method is send data to Redux
                        second method is send data to DB
              ----------------------------------------------------- */            
              onCommentSubmit(
                this.state.typeInComment,
                myLocationReducer.latitude,
                myLocationReducer.longitude,
                this.state.rating,
                useridReducer,
                usernameReducer
              );
              postTextComments({
                comment: this.state.typeInComment,
                latitude: myLocationReducer.latitude,
                longitude: myLocationReducer.longitude,
                rating: this.state.rating,
                user_id: useridReducer
              });
              this.onPinDrop(usernameReducer, this.state.typeInComment);
              this.clearText();
              this.setRating(0);
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
    top: 60,
    height: 100,
    zIndex: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
  },
  buttons: {
    position: 'absolute',
    top: 180,
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
    backgroundColor: Constants.ICON_GREY_COLOR,
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
    backgroundColor: Constants.ICON_GREY_COLOR,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
  ratingHeader: {
    position: 'absolute',
    left: 22,
    height: 60,
    flexDirection: 'row',
    alignItems: "center",
  },
  headerText: {
    zIndex: 6,
    paddingRight: 10,
    fontSize: 16,
    color: Constants.ICON_GREY_COLOR,
    backgroundColor: 'transparent',
  },
  starContainer: {
    padding: "0.6%",
    flexDirection: 'row',
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
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInFooter);
