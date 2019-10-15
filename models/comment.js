const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }, // store the user by reference
  post: { type: mongoose.Schema.ObjectId, ref: 'Post' }, // store the user by reference
  banned: Boolean
});


module.exports = mongoose.model('Comment', commentSchema);
