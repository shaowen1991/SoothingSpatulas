'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Users API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/users', function (done) {
    request(app)
      .get('/api/users')
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

  it('accepts GET requests to /api/users/:id', function (done) {
    request(app)
      .get('/api/users/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          first: res.body.first,
          last: res.body.last,
          email: res.body.email,
          created_at: !!Date.parse(res.body.created_at)
        };
      })
      .expect(200, {
        id: 1,
        first: 'System',
        last: 'Admin',
        email: 'admin@domain.com',
        created_at: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/users/:id does not exist', function (done) {
    request(app)
      .get('/api/users/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /api/users', function (done) {
    request(app)
      .post('/api/users')
      .send({
        first: 'Keanu',
        last: 'Reeves',
        email: 'neo@matrix.com'
      })
      .expect(res => {
        res.body = {
          first: res.body.first,
          last: res.body.last,
          email: res.body.email
        };
      })
      .expect(201, {
        first: 'Keanu',
        last: 'Reeves',
        email: 'neo@matrix.com'
      })
      .end(done);
  });

  it('accepts PUT requests to /api/users/:id', function () {
    let user = {
      first: 'James',
      last: 'Davenport',
      email: 'example@email.com'
    };

    return request(app)
      .put('/api/users/1')
      .send(user)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/users/1')
          .expect(res => {
            res.body = {
              first: res.body.first,
              last: res.body.last,
              email: res.body.email
            };
          })
          .expect(200, user);
      });
  });

  it('sends 404 if id on PUT requests to /api/users/:id does not exist', function (done) {
    request(app)
      .put('/api/users/123')
      .expect(404)
      .end(done);
  });

  it('accepts DELETE requests to /api/users/:id', function (done) {
    request(app)
      .delete('/api/users/1')
      .expect(200)
      .end(done);
  });

  it('sends 404 if id on DELETE requests to /api/users/:id does not exist', function (done) {
    request(app)
      .delete('/api/users/123')
      .expect(404)
      .end(done);
  });
});
