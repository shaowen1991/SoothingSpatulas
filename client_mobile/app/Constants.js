import { Platform } from 'react-native';
import { AudioUtils } from 'react-native-audio-player-recorder';

console.log('Audio Path: ', AudioUtils.DocumentDirectoryPath);
const Constants = {
  MAX_AUDIO_LENGTH: 60,
  AUDIO_PATH: AudioUtils.DocumentDirectoryPath,
  ICON_COLOR: '#4527A0',
  ICON_NOT_AVAILABLE_COLOR: '#E0E0E0',
  NEARBY_PIN_COLOR: '#7A42F4',
  COMMENT_PIN_COLOR: '#9CCC65',
  BACK_GROUND_GREY: '#F5F5F5',
  PLACEHOLDER_COLOR: '#E0E0E0',
  TEXT_FONT: 'Avenir-Medium',
  PLATFORM_MARGIN_TOP: Platform.OS === 'ios' ? 64 : 54,
};

export default Constants;
