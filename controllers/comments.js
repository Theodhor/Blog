const Comment = require('../models/comment');

function showRoute(req, res, next) {
  Comment
    .findById(req.params.id)
    .populate('author comments likes')
    .exec()
    .then(comment => {
      if(!comment) throw new Error('Not Found');
      return res.json(comment);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Comment
    .create(req.body)
    .then(comment => res.status(201).json(comment))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Comment
    .findById(req.params.id)
    .exec()
    .then(comment => comment.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createRoute,
  delete: deleteRoute
};
