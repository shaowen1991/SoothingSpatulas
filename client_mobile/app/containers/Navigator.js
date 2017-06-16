import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';

import Main from './Main';
import Login from './Login';
import Profile from './Profile'

const mapStateToProps = ({ loginReducer }) => ({ loginReducer });

class Navigator extends Component {
  render() {
    const {loginReducer} = this.props;

    return (
      loginReducer ? <Main /> : <Login />
    );
  }
}

export default connect(mapStateToProps, {})(Navigator);
