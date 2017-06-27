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
/* ----------------------------------
         Import Components
---------------------------------- */

import { ProfileHeader, MomentoBar }  from '../components';

import Trends from './Profile/Trends';
import FriendList from './Profile/FriendList';
import HistoryList from './Profile/HistoryList';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  openProfileView,
  closeProfileView,
  storeUserHistoryToState,
  updateLogout,
  updateUsername,
  updateUserid,
  updateUserPic,
} from '../Actions.js';

const mapStateToProps = ({
  profileViewOpen,
  usernameReducer,
  useridReducer,
  userPicReducer,
  commentsReducer
}) => ({
  profileViewOpen,
  usernameReducer,
  useridReducer,
  userPicReducer,
  commentsReducer
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
    dispatch(storeUserHistoryToState(usercomment))
  },
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
    dispatch(updateUserid(0));
    dispatch(updateUserPic(''));
  },
})

const transitionProps = ['right', 'height', 'width']

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'most-viewed',
      checkins: [],
      userPic: this.props.userPic,
      userName: this.props.userName,
      userID: this.props.userID,
      categories: []
    }
  }

  setTab (tabID) {
    this.setState({
      selectedTab: tabID
    })
  }

  componentDidMount() {
    setInterval(function() {
      var filteredCheckins = [];
      for (var i = 0; i < this.props.commentsReducer.length; i++) {
        if(this.props.commentsReducer[i].user_id === this.props.useridReducer) {
          filteredCheckins.push(this.props.commentsReducer[i])
        }
      }
      this.setState({
        checkins: filteredCheckins
      })
    }.bind(this), 3000)
  }

  changeUserID(userid) {
    this.setState({
      userID: userid
    })
  }

  render() {
    const {
      profileViewOpen,
      toggleProfileView,
      useridReducer,
      userPicReducer,
      commentsReducer,
      onLogoutClick
    } = this.props

    const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
    const style = {
      right: profileViewOpen ? 0 : windowWidth,
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
        {/*<Button
          style={styles.logoutButton}
          onPress={onLogoutClick} title="Logout" 
        />*/}
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="most-viewed"
            selected={this.state.selectedTab === 'most-viewed'}
            onPress={() => {this.setTab('most-viewed')}}
          >
          <View>
            <MomentoBar/>
            <ProfileHeader
              userPic={this.state.userPic}
              userName={this.state.userName}
              userHist={this.state.checkins}
              userID={this.state.userID}
            />
            <Trends 
              checkins={this.state.checkins}
              categories={this.state.categories}
            />
            
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="contacts"
            selected={this.state.selectedTab === 'contacts'}
            onPress={() => {this.setTab('contacts')}}
          >
          <View>
            <FriendList userId={this.props.useridReducer}/>
          </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="history"
            selected={this.state.selectedTab === 'history'}
            onPress={() => {this.setTab('history')}}
            >
            <View>
              <MomentoBar/>
              <HistoryList userHist={this.state.checkins}/>
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
    zIndex: 6
  },
  logoutButton: {
    position: 'absolute',
    top: 34,
    left: 21,
    zIndex: 10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);