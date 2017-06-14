import React, { Component } from 'react';
import { AppRegistry, 
  View, 
  Image, 
  StyleSheet, 
  Text, 
  TabBarIOS, 
  Button 
} from 'react-native';
import { connect } from 'react-redux';
// @import url('https://fonts.googleapis.com/css?family=Satisfy');

const mapStateToProps = ({
  useridReducer,
  textCommentsReducer
}) => ({
  useridReducer,
  textCommentsReducer
})

class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: [],
      categoryWords: ['bar', 'restaurant', 'gym', 'museum', 'bar', 'bar'],
      categories: []
    }
  }

  categoryHash(array) {
    var categories = {};
    var catArray = [];
    for (var i = 0; i < array.length; i++) {
      if (categories[array[i]]) {
        categories[array[i]]++;
      } else {
          categories[array[i]] = 1;
      }
    }
    for (category in categories) {
      catArray.push([category, categories[category]])
    }
    this.setState({
      categories: categories
    })
  }

  componendDidMount() {
    categoryHash(this.state.categoryWords);
  }

  render() {

    const {
      useridReducer,
      textCommentsReducer
    } = this.props

    console.log('trends in categories: ', this.state.categories)

    console.log('CATEGORIES!!!!: ', this.props.categories)

    return (
      <View>
        <View style={styles.trends}>
          <Text style={styles.trendsHeader}>Trends</Text>
          <Text>Total checkins: {this.props.userHist.length}</Text>
            {this.state.categories.map((category) => {
            return (
              <Text>
                {category} visited {this.state.categories.category}
              </Text>
              )
              
            })
          }
        </View>
        <View style={styles.graph}>
          
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
  }
});

export default connect(mapStateToProps, {})(Trends);

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