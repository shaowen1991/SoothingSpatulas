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
      userCategories: []
    }
    // this.filterCategories = this.filterCategories.bind(this);
    // this.categoryHash = this.categoryHash.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.setState = this.setState.bind(this)
  }



  componentDidMount() {

    setInterval(function() {
      var categoryHash = {};
      var catArray = [];
      var categoriesArray = [];

      fetch("http://localhost:3000/api/locationsusers/user/" + this.props.useridReducer, {
        method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('USERID IN TRENDS: ', this.props.useridReducer)
        console.log('LOCATIONUSERS RESPONSE: ', responseJSON.rows)
        for (var i = 0; i < responseJSON.rows.length; i++) {
          var cat = responseJSON.rows[i].category.split(',', 1);
          var str = cat[0].replace(/\W/g, '');
          var readCat = str.replace(/_/g, ' ');
          categoriesArray.push(readCat);
        }
        console.log('categoriesArray', categoriesArray)
        for (var j = 0; j < categoriesArray.length; j++) {
          if (categoryHash[categoriesArray[j]]) {
            categoryHash[categoriesArray[j]]++;
          } else {
            categoryHash[categoriesArray[j]] = 1;
          }
        }
        for (var key in categoryHash) {
          catArray.push([key, categoryHash[key]])
        }
        console.log('CAT ARRAY: ', catArray)
        this.setState({
          userCategories: catArray
        })
      })

        
    }.bind(this),3000)
  }

  render() {

    const {
      useridReducer,
      textCommentsReducer
    } = this.props

    // setInterval(function() {
    //   this.componentDidMount()
    // }.bind(this), 10000)

    return (
      <View>
        <View style={styles.trends}>
          <Text style={styles.checkin}>Total checkins: {this.props.checkins.length}</Text>
          
            {this.state.userCategories.map((category, key) => {
              return (
                <View style={styles.row} key={key}>
                  <Text style={styles.category}>{category[0]}s</Text>
                  <Text style={styles.num}>{category[1]}</Text>
                  <Text style={styles.percent}>{Math.floor((category[1] / this.props.checkins.length) * 100)}%</Text>
                </View>
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
  },
  row: {
    flexDirection: 'row'
  },
  category: {
    marginLeft: 20,
    fontSize: 20,
    color: '#9CCC65',
  },
  num: {
    right: 150,
    position: 'absolute',
    fontSize: 20,
    color: '#4527A0',
  },
  percent: {
    right: 75,
    position: 'absolute',
    fontSize: 20,
    color: '#4527A0',
  },
  columnHeaderLeft:{
    fontSize: 15,
    textAlign: 'center',
    color: '#9CCC65',
    marginLeft: 20  
  },
  columnHeaderCenter:{
    fontSize: 15,
    textAlign: 'center',
    color: '#9CCC65',
    right: 150,  
  },
  columnHeaderRight:{
    fontSize: 15,
    textAlign: 'center',
    color: '#9CCC65',
    right: 75,  
  },
  checkin: {
    marginLeft: 20,
    fontSize: 20,
    color: '#4527A0',
  },
});

export default connect(mapStateToProps, {})(Trends);

 // categoryHash() {
  //   var categories = {};
  //   var catArray = [];
  //   for (var i = 0; i < this.state.checkins.length; i++) {
  //     if (categories[this.state.checkins[i]]) {
  //       categories[this.state.checkins[i]]++;
  //     } else {
  //         categories[this.state.checkins[i]] = 1;
  //     }
  //   }
  //   for (var category in categories) {
  //     catArray.push([category, categories[category]])
  //   }
  //   this.setState({
  //     categoryHash: catArray
  //   })
  //   console.log('HASHED ARRAY', this.state.categoryHash)
  // }
/*
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
*/
    // filterCategories() {
  //   console.log('FILTER INVOKED')
  //   var categories = [];
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
  //       var cat = responseJSON.category.split(',', 1);
  //       var str = cat[0].replace(/\W/g, '');
  //       var readCat = str.replace(/_/g, ' ');
  //       categories.push(readCat)
  //     })
  //     .catch((error) => console.log('error: ', error))
  //   })
  //   this.setState({
  //     checkins: categories
  //   })
  // console.log('trends state categories: ', this.state.checkins)
  // }

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