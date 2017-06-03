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
  addTextComment
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
}) => ({
  usernameReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
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
  onCommentSubmit: (comment, latitude, longitude, rating, user_id) => {
    console.log('dispatch onCommentSubmit', comment, latitude, longitude, rating, user_id);
    dispatch(addTextComment(comment, latitude, longitude, rating, user_id));
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
  }

  // static defaultProps = {
  //   checkInOpenReducer: false,
  // }

  clearText() {
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    const {checkInOpenReducer, toggleCheckIn, onCommentSubmit, onPinDrop} = this.props
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
              '12.345',
              '67,89',
              5,
              1
            );
            postTextComments({
              comment: this.state.typeInComment,
              latitude: '12.345',
              longitude: '67,89',
              rating: 5, 
              user_id: 1
            });
            onPinDrop();
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
    borderColor: 'grey'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInFooter);
