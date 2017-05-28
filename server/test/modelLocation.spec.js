const expect = require('chai').expect;
const Location = require('../../db/models/locations.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Location model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    Location.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        expect(results.at(0).get('category')).to.equal('bar');
        expect(results.at(0).get('latitude')).to.equal('37.7749');
        expect(results.at(0).get('longitude')).to.equal('-122.4194');
        expect(results.at(0).get('name')).to.equal('21st Amendment Brewery');
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  // it('Should verify that all usernames are unique', function (done) {
  //   // Insert a user with a username that's already in existence
  //   Location.forge({ username: 'TestUser1', password: 'abc' }).save()
  //     .then(function (result) {
  //       done(new Error('was not supposed to succeed'))
  //     })
  //     .catch(function (err) {
  //       expect(err).to.be.an('error');
  //       expect(err).to.match(/duplicate key value violates unique constraint/);
  //       done();
  //     });
  // });

  it('Should be able to update an already existing record', function (done) {
    Location.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return Location.where({ id: 1 }).save({ latitude: '40.0112', longitude: '-123.4112', category: 'restaurant' }, { method: 'update' });
      })
      .then(function () {
        return Location.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('latitude')).to.equal('40.0112');
        expect(result.get('longitude')).to.equal('-123.4112');
        expect(result.get('category')).to.equal('restaurant');
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  it('Should be able to delete a record', function (done) {
    // Inserts a user
    Location.where({ id: 1 }).destroy()
      // verifies that the user has been inserted
      .then(function () {
        return Location.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

});
