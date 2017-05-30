import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Button, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable'

const transitionProps = ['top', 'height', 'width']

export default class CheckInFooter extends Component {

  state = { 
    typeInComment: ''
  }

  static defaultProps = {
    visible: false,
  }

  render() {
    const {visible, toggleCheckIn, onCommentSubmit} = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

    const style = {
      top: visible ? 200 : windowHeight,
      height: windowHeight,
      width: windowWidth,
    }

    return (
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out"}
        transition={transitionProps}
      >
        <Button onPress={toggleCheckIn} title='Back'/>
        <TextInput
          style={{height: 100, borderColor: 'gray', borderWidth: 0.5}}
          onChangeText={(typeInComment) => this.setState({typeInComment})}
          placeholder={'Please write your comments'}
        />

        <Button 
          onPress={() => {
            toggleCheckIn();
            onCommentSubmit(this.state.typeInComment)}} 
          title='Check In'/>
          
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
  },
})
