'use strict';
const path = require('path');
const exec = require('child_process').exec;

function asyncRecognize (filename, encoding, sampleRateHertz, languageCode) {
  /* -----------------------------------------------------
    Execute ffmpeg to convert original file format to flac
              And store it in the same directory
  -------------------------------------------------------- */
  const inputFilename = path.join(__dirname, '../service/user_audio/' + filename);
  const outputFilename = path.join(__dirname, '../service/user_audio_converted/' + filename.substring(0, filename.length - 3) + 'flac');
  
  exec('ffmpeg -i ' + inputFilename + ' -c:a flac ' + outputFilename,
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        // This error may include converted file already exist
        console.log('exec error: ' + error);
        return null;
      }
      else {
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
          encoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode
        };

        // Detects speech in the audio file. This creates a recognition job that you
        // can wait for now, or get its result later.
        speech.startRecognition(outputFilename, request)
          .then((results) => {
            const operation = results[0];
            // Get a Promise representation of the final result of the job
            return operation.promise();
          })
          .then((results) => {
            const transcription = results[0];
            console.log(`Transcription: ${transcription}`);
            return transcription;
          })
          .catch((err) => {
            console.error('ERROR:', err);
            return null;
          });
      }
    });
}

module.exports.asyncRecognize = asyncRecognize;

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