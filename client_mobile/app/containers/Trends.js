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
import Constants from '../Constants.js'
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

      fetch("https://activesort.com/api/locationsusers/user/" + this.props.useridReducer, {
        method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('USERID IN TRENDS: ', this.props.useridReducer)
        // console.log('LOCATIONUSERS RESPONSE: ', responseJSON.rows)
        for (var i = 0; i < responseJSON.rows.length; i++) {
          if (responseJSON.rows[i].category) {
            var cat = responseJSON.rows[i].category.split(',', 1);
            var str = cat[0].replace(/\W/g, '');
            var readCat = str.replace(/_/g, ' ');
            categoriesArray.push(readCat + 's');
          } else {
            categoriesArray.push('other')
          }
        }
        // console.log('categoriesArray', categoriesArray)
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
        // console.log('CAT ARRAY: ', catArray)
        this.setState({
          userCategories: catArray
        })
      })
      .catch((error) => console.log('TRENDS ERROR', error))
        
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
                  <Text style={styles.category}>{category[0]}</Text>
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
    marginBottom: '2%',
    fontFamily: Constants.TEXT_FONT
  },
  trendsHeader: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '1%'
  },
  row: {
    flexDirection: 'row',
    marginTop: 15
  },
  category: {
    marginLeft: 20,
    fontSize: 20,
    color: '#9CCC65',
    // fontFamily: Constants.TEXT_FONT
  },
  num: {
    right: 150,
    position: 'absolute',
    fontSize: 20,
    color: '#4527A0',
    // fontFamily: Constants.TEXT_FONT
  },
  percent: {
    right: 75,
    position: 'absolute',
    fontSize: 20,
    color: '#4527A0',
    // fontFamily: Constants.TEXT_FONT
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
    // fontFamily: Constants.TEXT_FONT
  },
});

export default connect(mapStateToProps, {})(Trends);