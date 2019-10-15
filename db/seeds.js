const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Post = require('../models/post');

let seededUsers, seededPosts = [];

mongoose.connectAsync(dbURI)
  .then(db => db.dropDatabase())
  .then(() => User.create({
    username: 'Theo',
    email: 'theo@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'Gabriella',
    email: 'gabi@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  }))
  .then((users) => seededUsers = users)
  .then(() => Post.create({
    title: 'My first Blog',
    cathegory: 'Computers',
    author: seededUsers[0],
    content: [
      {
        text: 'Welcome to my first blog',
        image: 'https://horderly.com/wp-content/uploads/2017/02/HELLO-WELCOME-1-1080x675.jpg',
        imageDescription: 'An example of an image descritpion'
      }
    ]
  }))
  .then((posts) => seededPosts = posts)

  .then(() => console.log(seededUsers, seededPosts))

  .then(() => console.log('***** Database seeded! *****'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
