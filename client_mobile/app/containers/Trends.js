// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image
// } from 'react-native';

import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text, TabBarIOS, Button } from 'react-native';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

class Trends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.trends}>
          <Text style={styles.trendsHeader}>Recent Trends</Text>
          <Text>Text Entry 1</Text>
          <Text>Text Entry 2</Text>
          <Text>Text Entry 3</Text>
          <Text>Text Entry 4</Text>
        </View>
        <View style={styles.graph}>
          <Text style={styles.trendsHeader}>Historical Trends</Text>
          <Image
            style={styles.image}
            source={{uri: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'}}
          />
          <Text style={styles.graphCaption}>Graph Image Above (actually Barry's face right now)</Text>
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

export default Trends;

// {<TabBarIOS>
//           <TabBarIOS.Item
//             title="Trends"
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'Trends',
//               });
//             }}
//             selected={this.state.selectedTab = 'Trends'}
//           ></TabBarIOS.Item>
//           <TabBarIOS.Item
//             title="Trends"
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'Connections',
//               });
//             }}
//             selected={this.state.selectedTab = 'Connections'}></TabBarIOS.Item>
//           <TabBarIOS.Item
//             title="Trends"
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'MapView',
//               });
//             }}
//             selected={this.state.selectedTab = 'Map View'}></TabBarIOS.Item>
//         </TabBarIOS>}

          // <Button title=''
          // onPress={()=>{}}>
          //   <Image
          //     style={styles.hamburger}
          //     source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/220px-Hamburger_icon.svg.png'}}
          //   /> 
          //   <Text>Marketing</Text>
          // </Button>