const knex = require('knex')(require('../../knexfile'));

module.exports.getAll = (req, res) => {
  var email = req.query.email;
  knex('users')
    .where('email', email)
    .then((data) => {

      var subquery = knex('connections').where('users_a_id', data[0].id).andWhere('status', 'accept').select('users_b_id');
      knex('users')
        .where('id', 'in', subquery)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(err => {
          console.log("err", err);
          // This code indicates an outside service (the database) did not respond in time
          res.status(503).send(err);
        })



    })
    .catch(err => {
      console.log(err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })
}


module.exports.getUser = (req, res) => {
  var email = req.query.email;
  knex('users')
    .where('email', email)
    .then((data) => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log("err", err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })

}


module.exports.getOtherUser = (req, res) => {
  var user = req.query.user;
  knex('users')
    .where('id', user)
    .then((data) => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log("err", err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })

}
