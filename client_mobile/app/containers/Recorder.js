import React, { Component } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
=======
>>>>>>> Implement voice recording feature in check-in.
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import { 
  AudioPlayer, 
  AudioRecorder, 
} from 'react-native-audio-player-recorder';
<<<<<<< HEAD
// import { postAudioComments } from '../Network.js';
=======
>>>>>>> Implement voice recording feature in check-in.

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
<<<<<<< HEAD
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
=======
              Class
---------------------------------- */
export default class Recorder extends Component {
>>>>>>> Implement voice recording feature in check-in.
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      currentTime: 0,
      audioLength: 0
<<<<<<< HEAD
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
=======
    }
    this.timer = null
  }

  prepareRecordingPath(){
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  record = () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }

    this.prepareRecordingPath()
    AudioRecorder.startRecording()
>>>>>>> Implement voice recording feature in check-in.
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
<<<<<<< HEAD
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
=======
    })

    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({currentTime: time})
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return

    AudioRecorder.stopRecording()
    this.setState({audioLength: this.state.currentTime + 1})
    clearInterval(this.timer)
    this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0})
  }

  startPlaying = () => {
    AudioPlayer.play(Constants.AUDIO_PATH)
    this.setState({isPlaying: true})
  }

  stopPlaying= () => {
    AudioPlayer.stop()
    this.setState({isPlaying: false})
>>>>>>> Implement voice recording feature in check-in.
  }

  render() {
    const { 
      isRecording, 
      isFinishRecorded, 
      isPlaying, 
<<<<<<< HEAD
    } = this.state;
    const playStopIcon = isPlaying ? 'Stop' : 'Play to review';
    const playStopHandler = isPlaying ? this.stopPlaying : this.startPlaying;
    console.log('Recorder props: ', this.props);
=======
    } = this.state
    const playStopIcon = isPlaying ? 'stop-circle-o' : 'play-circle-o'
    const playStopHandler = isPlaying ? this.stopPlaying : this.startPlaying
>>>>>>> Implement voice recording feature in check-in.

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <RecordButton 
          isRecording={isRecording} 
          isFinishRecorded={isFinishRecorded}
          onPressInHandler={this.record} 
          onPressOutHandler={this.stopRecording}
        />
        <ActionButtons 
          isFinishRecorded={isFinishRecorded} 
          isRecording={isRecording}
          playStopIcon={playStopIcon}
          playStopHandler={playStopHandler}
          stopRecording={this.stopRecording}
<<<<<<< HEAD
          onAudioCommentSubmit={this.onAudioCommentSubmit}
=======
>>>>>>> Implement voice recording feature in check-in.
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.PLATFORM_MARGIN_TOP + 26,
    flex: 1
  },
  content: {
    alignItems: 'center'
  },
<<<<<<< HEAD
});


export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
=======
})

>>>>>>> Implement voice recording feature in check-in.
/* ----------------------------------
      In order to make this work

### Link native libraries

react-native link react-native-audio-player-recorder

### Configration for iOS and Android

<<<<<<< HEAD
On iOS you need to add a usage description to ios/build/Info.plist:
=======
On iOS you need to add a usage description to Info.plist:
>>>>>>> Implement voice recording feature in check-in.

<key>NSMicrophoneUsageDescription</key>
<string>This sample uses the microphone to record your speech and convert it to text.</string>

On Android you need to add a permission to AndroidManifest.xml:

<uses-permission android:name="android.permission.RECORD_AUDIO" />

---------------------------------- */
