import { Platform } from 'react-native';
import { AudioUtils } from 'react-native-audio-player-recorder';

console.log('Audio Path: ', AudioUtils.DocumentDirectoryPath);
const Constants = {
  MAX_AUDIO_LENGTH: 60,
  AUDIO_PATH: AudioUtils.DocumentDirectoryPath,
  CUSTOM_RED: '#C62828',
  ICON_GREY_COLOR: '#212121',
  ICON_NOT_AVAILABLE_COLOR: '#E0E0E0',
  BACK_GROUND_GREY: '#F5F5F5',
  PLATFORM_MARGIN_TOP: Platform.OS === 'ios' ? 64 : 54,
};

export default Constants;
