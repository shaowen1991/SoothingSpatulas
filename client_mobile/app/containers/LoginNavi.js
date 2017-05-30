import { StackNavigator } from 'react-navigation';

import Login from './Login.js';
import Signup from './Signup.js';

const LoginNavi = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup }
}, {
  initialRouteName: 'Login'
});

export default LoginNavi;