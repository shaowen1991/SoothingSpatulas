const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.forge({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    photo_small: req.body.photo_small,
    photo_large: req.body.photo_large
  })
  .save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err => {
    if (err.constraint === 'users_email_unique') {
      return res.status(403);
    }
    res.status(500).send(err);
  });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      res.status(200).send(user);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getIdByEmail = (req, res) => {
  // select id from users where email = req.email;
  models.User.where({ email: req.params.email }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      res.status(200).send(user);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.save(req.body, { method: 'update' });
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
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.destroy();
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