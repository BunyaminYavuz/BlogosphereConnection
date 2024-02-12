const express = require('express');
const ejs = require('ejs');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE (STATIC FILES)
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.render('about')
});

app.get('/add_post', (req, res) => {
  res.render('add_post')
});

const port = 3000;
app.listen(port, () => {
  console.log(`The serves has been started at port ${port}`);
});
