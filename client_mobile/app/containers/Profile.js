import React, { Component } from 'react';
import { 
  AppRegistry, 
  Dimensions,
  View, 
  Image, 
  StyleSheet, 
  Text, 
  TabBarIOS, 
  Button 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import Trends from './Trends';
import FriendList from './FriendList';
import HistoryList from './HistoryList';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');
const transitionProps = ['top', 'height', 'width']

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  openProfileView,
  closeProfileView,
  storeUserHistoryToState
} from '../Actions.js';

const mapStateToProps = ({
  profileViewOpen,
  usernameReducer,
  useridReducer,
  userPicReducer,
  userHistoryReducer
}) => ({
  profileViewOpen,
  usernameReducer,
  useridReducer,
  userPicReducer,
  userHistoryReducer
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfileView: (profileViewOpen) => {
    if (profileViewOpen) {
      dispatch(closeProfileView());
    }
    else {
      dispatch(openProfileView());
    }
  },
  storeUserHistoryToState: (userhistory) => {
    console.log('dispatching userhist: ', userhistory)
    dispatch(storeUserHistoryToState(usercomment))
  }
})

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'most-viewed',
      userHist: [],
      userPic: this.props.userPic
    }
    this.userCheckinHistory = this.userCheckinHistory.bind(this);
  }

  setTab (tabID) {
    this.setState({
      selectedTab: tabID
    })
  }

  userCheckinHistory(userid) {
    var histArray = [];
    fetch("http://localhost:3000/api/locationsusers/" + userid, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'            
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('-------> get user location data comment: ', responseJSON);
        // function here to deal with responseJSON
        // storeUserHistoryToState(responseJSON)
        // refactor to non-redux
        histArray.push(responseJSON)
        this.setState({
          userHist: histArray
        })
      })
      .catch((err) => {
        console.log('-------> user id fetch err: ', err);
      })
  }

  render() {
    const {
      profileViewOpen,
      toggleProfileView,
      useridReducer,
      userPicReducer,
      userHistoryReducer
    } = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      top: profileViewOpen ? 0 : windowHeight,
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
        <TabBarIOS>
          <TabBarIOS.Item 
            systemIcon="most-viewed"
            selected={this.state.selectedTab === 'most-viewed'}
            onPress={() => {this.setTab('most-viewed')}}
          >
          <View>
            <ProfileHeader userPic={this.state.userPic}/>
            <Trends/>
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon="contacts"
            selected={this.state.selectedTab === 'contacts'}
            onPress={() => {this.setTab('contacts')}}
          >
          <View>
            <ProfileHeader userPic={this.state.userPic}/>
            <FriendList/>
            <Button 
              onPress={() => {this.userCheckinHistory(useridReducer)}}
              title='history'
            />
            <Text> {this.state.userHist.length} of checkins </Text>
            {this.state.userHist.map((place, key) => (
              <Text key={key}>
                comment: {place.comment}
                rating: {place.rating}
              </Text>
            ))}
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon="history"
            selected={this.state.selectedTab === 'history'}
            onPress={() => {this.setTab('history')}}
            >
            <View>
              <ProfileHeader userPic={this.state.userPic}/>
              <HistoryList/>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    zIndex: 6
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);