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
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const transitionProps = ['top', 'height', 'width'];
/* ----------------------------------
         Import Constants
---------------------------------- */
import AssetMap from '../config/AssetMap';
import Constants from '../Constants';

/* ----------------------------------
         Import Components
---------------------------------- */
import CheckInSubmitButton from './CheckInSubmitButton';
import Recorder from './Recorder';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  openCheckIn,
  closeCheckIn,
  clearSelectedPlace,
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  checkInOpenReducer,
  myLocationReducer,
  selectedPlaceReducer
}) => ({
  checkInOpenReducer,
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
  clearSelectedPlace: () => {
    dispatch(clearSelectedPlace());
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
      typeOfComment: 'Text',
      keyboardHeight: 0,
      onLoading: false
    }
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.clearText = this.clearText.bind(this);
    this.setRating = this.setRating.bind(this);
    this.clearTextAndRating = this.clearTextAndRating.bind(this);
    this.toggleTypeOfComment = this.toggleTypeOfComment.bind(this);
    this.updateTypeOfComment = this.updateTypeOfComment.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.stopLoading = this.stopLoading.bind(this);    
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

  updateTypeOfComment (type) {
    this.setState({ typeOfComment: type });
  }

  startLoading () {
    this.setState({ onLoading: true });
  }

  stopLoading () {
    this.setState({ onLoading: false});
  }

  render() {
    const {
      checkInOpenReducer, 
      toggleCheckIn, 
      myLocationReducer, 
      selectedPlaceReducer,
      clearSelectedPlace,
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
            <Animatable.Text style={styles.titleText}>
              {'How is this place?'}
            </Animatable.Text>
            <Animatable.Text style={styles.addressText}>
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
            autoCorrect={false}
            editable={!this.state.onLoading}
          />
          :
          <Recorder 
            onLoading={this.state.onLoading}
          />  
        }
        {/* ---------------------------------
                      Buttons
        ---------------------------------- */} 
        <Animatable.View style={styles.buttons}>
          {/* ---------------------------------
                       Back Button
          ---------------------------------- */} 
          <TouchableOpacity
            style={this.state.onLoading ? styles.backButtonNotAvailable : styles.backButton}
            onPress={() => {
              if (!this.state.onLoading) {
                toggleCheckIn(checkInOpenReducer);
                Keyboard.dismiss();
                if (this.state.typeOfComment === 'Text') this.clearText();
                clearSelectedPlace();
                this.setRating(0);
                this.updateTypeOfComment('Text');
              }
            }}
          >
            <Text style={styles.buttonText}>{"Back"}</Text>
          </TouchableOpacity>
          {/* ---------------------------------
                 Switch Recorder Buttons
          ---------------------------------- */} 
          <TouchableOpacity
            style={this.state.onLoading ? styles.switchButtonNotAvailable : styles.switchButton}
            onPress={() => {
              if (!this.state.onLoading) {
                if (this.state.typeOfComment === 'Text') {
                  this.setState({ typeInComment: '' });
                }
                this.toggleTypeOfComment();
              }
            }}
          >
            <Text style={styles.buttonText}>
              {this.state.typeOfComment === 'Text' ? "Voice Check In" : "Text Check In"}
            </Text>
          </TouchableOpacity>
          {/* ---------------------------------
                    CheckIn Buttons
          ---------------------------------- */} 
          <CheckInSubmitButton 
            rating={this.state.rating}
            typeInComment={this.state.typeInComment}
            typeOfComment={this.state.typeOfComment}
            toggleCheckIn={() => {toggleCheckIn(checkInOpenReducer)}}
            toggleTypeOfComment={this.toggleTypeOfComment}
            clearTextAndRating={this.clearTextAndRating}
            clearSelectedPlace={clearSelectedPlace}
            onLoading={this.state.onLoading}
            startLoading={this.startLoading}
            stopLoading={this.stopLoading}
          />
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
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3, 
  },
  inputbox: {
    position: 'absolute',
    left: 22,
    right: 22,
    top: 100,
    height: 100,
    zIndex: 6,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3, 
    fontFamily: Constants.TEXT_FONT,
    fontSize: 16
  },
  buttons: {
    position: 'absolute',
    top: 220,
    left: 22,
    right: 22,
    flexDirection: 'row',
    alignItems: "center",
  },
  switchButton: {
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
  switchButtonNotAvailable: {
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
  backButton: {
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
  backButtonNotAvailable: {
    height: "170%",
    width: "20%",
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
    paddingLeft: "2.5%",
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
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
  titleText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold', 
    fontFamily: Constants.TEXT_FONT
  },
  addressText: {
    fontSize: 14,
    color: 'black',
    fontFamily: Constants.TEXT_FONT
  },  
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInFooter);
