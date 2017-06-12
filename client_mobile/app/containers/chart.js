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
      <View>
        <View style={styles.trends}>
          <Text style={styles.trendsHeader}>Recent Trends</Text>
          <Text>Total checkins: {this.props.userHist.length}</Text>
        </View>
        <View style={styles.graph}>
          <Text style={styles.trendsHeader}>Historical Trends</Text>
          
          <Text style={styles.graphCaption}>about graph...)</Text>
        </View>
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
    fontSize: 10,
    marginBottom: '2%'
  },
  trendsHeader: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '1%'
  },
  graph: {
    flexDirection: 'column',
    height: '50%',
    width: '100%',
    alignContent: 'center'
  },
  image: {
    width: '90%',
    height: '100%',
    marginLeft: '5%',
  },
  graphCaption: {
    height: '10%',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default Chart;