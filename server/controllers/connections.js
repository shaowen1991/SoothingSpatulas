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

module.exports.getByUser = (req, res) => {
  models.Connection.where({ users_a_id: req.params.id }).fetchAll()
    .then(connections => {
      res.status(200).send(connections);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.where({ email: req.body.email }).fetch()
    .then(userB => {
      if (!userB) {
        throw userB;
      }

      models.Connection.forge({
          users_a_id: req.body.id,
          users_b_id: userB.get('id'),
          connection_name: userB.get('first') + ' ' + userB.get('last')
        })
        .save()
        .then((result) => {

          models.User.where({ id: req.body.id }).fetch()
            .then(userA => {
              if (!userA) {
                throw userA;
              }

              return models.Connection.forge({
                  users_a_id: userB.get('id'),
                  users_b_id: userA.get('id'),
                  connection_name: userA.get('first') + ' ' + userA.get('last')
                })
                .save();
            });

            res.status(200).send(result);
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
    .then(connectionA => {
      if (!connectionA) {
        throw connectionA;
      }

      models.Connection.where({ users_a_id: connectionA.get('users_b_id'), users_b_id: connectionA.get('users_a_id') }).fetch()
        .then(connectionB => {
          if (!connectionB) {
            throw connectionB;
          }

          return connectionB.destroy();
        });

      return connectionA.destroy();
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
