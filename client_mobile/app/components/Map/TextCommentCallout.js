import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Constants from '../../Constants';
import { getUserById, getAudioCommentByFileName } from '../../Network.js';
import { AudioPlayer } from 'react-native-audio-player-recorder';
/* ----------------------------------
                Class
---------------------------------- */
export default class TextCommentCallout extends Component {
  constructor (props) {
    super (props);
    this.state = {
      userInfo: {
        first: '',
        last: '',
        id: 0,
        email: '',
        photo_large: 'http://sourcebits.wpengine.netdna-cdn.com/wp-content/themes/sb7/images/icons/spinner.png',
      },
      comment_audio_path: ''
    }
    this.startPlay = this.startPlay.bind(this);
    this.stopPlay = this.stopPlay.bind(this);
  }

  componentDidMount () {
    /* ----------------------------------
            Fetch user info
    ---------------------------------- */
    getUserById(this.props.user_id)
    .then((fetchedUserInfo) => {
      this.setState({ userInfo: fetchedUserInfo });
    })
    .catch((error) => {console.log(error)})
    /* ----------------------------------
            Fetch comment audio
    ---------------------------------- */
    if (this.props.comment_audio) {
      if (!this.props.audioDownloadedList.includes(this.props.comment_audio)) {
        this.props.addAudioList(this.props.comment_audio);
        getAudioCommentByFileName(this.props.comment_audio)
        .then(() => {
          this.setState({ 
            comment_audio_path: Constants.AUDIO_PATH + '/' + this.props.comment_audio
          })
        })
        .catch((error) => {console.log(error)})
      }
      else {
        this.setState({ 
          comment_audio_path: Constants.AUDIO_PATH + '/' + this.props.comment_audio
        })
      }
    }
  }

  startPlay () {
    AudioPlayer.play(Constants.AUDIO_PATH + '/' + this.props.comment_audio);
    this.props.startPlaying();
    AudioPlayer.onFinished = () => {
      this.props.stopPlaying();
    }
    AudioPlayer.setFinishedSubscription()
  }

  stopPlay () {
    AudioPlayer.stop();
    this.props.stopPlaying();
  }

  render () {
    const { 
      user_id, 
      name, 
      comment, 
      comment_audio, 
      rating, 
      latitude, 
      longitude,
      isPlaying,
      startPlaying,
      stopPlaying,
      audioDownloadedList
    } = this.props;
    const playStopIcon = this.props.isPlaying ? 'stop' : 'play';
    const playStopHandler = this.props.isPlaying ? this.stopPlay : this.startPlay;  

    let coordinatesString = '';
    if (!name) {
      coordinatesString = 
        'Latitude: ' + 
        JSON.stringify(latitude).substring(0, 10) + 
        ', Longitude: ' + 
        JSON.stringify(longitude).substring(0, 10);
    }

    // console.log('TextCommentCallout props', this.props);
    // console.log('TextCommentCallout states', this.state);

    return (
      <View style={styles.container}>
        <Animatable.View style={styles.profileContainer}>
          <Animatable.View style={styles.circle}>
            <Image
              style={styles.image}
              source={{uri: this.state.userInfo.photo_large}}
            />
          </Animatable.View>
          <View>
            <Text 
              numberOfLines={1} 
              style={styles.usernameText}
            >
              {this.state.userInfo.first || 'id-' + user_id}
            </Text>
          </View>
        </Animatable.View>
        <View style={styles.textContainer}>
          <Text style={styles.comment}>{'\"' + comment + '\"'}</Text>
          {/* ---------------------------------
                  Audio player button
          ---------------------------------- */}         
          { this.state.comment_audio_path.length > 0 ? 
            <TouchableOpacity
              style={styles.button}
              onPress={playStopHandler}
            >
              <Text style={styles.buttonText}>
                {playStopIcon}
              </Text>
            </TouchableOpacity>
            :
            null          
          }
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.placeText}>{'@ ' + (name ? name : coordinatesString)}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 5
  },
  profileContainer: {
    width: 70,
    paddingRight: 10,
    paddingTop: 7,
    borderColor: Constants.ICON_NOT_AVAILABLE_COLOR,
    borderRightWidth: 1,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderColor: Constants.COMMENT_PIN_COLOR,
    borderWidth: 3,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 58/2,
  },
  usernameText: {
    fontSize: 11,
    paddingTop: 5,
    alignSelf: 'center',
    fontFamily: Constants.TEXT_FONT
  },
  textContainer: {
    width: 250,
    flexDirection: 'column',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  placeText: {
    fontSize: 12,
    fontFamily: Constants.TEXT_FONT
  },
  rating: {
    fontSize: 13,
    fontFamily: Constants.TEXT_FONT
  },
  comment: {
    fontSize: 16,
    fontWeight: 'bold', 
    fontFamily: Constants.TEXT_FONT
  },
  button: {
    width: 140,
    height: 30,
    backgroundColor: Constants.COMMENT_PIN_COLOR,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: Constants.TEXT_FONT
  },
});
