const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');
const Promise = require('bluebird');
Promise.promisifyAll(jwt); // promisify all the methods of `jwt`

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return next(new Error('Unauthorized'));
  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) throw new Error('Unauthorized');
      req.currentUser = user;
      next();
    })
    .catch(next); // send errors to errorHandler
}

module.exports = secureRoute;
