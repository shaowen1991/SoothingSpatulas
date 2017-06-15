const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

module.exports.getAll = (req, res) => {
  models.LocationUser.fetchAll()
    .then(locationsUsers => {
      res.status(200).send(locationsUsers);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getAllByUserId = (req, res) => {
knex.schema.raw('select locations_users.user_id, locations_users.name, locations_users.location_id, locations.category from locations_users left outer join locations on locations_users.location_id = locations.id where locations_users.user_id = ' + req.params.id)
  .then((categories) => {
    res.status(200).send(categories);
  })
  .catch(err => {
    console.log('err', err);
    // This code indicates an outside service (the database) did not respond in time
    res.status(503).send(err);
  })
};

module.exports.create = (req, res) => {
  console.log(req.body);
  models.LocationUser.forge({
    comment: req.body.comment,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rating: req.body.rating,
    user_id: req.body.user_id,
    name: req.body.name,
    location_id: req.body.location_id
  })
  .save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err => {
    res.status(500).send(err);
  });
};

module.exports.getOne = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      res.status(200).send(locationUser);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      return locationUser.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      return locationUser.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
