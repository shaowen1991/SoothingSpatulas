import React, { Component } from 'react';
import { 
  AppRegistry,
  Animated,
  Button, 
  Dimensions, 
  Image, 
  StyleSheet, 
  TabBarIOS, 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native';
//import { Icon } from 'react-native-icons';

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.trends}>
        <Text style={styles.trendsHeader}>Recent Trends</Text>
        <Text style={styles.trendsBody}>Total checkins: {this.props.userHist.length}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  trends: {
    flexDirection: 'column',
    height: '20%',
    width: '100%',
    alignContent: 'center',
    marginBottom: '2%'
  },
  trendsHeader: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '1%',
    color: '#4527A0'
  }, 
  trendsBody: {
    color: '#4527A0',
  }

});

export default Chart;