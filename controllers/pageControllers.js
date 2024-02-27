const Blog = require('../models/Blog');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPAge = (req, res) => {
  res.render('add_post');
};

exports.getUpdatePage = async (req, res) => {
  const post = await Blog.findById(req.params.id);

  res.render('update', {
    post,
  });
};
