#!/usr/bin/env groovy

node('master') {
  try {
    stage('Build'){
      echo 'INSTALLING...'
      checkout scm
      sh "yarn"
    }

    stage('Test'){
      echo 'TESTING...'
      sh 'yarn test'
    }

    stage('Deploy'){
      echo 'DEPLOYING...'
      sh 'docker ps -a'
      sh 'docker images'


      echo 'Clear momento-app container and image'
      sh 'docker network disconnect momento-net momento 2>/dev/null'
      sh 'docker stop momento 2>/dev/null'
      sh 'docker rm momento 2>/dev/null'
      sh 'docker rmi momento-image 2>/dev/null'
      sh 'docker ps -a'
      sh 'docker images'


      echo 'Build momento-image and start momento'
      sh 'docker build -t momento-image .'
      sh 'docker run --name momento -p 3000:3000 -d momento-image'


      echo 'NOTE 1: manually set network and database since no compose file used'
      echo 'see docker_details/dockerSolution.txt for more details'
      echo 'NOTE 2: manually migrate and seed database as necessary'
      echo 'in particular use "docker exec -it momento sh" to set database'
      echo 'see docker_details/dockerSolution.txt for more details'


      echo 'Connect momento-app container to network'
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
