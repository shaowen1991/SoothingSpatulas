import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import { 
  AudioPlayer, 
  AudioRecorder, 
} from 'react-native-audio-player-recorder';

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
              Class
---------------------------------- */
export default class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      currentTime: 0,
      audioLength: 0
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
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
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
  }

  render() {
    const { 
      isRecording, 
      isFinishRecorded, 
      isPlaying, 
    } = this.state
    const playStopIcon = isPlaying ? 'stop-circle-o' : 'play-circle-o'
    const playStopHandler = isPlaying ? this.stopPlaying : this.startPlaying

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
})

/* ----------------------------------
      In order to make this work

### Link native libraries

react-native link react-native-audio-player-recorder

### Configration for iOS and Android

On iOS you need to add a usage description to Info.plist:

<key>NSMicrophoneUsageDescription</key>
<string>This sample uses the microphone to record your speech and convert it to text.</string>

On Android you need to add a permission to AndroidManifest.xml:

<uses-permission android:name="android.permission.RECORD_AUDIO" />

---------------------------------- */
