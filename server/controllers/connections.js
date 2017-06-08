const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Connection.fetchAll()
    .then(connections => {
      res.status(200).send(connections);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.where({ email: req.params.email }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }

      models.Connection.forge({
          users_a_id: req.params.id,
          users_b_id: user.id,
          connection_name: user.first + ' ' + user.last
        })
        .save()
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });


};

module.exports.deleteOne = (req, res) => {
  models.Connection.where({ id: req.params.id }).fetch()
    .then(connection => {
      if (!connection) {
        throw connection;
      }
      return connection.destroy();
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
