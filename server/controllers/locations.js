const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Location.fetchAll()
    .then(locations => {
      res.status(200).send(locations);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Location.forge({
    category: req.body.category,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    name: req.body.name,
    city: req.body.city,
    state: req.body.state
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
  models.Location.where({ id: req.params.id }).fetch()
    .then(location => {
      if (!location) {
        throw location;
      }
      res.status(200).send(location);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getIdByName = (req, res) => {
  // select id from locations where name = req.name;
  models.Location.where({ name: req.params.user_id }).fetchAll()
    .then(locations => {
      if (!locations) {
        throw locations;
      }
      res.status(200).send(locations);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Location.where({ id: req.params.id }).fetch()
    .then(location => {
      if (!location) {
        throw location;
      }
      return location.save(req.body, { method: 'update' });
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
  models.Location.where({ id: req.params.id }).fetch()
    .then(location => {
      if (!location) {
        throw location;
      }
      return location.destroy();
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
