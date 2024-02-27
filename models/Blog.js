const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Connect db
mongoose.connect('mongodb://localhost/blogosphere-connection-db');

// Create schema for model
const BlogSchema = new Schema({
  title: String,
  detail: String,
  author: String,
  article: String,
  like: {
    type: Number,
    default: 0,
  },
  image: Buffer,
  edited: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create model by using schema (ODM)
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
