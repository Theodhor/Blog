const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .sort({ name: 1 })
    .exec()
    .then(posts => res.json(posts))
    .catch(next); // send errors to errorHandler
}


function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('following followers posts')
    .exec()
    .then(user => {
      if(!user) throw new Error('404');
      return res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute,
  index: indexRoute
};
