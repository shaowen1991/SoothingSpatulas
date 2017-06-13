import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { 
  AudioPlayer, 
  AudioRecorder, 
} from 'react-native-audio-player-recorder';
import * as Animatable from 'react-native-animatable';
// import { postAudioComments } from '../Network.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import {
  ActionButtons,
  Button,
  RecordButton
} from '../components';

/* ----------------------------------
         Import Constants
---------------------------------- */
import Constants from '../Constants';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import { 
  addAudioComment,
  incrementID,
  openCheckIn,
  closeCheckIn 
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({ 
  usernameReducer,
  testCommentIDReducer,
  checkInOpenReducer
}) => ({
  usernameReducer,
  testCommentIDReducer,
  checkInOpenReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onAudioCommentSubmit: (user, audioPath) => {
    dispatch(addAudioComment(user, audioPath));
    dispatch(incrementID());
  },
  toggleCheckIn: (checkInOpenReducer) => {
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
});

/* ----------------------------------
              Class
---------------------------------- */
class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      currentTime: 0,
      audioLength: 0
    };
    this.timer = null;
    this.userAudioPath = '';
  }

  prepareRecordingPath () {
    this.userAudioPath = 
      Constants.AUDIO_PATH + '/' 
      + this.props.usernameReducer + '_' 
      + this.props.testCommentIDReducer + '.aac';
      
    AudioRecorder.prepareRecordingAtPath(
      this.userAudioPath, 
      {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 32000
      });
  }

  record = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.stopPlaying();
    }

    this.prepareRecordingPath();
    AudioRecorder.startRecording();
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    });

    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1;
      this.setState({currentTime: time});
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording();
      }
    }, 1000);
  }

  stopRecording = () => {
    const { isRecording } = this.state;
    if (!isRecording) return;

    AudioRecorder.stopRecording();
    this.setState({audioLength: this.state.currentTime + 1});
    clearInterval(this.timer);
    this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0});
  }

  startPlaying = () => {
    this.userAudioPath = 
      Constants.AUDIO_PATH + '/' 
      + this.props.usernameReducer + '_' 
      + this.props.testCommentIDReducer + '.aac';
    AudioPlayer.play(this.userAudioPath);
    this.setState({isPlaying: true});
    AudioPlayer.onFinished = () => {
      this.setState({isPlaying: false})
    }
    AudioPlayer.setFinishedSubscription()
  }

  stopPlaying = () => {
    AudioPlayer.stop();
    this.setState({isPlaying: false});
  }

  onAudioCommentSubmit = () => {
    this.userAudioPath = 
      Constants.AUDIO_PATH + '/' 
      + this.props.usernameReducer + '_' 
      + this.props.testCommentIDReducer + '.aac';


    // const filename = this.props.usernameReducer + '_'  + this.props.testCommentIDReducer + '.aac';
    // const filepath = Constants.AUDIO_PATH + '/' + filename;
    // postAudioComments(filepath, filename);


    this.props.onAudioCommentSubmit(this.props.usernameReducer, this.userAudioPath);
    this.props.toggleCheckIn(this.props.checkInOpenReducer);
    this.setState({
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      currentTime: 0,
      audioLength: 0
    });
  }

  render () {
    const { 
      isRecording, 
      isFinishRecorded, 
      isPlaying, 
    } = this.state;
    const playStopIcon = isPlaying ? 'stop' : 'play';
    const playStopHandler = isPlaying ? this.stopPlaying : this.startPlaying;
    console.log('Recorder props: ', this.props);
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      width: windowWidth,
    }
    return (
      <Animatable.View style={[styles.container, style]}>
        <ActionButtons 
          isFinishRecorded={isFinishRecorded} 
          isRecording={isRecording}
          playStopIcon={playStopIcon}
          playStopHandler={playStopHandler}
          stopRecording={this.stopRecording}
          onAudioCommentSubmit={this.onAudioCommentSubmit}
        />
        <RecordButton 
          isRecording={isRecording} 
          isFinishRecorded={isFinishRecorded}
          onPressInHandler={this.record} 
          onPressOutHandler={this.stopRecording}
        />
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: 100,
    height: 100,
    zIndex: 6,
    backgroundColor: '#F5F5F5',
    alignItems: 'center'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
/* ----------------------------------
      In order to make this work

### Link native libraries

react-native link react-native-audio-player-recorder

### Configration for iOS and Android

On iOS you need to add a usage description to ios/client_mobile/Info.plist:

<key>NSMicrophoneUsageDescription</key>
<string>This sample uses the microphone to record your speech and convert it to text.</string>

On Android you need to add a permission to AndroidManifest.xml:

<uses-permission android:name="android.permission.RECORD_AUDIO" />

---------------------------------- */
