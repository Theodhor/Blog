const router = require('express').Router();
const authController = require('../controllers/auth');
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', usersController.index);

router.route('/user/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update);

router.route('/posts')
  .get(postsController.index)
  .post(secureRoute, postsController.create);

router.route('/posts/:id')
  .get(postsController.show)
  .put(secureRoute, postsController.update)
  .delete(secureRoute, postsController.delete);

router.post('/posts/:id/comments', secureRoute, commentsController.create);

router.route('/comments/:id')
  .get(commentsController.show)
  .post(secureRoute, commentsController.create)
  .delete(secureRoute, commentsController.delete);


router.route('/*')
  .all((req, res) => res.sendStatus(404));

module.exports = router;
