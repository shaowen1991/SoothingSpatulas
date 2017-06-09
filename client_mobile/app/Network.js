'use strict';

import React from 'react';
import { DeviceEventEmitter } from 'react-native';
var RNUploader = require('NativeModules').RNUploader;

const getTextComments = (cb) => {
  fetch('http://localhost:3000/api/locationsusers')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('GET locationsusers: ', responseJson);
      cb(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });  
};  

const postTextComments = (textComment, cb) => {
  console.log('post comment db');
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
  .then((responseJson) => {
    console.log('-------> Post comment db', responseJson);
    /* ----------------------------------------------------
    Invoke clearTextAndRating callback after data inserted
    ---------------------------------------------------- */
    cb();
  })
  .catch((error) => {
    console.error(error);
  });  
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

const postLocation = (location, cb) => {
  console.log('post location db');
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
    console.log('-------> post location db', responseJSON);
    cb(responseJSON.id);
  })
  .catch((error) => {
    console.error('-------> new location post error: ', error);
  });  
};

const getLocationId = (location, cb) => {
  fetch("http://localhost:3000/api/locations/name/" + location.name, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'            
    }
  })
  .then((response) => response.json())
  .then((responseJSON) => {
    console.log('-------> get location id: ', responseJSON);
    cb(responseJSON.id);
  })
  .catch((err) => {
    console.log('-------> location id fetch err: ', err);
    /* ----------------------------------------------------
      In this POST request, send new location info to DB
      and get the location object back from response, 
      which include the locationid
    ---------------------------------------------------- */
    postLocation(location, cb);
  })
};

const getNearbyPlaces = (searchTerm, lat, lng, addNearbyPlace) => {
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=200&keyword=${searchTerm}&key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc`)
  .then((response) => {
    if(response.status === 200) {
      response
      .text()
      .then((responseText) => {
        let parsedResults = JSON.parse(responseText).results
        
        for (let entry of parsedResults) {
          console.log('Entry: ', entry)
          addNearbyPlace(
            entry.geometry.location.lat,
            entry.geometry.location.lng,
            entry.name,
            entry.vicinity,
            '',
            entry.types
          )
        }
      })
      .catch(function (error) {
        console.log('addPOI error: ', error);
      })
    }
    else throw new Error('Something went wrong on api server!');
  })
  .catch(function(error) {
      console.log('error', error);
  })
}

export { 
  getTextComments,
  postTextComments,
  postAudioComments,
  postLocation,
  getLocationId,
  getNearbyPlaces
};

/* --------------------------------------
    In order to make uploader work
      react-native link
    If any can't find module, rebuild
-------------------------------------- */