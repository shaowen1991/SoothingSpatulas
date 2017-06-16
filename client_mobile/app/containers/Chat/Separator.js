import React, { Component } from 'react';
import { 
	View,  
	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4'
  }
});

class Separator extends React.Component{
	render(){
		// console.log("SEPA SEPA");
		return (
			<View style={styles.separator} />
		);
	}
};

module.exports = Separator;