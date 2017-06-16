import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { 
  AudioPlayer, 
  AudioRecorder, 
} from 'react-native-audio-player-recorder';
import * as Animatable from 'react-native-animatable';
import UUIDGenerator from 'react-native-uuid-generator';
import RNFetchBlob from 'react-native-fetch-blob';
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
  updateAudioCurrentFileName,
  startRecording,
  stopRecording, 
  finishRecording,  
  unfinishRecording,  
  startPlaying,  
  stopPlaying, 
  updateAudioCurrentTime,
  updateAudioLength,
} from '../Actions.js';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({ 
  usernameReducer,
  audioCurrentFileName,
  isRecording,
  isFinishRecorded,
  isPlaying,
  currentTime,
  audioLength,
}) => ({
  usernameReducer,
  audioCurrentFileName,
  isRecording,
  isFinishRecorded,
  isPlaying,
  currentTime,
  audioLength,
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  updateAudioCurrentFileName: (filename) => {
    dispatch(updateAudioCurrentFileName(filename));
  },
  startRecording: () => {
    dispatch(startRecording());
  },
  stopRecording: () => {
    dispatch(stopRecording());
  }, 
  finishRecording: () => {
    dispatch(finishRecording());
  },  
  unfinishRecording: () => {
    dispatch(unfinishRecording());
  },  
  startPlaying: () => {
    dispatch(startPlaying());
  },  
  stopPlaying: () => {
    dispatch(stopPlaying());
  }, 
  updateAudioCurrentTime: (currentTime) => {
    dispatch(updateAudioCurrentTime(currentTime));
  },
  updateAudioLength: (audioLength) => {
    dispatch(updateAudioLength(audioLength));
  }
});

/* ----------------------------------
              Class
---------------------------------- */
class Recorder extends Component {
  constructor(props) {
    super(props)
    this.timer = null;
    this.prepareRecordingPath = this.prepareRecordingPath.bind(this);
    this.record = this.record.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.startPlay = this.startPlay.bind(this);
    this.stopPlay = this.stopPlay.bind(this);
  }
  
  componentDidMount () {
    UUIDGenerator.getRandomUUID()
    .then((uuid) => {
      // console.log(uuid);
      this.props.updateAudioCurrentFileName(uuid + '.aac');
    })
  }

  componentWillUnmount () {
    RNFetchBlob.fs.unlink(Constants.AUDIO_PATH + '/' + this.props.audioCurrentFileName);
    this.props.stopRecording();
    this.props.unfinishRecording(); 
    this.props.stopPlaying();
    this.props.updateAudioCurrentTime(0);
    this.props.updateAudioLength(0);   
  }   

  prepareRecordingPath () {
    AudioRecorder.prepareRecordingAtPath(
      Constants.AUDIO_PATH + '/' + this.props.audioCurrentFileName, 
      {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 32000
      }
    );
  }

  record () {
    if (this.props.isPlaying) {
      this.stopPlay();
    }

    this.prepareRecordingPath();
    AudioRecorder.startRecording();
    this.props.stopPlaying();
    this.props.startRecording();
    this.props.unfinishRecording();
    this.props.updateAudioCurrentTime(0);
    this.props.updateAudioLength(0);

    this.timer = setInterval(() => {
      let time = this.props.currentTime + 1;
      this.props.updateAudioCurrentTime(time);
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecord();
      }
    }, 1000);
  }

  stopRecord () {
    if (!this.props.isRecording) return;

    AudioRecorder.stopRecording();
    this.props.updateAudioLength(this.props.currentTime + 1);
    clearInterval(this.timer);
    this.props.stopRecording();
    this.props.finishRecording();
    this.props.updateAudioCurrentTime(0);
  }

  startPlay () {
    AudioPlayer.play(Constants.AUDIO_PATH + '/' + this.props.audioCurrentFileName);
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
    const playStopIcon = this.props.isPlaying ? 'stop' : 'play';
    const playStopHandler = this.props.isPlaying ? this.stopPlay : this.startPlay;
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const style = {
      width: windowWidth,
    }

    // console.log('Recorder props: ', this.props);
    return (
      <Animatable.View style={[styles.container, style]}>
        <ActionButtons 
          isFinishRecorded={this.props.isFinishRecorded} 
          playStopIcon={playStopIcon}
          playStopHandler={playStopHandler}
          onLoading={this.props.onLoading}
        />
        <RecordButton 
          isRecording={this.props.isRecording} 
          isFinishRecorded={this.props.isFinishRecorded}
          onPressInHandler={this.record} 
          onPressOutHandler={this.stopRecord}
          onLoading={this.props.onLoading}
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
