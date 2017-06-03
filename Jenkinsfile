#!/usr/bin/env groovy

node('master') {
  try {
    stage('build'){
      checkout scm
      sh 'yarn'
    }

    stage('deploy'){
      sh 'docker-compose down 2>/dev/null; \
          docker build -t momento-image .; \
          docker-compose up -d; \
          docker ps -a; \
          docker images; \
          docker network ls'
    }

    stage('test'){
      sh 'docker exec -it momento sh; \
          yarn test; \
          exit'
    }

  }
  catch (err) {
    throw err
  } finally {

  }
}
