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

const postTextComments = (textComment) => {
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
      user_id: textComment.user_id
    })
  })
};


const postAudioComments  = (filepath, filename) => {
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
		method: 'POST',                             // optional: POST or PUT
		headers: { 
      'Accept': 'audio/aac',
      'Content-Type': 'audio/aac'
    },
		// params: { 'user_id': 1 }                 // optional
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

export { 
  getTextComments,
  postTextComments,
  postAudioComments
};

/* --------------------------------------
    In order to make uploader work
      react-native link
    If any can't find module, rebuild
-------------------------------------- */