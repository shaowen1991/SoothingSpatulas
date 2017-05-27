import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';

import Main from './Main';
import LoginNavi from './LoginNavi';

class Navigator extends Component {
  render() {
    let props = this.props;
    console.log('Navigator props: ', props);

    return (
      props.loginReducer ? <Main /> : <LoginNavi />
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({ loginReducer });

export default connect(mapStateToProps, {})(Navigator);
