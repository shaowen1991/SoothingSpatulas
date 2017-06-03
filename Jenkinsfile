#!/usr/bin/env groovy

node('master') {
  try {
    stage('build'){
      checkout scm
      sh 'yarn'
    }

    //stage('test'){
    // sh 'yarn test'
    //}

    stage('deploy'){
      sh 'echo "Clear momento-app container and image"'
      sh 'docker ps -a'
      sh 'docker images'
      sh 'docker network disconnect momento-net momento 2>/dev/null'
      sh 'docker stop momento 2>/dev/null'
      sh 'docker rm momento 2>/dev/null'
      sh 'docker rmi momento-image 2>/dev/null'
      sh 'docker ps -a'
      sh 'docker images'

      sh 'echo "Build momento-image and start container"'
      sh 'docker build -t momento-image .'
      sh 'docker run --name momento -p 3000:3000 -d momento-image'

      sh 'echo "Connect momento-app container to network"'
      sh 'docker network connect momento-net momento 2>/dev/null'
      sh 'docker network inspect momento-net 2>/dev/null'
      sh 'docker network ls'
    }

  }
  catch (err) {
    throw err
  } finally {

  }
}
