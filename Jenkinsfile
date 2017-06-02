#!/usr/bin/env groovy

node('master') {
  try {
    stage('Build'){
      echo 'INSTALLING...'
      checkout scm
      sh "yarn install"
    }

    stage('Test'){
      echo 'TESTING...'
      sh 'yarn test'
    }

    stage('Deploy'){
      echo 'DEPLOYING...'
      sh 'export NODE_ENV=production'
      sh 'docker ps -a'
      sh 'docker images'


      echo 'Clear momento-app container and image'
      sh 'docker network disconnect momento-nw momento-app 2>/dev/null'
      sh 'docker stop momento-app 2>/dev/null'
      sh 'docker rm momento-app 2>/dev/null'
      sh 'docker rmi imomento-app 2>/dev/null'
      sh 'docker ps -a'
      sh 'docker images'


      echo 'Build momento-app image and start container'
      sh 'docker build -t imomento-app -f Dockerfile.application .'
      sh 'docker run --name momento-app -p 3000:3000 -d imomento-app'


      echo 'NOTE 1: manually set network and database up from the beginning'
      echo 'see docker_details/dockerSolution.txt for more details'
      echo 'NOTE 2: manually migrate and seed database as necessary'
      echo 'in particular use "docker exec -it momento-db sh" to access database'
      echo 'see docker_details/dockerDetails.txt'


      echo 'Connect momento-app container to network'
      sh 'docker network connect momento-nw momento-app'
      sh 'docker network inspect momento-nw 2>/dev/null'
      sh 'docker network ls'
    }

  }
  catch (err) {
    throw err
  } finally {

  }
}