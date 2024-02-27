const multer = require('multer');
const Blog = require('../models/Blog');

const upload = multer();

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort('-dateCreated');
  res.render('index', {
    blogs,
  });
};

exports.getBlog = async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createBlog = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error
        console.error('Multer hatası:', err);
        res.status(400).send('Dosya yükleme sırasında bir hata oluştu.');
        return;
      } else if (err) {
        // Other errors
        console.error('Bilinmeyen bir hata:', err);
        res.status(500).send('Bir hata oluştu, lütfen tekrar deneyin.');
        return;
      }

      // Data from form
      const { title, detail, author, article } = req.body;

      // Outcoming image from buffer
      const imageBuffer = req.file.buffer;

      await Blog.create({
        title,
        detail,
        author,
        article,
        image: imageBuffer, 
      });

      res.redirect('/');
    });
  } catch (error) {
    console.error('An error occurred while creating the blog:', error);
    res.status(500).send('An error occurred, please try again.');
  }
};

exports.updateBlog = async (req, res) => {
  const post = await Blog.findById(req.params.id);

  post.title = req.body.title;
  post.detail = req.body.detail;
  post.article = req.body.article;
  post.edited = true;

  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.redirect('/');
};
