const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) throw new Error('Unauthorized');
      // make a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '2h' });
      return res.json({ message: `Welcome back ${user.username}!`, token });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
