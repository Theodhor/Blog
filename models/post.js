const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [1, 'Name must have at least 2 characters']
  },
  cathegory: {
    type: String,
    required: [true, 'This field is required']
  },
  author: { type: mongoose.Schema.ObjectId, ref: 'User' }, // store the user by reference
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
  likes: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ],
  content: [
    {
      text: String,
      image: String,
      imageDescription: String
    }
  ]
});


module.exports = mongoose.model('Post', postSchema);
