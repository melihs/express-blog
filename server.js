const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (req, res ) => {
  const day  = new Date();
  const articles = [
    {
      title: 'test makale',
      createdAt: day.toDateString(),
      description: 'test description',
    },
    {
      title: 'test makale - 2',
      createdAt: day.toDateString(),
      description: 'test description  2',
    },
  ]
  res.render('index', { articles: articles })
});

app.listen(3000);