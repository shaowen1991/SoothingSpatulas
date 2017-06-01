'use strict';

import React from 'react';
import FileUpload from 'react-native-file-upload';

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
        // comment: 'This is Jack from HR!',
        // latitude: '66.6666',
        // longitude: '-99.4223',
        // rating: 5,
        // user_id: 1
      })
    })
};


const fileUpload = (filePath) => {
  var obj = {
      uploadUrl: 'http://localhost:3000/api',
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: {
        'Accept': 'application/json',
      },
      fields: {
          'hello': 'world',
      },
      files: [
        {
          name: 'one', // optional, if none then `filename` is used instead
          filename: 'one.w4a', // require, file name
          filepath: '/xxx/one.w4a', // require, file absoluete path
          filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
        },
      ]
  };
  FileUpload.upload(obj, function(err, result) {
    console.log('upload:', err, result);
  })
}

export { getTextComments, postTextComments };