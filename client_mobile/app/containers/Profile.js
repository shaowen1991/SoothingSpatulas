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

  render() {
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