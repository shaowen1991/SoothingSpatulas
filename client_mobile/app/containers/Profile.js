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
import Trends from './Trends.js';
import FriendList from './FriendList';
import HistoryList from './HistoryList';
import MomentoBar from './MomentoBar';
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
  textCommentsReducer
}) => ({
  profileViewOpen,
  usernameReducer,
  useridReducer,
  userPicReducer,
  textCommentsReducer
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
      checkins: [],
      userPic: this.props.userPic,
      userName: this.props.userName,
      userID: this.props.userID,
      categories: []
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
    fetch("http://localhost:3000/api/locationsusers/"/* + userid*/, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        // if (responseJSON.isArray()) {
          for (var i = 0; i < responseJSON.length; i++) {
            histArray.push(responseJSON[i]);
          }
        // } else {
        //   histArray.push(responseJSON)
        // }
        this.setState({
          userHist: histArray,
          userHistFirst: histArray.shift()
        })
        console.log('CHECKINSTUFF!!!', this.state.userHist)
      })
      .catch((err) => {
        console.log('-------> user id fetch err: ', err);
      })
  }

  componentWillMount() {
    this.userCheckinHistory(5);
}

  componentDidMount() {
    setInterval(function() {
      var filteredCheckins = [];
      for (var i = 0; i < this.props.textCommentsReducer.length; i++) {
        if(this.props.textCommentsReducer[i].user_id === this.props.useridReducer) {
          filteredCheckins.push(this.props.textCommentsReducer[i])
        }
      }
      this.setState({
        checkins: filteredCheckins
      })
      
    }.bind(this), 5000)


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
      textCommentsReducer
    } = this.props
    // console.log('***profile state***: ', this.state)
    // this.setState({
    //   userID: useridReducer
    // })
    console.log('PROFILE STATE CATEGORIES: ', this.state.categories)
    // this.changeUserID(useridReducer)
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
              <HistoryList userHist={this.state.userHist}/>
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
    zIndex: 6
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);