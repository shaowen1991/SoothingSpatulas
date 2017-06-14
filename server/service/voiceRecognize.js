'use strict';
const path = require('path');
const exec = require('child_process').exec;

module.exports.voiceRecognize = (filename) => {
  /* -----------------------------------------------------
    Execute ffmpeg to convert original file format to flac
      And store it in the user_audio_converted directory
  -------------------------------------------------------- */
  const inputFilename = path.join(__dirname, '../service/user_audio/' + filename);
  const outputFilename = path.join(__dirname, '../service/user_audio_converted/' + filename.substring(0, filename.length - 3) + 'flac');

  //ffmpeg -i ./resources/temp.aac -y ./resources/temp.flac -ar 16000
  return new Promise((resolve, reject) => {
    exec('ffmpeg -i ' + inputFilename + ' -y ' + ' -ar 16000 ' + outputFilename,
      (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          // This error may include converted file already exist
          console.log('exec error: ' + error);
          reject(err);
          return;
        }
        /* ----------------------------------
         Call Google Speech API with promise 
        ---------------------------------- */
        else {
          syncRecognize(outputFilename)
          .then((transcription) => {
            resolve(transcription);
          })
          .catch((err) => {
            reject(err);
          })
        }
      }
    )
  })
}

const syncRecognize = (filename) => {
  /* -----------------------------------------------------
                      Google Speech API
  -------------------------------------------------------- */  
  console.log('start recognizing');

  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  /* -----------------------------------------------------
    The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
    const filename = '/path/to/audio.raw';

    The encoding of the audio file, e.g. 'LINEAR16'
    const encoding = 'LINEAR16';

    The sample rate of the audio file in hertz, e.g. 16000
    const sampleRateHertz = 16000;

    The BCP-47 language code to use, e.g. 'en-US'
    const languageCode = 'en-US';
  -------------------------------------------------------- */     
  const request = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  };

  return new Promise((resolve, reject) => {   
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    speech.recognize(filename, request)
    .then((results) => {
      const transcription = results[0];
      resolve(transcription);
    })
    .catch((err) => {
      reject(err);
    });
  })
}
/* ------------------------------------------------
                      Setup
Set the GCLOUD_PROJECT environment variable:

Linux:

 export GCLOUD_PROJECT=169105
 
Windows:

 set GCLOUD_PROJECT=your-project-id

Windows (PowerShell):

 $env:GCLOUD_PROJECT="your-project-id"                      

export GOOGLE_APPLICATION_CREDENTIALS=../Momento-300463bf99db.json

brew install ffmpeg 

------------------------------------------------ */