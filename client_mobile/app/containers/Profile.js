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
  usernameReducer
}) => ({
  profileViewOpen,
  usernameReducer
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
  }
  render() {
    const {
      profileViewOpen,
      toggleProfileView
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
    );
  }
}

export default Test;
