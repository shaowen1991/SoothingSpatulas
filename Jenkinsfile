#!/usr/bin/env groovy

node('master') {
  try {
    stage('Build'){
      checkout scm

      sh "yarn install"
    }

    stage('Test'){
      sh 'yarn test'
    }

    stage('Deploy'){
      echo 'deploy to Docker!'
    }

    stage('Cleanup'){
      sh 'rm -rf node_modules'
    }

  }
  catch (err) {
    throw err
  } finally {

  }
}
