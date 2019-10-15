const Post = require('../models/post');

function indexRoute(req, res, next) {
  Post
    .find()
    .sort({ name: 1 })
    .exec()
    .then(posts => res.json(posts))
    .catch(next); // send errors to errorHandler
}

function showRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .populate('author comments likes')
    .exec()
    .then(post => {
      if(!post) throw new Error('Not Found');
      return res.json(post);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Post
    .create(req.body)
    .then(post => res.status(201).json(post))
    .catch(next);
}

function updateRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => post.set(req.body))
    .then(post => post.save())
    .then(post => res.json(post))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => post.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
