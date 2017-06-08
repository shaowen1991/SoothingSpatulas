#!/usr/bin/env groovy

node('master') {
  try {
    stage('build'){
      checkout scm
      sh 'yarn'
    }

    stage('deploy'){
      sh 'yarn run docker-down; \
          yarn run docker-build; \
          yarn run docker-up'
    }

  }
  catch (err) {
    throw err
  } finally {

  }
}