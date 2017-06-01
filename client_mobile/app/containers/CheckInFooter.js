import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Button, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Recorder from './Recorder.js';
const transitionProps = ['top', 'height', 'width']

export default class CheckInFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeInComment: ''
    }
    this.clearText = this.clearText.bind(this);
  }

  static defaultProps = {
    visible: false,
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    const {visible, toggleCheckIn, onCommentSubmit} = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      top: visible ? 200 : windowHeight,
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
            toggleCheckIn();
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
            toggleCheckIn();
            /* ---------------------------------------------
                 comment, latitude, longitude, rating
                  pass the text commet details here
            ---------------------------------------------- */            
            onCommentSubmit(this.state.typeInComment, '12.345', '67,89', 5);
            this.clearText();
          }} 
          title='Check In'/>
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
