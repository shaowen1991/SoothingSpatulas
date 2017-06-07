import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions, 
  View, 
  Text, 
  Button, 
  TextInput 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import { postTextComments } from '../Network.js';
import Recorder from './Recorder.js';
const transitionProps = ['top', 'height', 'width']

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
    console.log('dispatch dropCheckInPin', latitude, longitude, name, des);
    dispatch(dropCheckInPin(latitude, longitude, name, des));
  },
  onCommentSubmit: (comment, latitude, longitude, rating, user_id, username) => {
    console.log('dispatch onCommentSubmit', comment, latitude, longitude, rating, user_id, username);
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
      typeInComment: ''
    }
    this.clearText = this.clearText.bind(this);
    this.onPinDrop = this.onPinDrop.bind(this);
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
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
      top: checkInOpenReducer ? 200 : windowHeight,
      height: windowHeight,
      width: windowWidth,
    }
    
    console.log('CheckInFooter props: ', this.props);
    return (
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out"}
        transition={transitionProps}
      >
        <Button 
          onPress={() => {
            toggleCheckIn(checkInOpenReducer);
            this.clearText();
          }}
          title='Back'
        />

        <TextInput
          style={{height: 100, borderColor: 'gray', borderWidth: 0.5}}
          ref={component => this._textInput = component}
          onChangeText={(typeInComment) => {this.setState({typeInComment})}}
          placeholder={'Please write your comments'}
        />

        <Button 
          onPress={() => {
            toggleCheckIn(checkInOpenReducer);
            /* ---------------------------------------------
                 comment, latitude, longitude, rating
                  pass the text commet details here
                  
                  first method is send data to Redux
                  second method is send data to DB
            ---------------------------------------------- */            
            onCommentSubmit(
              this.state.typeInComment,
              myLocationReducer.latitude,
              myLocationReducer.longitude,
              5,
              useridReducer,
              usernameReducer
            );
            postTextComments({
              comment: this.state.typeInComment,
              latitude: myLocationReducer.latitude,
              longitude: myLocationReducer.longitude,
              rating: 5, 
              user_id: useridReducer
            });
            this.onPinDrop(usernameReducer, this.state.typeInComment);
            this.clearText();
          }} 
          title='Check In'
        />

        <Recorder />  
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    zIndex: 10
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInFooter);
