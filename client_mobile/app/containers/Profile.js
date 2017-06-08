import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
import ProfileHeader from './ProfileHeader';
import Trends from './Trends';
import FriendList from './FriendList';
import HistoryList from './HistoryList';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'most-viewed'
    }
  }

  setTab (tabID) {
    this.setState({
      selectedTab: tabID
    })
  }

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

const transitionProps = ['top', 'height', 'width']

import {
  openProfileView,
  closeProfileView
} from '../Actions.js';

const mapStateToProps = ({
  profileViewOpen,
  usernameReducer,
  useridReducer
}) => ({
  profileViewOpen,
  usernameReducer,
  useridReducer
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfileView: (profileViewOpen) => {
    if (profileViewOpen) {
      dispatch(closeProfileView());
    }
    else {
      dispatch(openProfileView());
    }
  }
})

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.userCheckinHistory = this.userCheckinHistory.bind(this);
  }

  userCheckinHistory(userid) {
    console.log('userid: ', userid)
    fetch("http://localhost:3000/api/locationsusers/" + userid, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'            
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('-------> get user location data: ', responseJSON);
      })
      .catch((err) => {
        console.log('-------> user id fetch err: ', err);
      })
  }

  render() {
    const {
      profileViewOpen,
      toggleProfileView,
      useridReducer
    } = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      top: profileViewOpen ? 200 : windowHeight,
      height: windowHeight,
      width: windowWidth,
    }
    console.log('Profile props: ', this.props);
    return (
        <TabBarIOS>
          <TabBarIOS.Item 
            systemIcon="most-viewed"
            selected={this.state.selectedTab === 'most-viewed'}
            onPress={() => {this.setTab('most-viewed')}}
          >
          <View>
            <ProfileHeader/>
            <Trends/>
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon="contacts"
            selected={this.state.selectedTab === 'contacts'}
            onPress={() => {this.setTab('contacts')}}
          >
          <View>
            <ProfileHeader/>
            <FriendList/>
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon="history"
            selected={this.state.selectedTab === 'history'}
            onPress={() => {this.setTab('history')}}
            >
            <View>
              <ProfileHeader/>
              <HistoryList/>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out"}
        transition={transitionProps}
      >
        <View>
          <Text>Profile</Text>
          <Button 
            onPress={() => {this.userCheckinHistory(useridReducer)}}
            title='history'
          />
        </View>
      </Animatable.View>
    );
    )
  }
}

export default Test;
