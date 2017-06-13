'use strict';

import React from 'react';
import { DeviceEventEmitter } from 'react-native';
const RNUploader = require('NativeModules').RNUploader;

/* ----------------------------------
    Comments (locationsusers *)
---------------------------------- */
const getTextComments = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/locationsusers')
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('-------> GET locationsusers: ', responseJSON);
        resolve(responseJSON);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });  
  })
};  

const postTextComments = (textComment) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/locationsusers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: textComment.comment,
        latitude: textComment.latitude,
        longitude: textComment.longitude,
        rating: textComment.rating,
        user_id: textComment.user_id,
        name: textComment.name,
        location_id: textComment.location_id
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> POST comment db', responseJSON);
      resolve(responseJSON);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });  
  })
};

const postAudioComments = (filepath, filename) => {
  console.log(filepath);
  console.log(filename);
	let files = [
		{
			filename: filename,
			filepath: filepath,
      filetype: 'audio/acc'
		}
	];

	let opts = {
		url: 'http://localhost:3000/api/locationsusersaudio',
		files: files, 
		method: 'POST',                             
		headers: { 
      'Accept': 'audio/aac',
      'Content-Type': 'audio/aac'
    },
		// params: { 'user_id': 1 }               
	};

	RNUploader.upload(opts, (err, response) => {
		if( err ){
			console.log('RNUploader err:', err);
			return;
		}
  
		let status = response.status;
		let responseString = response.data;
		// let json = JSON.parse( responseString );

		console.log('upload complete with status ' + status);
    // console.log('post response: ', json);
	});
}

/* ----------------------------------
             Locations
---------------------------------- */
const postLocation = (location) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: location.category,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        city: location.city,
        state: location.state
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> POST location db', responseJSON);
      resolve(responseJSON.id);
    })
    .catch((error) => {
      console.logr('-------> new location POST error: ', error);
      reject(error);
    });  
  })
};

const getLocationId = (name) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/locations/name/" + name, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'            
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> GET location id: ', responseJSON);
      resolve(responseJSON.id);
    })
    .catch((error) => {
      console.log('-------> location id fetch error: ', error);
      reject(error);
    })
  })
};

const getNearbyPlaces = (searchTerm, lat, lng, addNearbyPlace) => {
  return new Promise((resolve, reject) => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=200&keyword=${searchTerm}&key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc`)
    .then((response) => {
      if(response.status === 200) {
        response
        .text()
        .then((responseText) => {
          let parsedResults = JSON.parse(responseText).results;
          resolve(parsedResults);
        })
        .catch((error) => {
          console.log('addPOI error: ', error);
        })
      }
      else throw new Error('Something went wrong on api server!');
    })
    .catch((error) => {
        console.log('error', error);
        reject(error);
    })
  })
}

/* ----------------------------------
                Users
---------------------------------- */
const getUserById = (user_id) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/users/' + user_id)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> GET user: ', responseJSON);
      resolve(responseJSON);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });  
  })
};  

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/users/email/" + email, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'            
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> GET login user data: ', responseJSON);
      resolve(responseJSON.id)
    })
    .catch((error) => {
      console.log('-------> user id fetch err: ', error);
      reject(error);
    })
  })
}

const postUser = (userLoginInfo) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/users/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLoginInfo)
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('-------> POST new user: ', responseJSON);
      resolve(responseJSON.id);
    })
    .catch((error) => {
      console.log('-------> new user POST error: ', error);
      reject(error)
    })    
  })
}

export { 
  getTextComments,
  postTextComments,
  postAudioComments,
  postLocation,
  getLocationId,
  getNearbyPlaces,
  getUserById,
  getUserByEmail,
  postUser
};

/* --------------------------------------
    In order to make uploader work
      react-native link
    If any can't find module, rebuild
-------------------------------------- */