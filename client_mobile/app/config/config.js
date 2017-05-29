import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC_wWefnobu03O1VqD26EXxY_-_eyezaJg",
  authDomain: "memento-aed66.firebaseapp.com",
  databaseURL: "https://memento-aed66.firebaseio.com",
  projectId: "memento-aed66",
  storageBucket: "memento-aed66.appspot.com",
  messagingSenderId: "155137722701"
};

module.exports.firebaseApp = firebase.initializeApp(config);
module.exports.taskRef = firebase.database().ref('tasks');