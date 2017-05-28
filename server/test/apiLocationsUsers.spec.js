'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('LocationsUsers API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/locationsusers', function (done) {
    request(app)
      .get('/api/locationsusers')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 1
      })
      .end(done);
  });

  it('accepts GET requests to /api/locationsusers/:id', function (done) {
    request(app)
      .get('/api/locationsusers/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          comment: res.body.comment,
          latitude: res.body.latitude,
          longitude: res.body.longitude,
          rating: res.body.rating,
          id: res.body.id,
          created_at: !!Date.parse(res.body.created_at)
        };
      })
      .expect(200, {
        id: 1,
        comment: 'great place!',
        latitude: '37.7749',
        longitude: '-122.4194',
        rating: 10,
        id: 1,
        created_at: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/locationsusers/:id does not exist', function (done) {
    request(app)
      .get('/api/locationsusers/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /api/locationsusers', function (done) {
    request(app)
      .post('/api/locationsusers')
      .send({
        comment: 'pretty good!',
        latitude: '35.7749',
        longitude: '-121.4194',
        rating: 7,
        user_id: 1
      })
      .expect(res => {
        res.body = {
          comment: res.body.comment,
          latitude: res.body.latitude,
          longitude: res.body.longitude,
          rating: res.body.rating,
          user_id: res.body.user_id
        };
      })
      .expect(201, {
        comment: 'pretty good!',
        latitude: '35.7749',
        longitude: '-121.4194',
        rating: 7,
        user_id: 1
      })
      .end(done);
  });

  it('accepts PUT requests to /api/locationsusers/:id', function () {
    let locationuser = {
      comment: 'awesome place!',
      latitude: '40.7749',
      longitude: '-130.4194',
      rating: 7
    };

    return request(app)
      .put('/api/locationsusers/1')
      .send(locationuser)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/locationsusers/1')
          .expect(res => {
            res.body = {
              comment: res.body.comment,
              latitude: res.body.latitude,
              longitude: res.body.longitude,
              rating: res.body.rating
            };
          })
          .expect(200, locationuser);
      });
  });

  it('sends 404 if id on PUT requests to /api/locationsusers/:id does not exist', function (done) {
    request(app)
      .put('/api/locationsusers/123')
      .expect(404)
      .end(done);
  });

  it('accepts DELETE requests to /api/locationsusers/:id', function (done) {
    request(app)
      .delete('/api/locationsusers/1')
      .expect(200)
      .end(done);
  });

  it('sends 404 if id on DELETE requests to /api/locationsusers/:id does not exist', function (done) {
    request(app)
      .delete('/api/locationsusers/123')
      .expect(404)
      .end(done);
  });
});
