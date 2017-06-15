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
      categoryHash: [],
      categoryHashHash: {}
    }
    this.filterCategories = this.filterCategories.bind(this);
    this.categoryHash = this.categoryHash.bind(this);
  }

  categoryHash() {
    var categories = {};
    var catArray = [];
    for (var i = 0; i < this.state.checkins.length; i++) {
      if (categories[this.state.checkins[i]]) {
        categories[this.state.checkins[i]]++;
      } else {
          categories[this.state.checkins[i]] = 1;
      }
    }
    for (var category in categories) {
      catArray.push([category, categories[category]])
    }
    this.setState({
      categoryHash: catArray
    })
    console.log('HASHED ARRAY', this.state.categoryHash)
  }

  // componendDidMount() {
  //   var categories = [];
  //   var categoryHash = {};
  //   var catArray = [];
  //   this.props.checkins.forEach((place) => {
  //     fetch("http://localhost:3000/api/locations/name/" + place.name, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       var cat = responseJSON.category.split(',', 1)
  //       var str = cat[0].replace(/\W/g, '');
  //       var readCat = str.replace(/_/g, ' ');
  //       categories.push(readCat)
  //     })
  //     .catch((error) => console.log('error: ', error))
  //   })
  //   .then(())
  //   for (var i = 0 i < categories.length; i++) {
  //     if (categoryHash[categories[i]]) {
  //       categoryHash[categories[i]]++;
  //     } else {
  //       categoryHash[categories[i]] = 1;
  //     }
  //   }
  //   this.setState({
  //     categoryHashHash: categoryHash
  //   })
  // }

  filterCategories() {
    console.log('FILTER INVOKED')
    var categories = [];
    this.props.checkins.forEach((place) => {
      fetch("http://localhost:3000/api/locations/name/" + place.name, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        var cat = responseJSON.category.split(',', 1);
        var str = cat[0].replace(/\W/g, '');
        var readCat = str.replace(/_/g, ' ');
        categories.push(readCat)
      })
      .catch((error) => console.log('error: ', error))
    })
    this.setState({
      checkins: categories
    })
  console.log('trends state categories: ', this.state.checkins)
  }


  render() {

    const {
      useridReducer,
      textCommentsReducer
    } = this.props


    return (
      <View>
        <View style={styles.trends}>
          <Text style={styles.trendsHeader}>Your Trends</Text>
          <Text>Total checkins: {this.props.checkins.length}</Text>
          <Button 
            onPress={this.filterCategories}
            title="Filter User's Categories"
            color="#841584"
          />
           <Button 
            onPress={this.categoryHash}
            title="Hash Categories"
            color="#841584"
          />
          <Text>category | checkins | percentage</Text>
            {this.state.categoryHash.map((category, key) => {
              return (
                <Text key={key}>
                  {category[0]} | {category[1]} | {Math.floor((category[1] / this.state.checkins.length) * 100)}%
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