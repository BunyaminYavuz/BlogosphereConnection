const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const multer = require('multer');
const blogControllers = require('./controllers/blogControllers');
const pageControllers = require('./controllers/pageControllers');
const Blog = require('./models/Blog');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE (STATIC FILES)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

//                    ROUTES
// 1.CRUD
app.get('/', blogControllers.getAllBlogs);
app.get('/posts/:id', blogControllers.getBlog);
app.post('/blogs', blogControllers.createBlog);
app.put('/posts/:id', blogControllers.updateBlog);
app.delete('/posts/:id', blogControllers.deleteBlog);

// 2.PAGES
app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPAge);
app.get('/posts/update/:id', pageControllers.getUpdatePage);

app.get('/posts/like/:id', async (req, res) => {
  const post = await Blog.findById(req.params.id);

  post.like += 1;
  await post.save();

  res.redirect(`/posts/${req.params.id}`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The serves has been started at port ${port}`);
});
