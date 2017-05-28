'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Locations API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/locations', function (done) {
    request(app)
      .get('/api/locations')
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

  it('accepts GET requests to /api/locations/:id', function (done) {
    request(app)
      .get('/api/locations/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          category: res.body.category,
          latitude: res.body.latitude,
          longitude: res.body.longitude,
          name: res.body.name
        };
      })
      .expect(200, {
        id: 1,
        category: 'bar',
        latitude: '37.7749',
        longitude: '-122.4194',
        name: '21st Amendment Brewery'
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/locations/:id does not exist', function (done) {
    request(app)
      .get('/api/locations/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /api/locations', function (done) {
    request(app)
      .post('/api/locations')
      .send({
        category: 'business',
        latitude: '37.7749',
        longitude: '-122.4194',
        name: 'Stripe'
      })
      .expect(res => {
        res.body = {
          category: res.body.category,
          latitude: res.body.latitude,
          longitude: res.body.longitude,
          name: res.body.name
        };
      })
      .expect(201, {
        category: 'business',
        latitude: '37.7749',
        longitude: '-122.4194',
        name: 'Stripe'
      })
      .end(done);
  });

  it('accepts PUT requests to /api/locations/:id', function () {
    let location = {
      category: 'restaurant',
      latitude: '40.7749',
      longitude: '-130.4194',
      name: 'Subway'
    };

    return request(app)
      .put('/api/locations/1')
      .send(location)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/locations/1')
          .expect(res => {
            res.body = {
              category: res.body.category,
              latitude: res.body.latitude,
              longitude: res.body.longitude,
              name: res.body.name
            };
          })
          .expect(200, location);
      });
  });

  it('sends 404 if id on PUT requests to /api/locations/:id does not exist', function (done) {
    request(app)
      .put('/api/locations/123')
      .expect(404)
      .end(done);
  });

  it('accepts DELETE requests to /api/locations/:id', function (done) {
    request(app)
      .delete('/api/locations/1')
      .expect(200)
      .end(done);
  });

  it('sends 404 if id on DELETE requests to /api/locations/:id does not exist', function (done) {
    request(app)
      .delete('/api/locations/123')
      .expect(404)
      .end(done);
  });
});
