const express = require('express');
const ejs = require('ejs');

const Blog = require('./models/Blog');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE (STATIC FILES)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/blogs', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`The serves has been started at port ${port}`);
});
