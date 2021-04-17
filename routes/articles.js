const express = require('express');
const article = require('./../models/article');
const Article = require('./../models/article');
const router = express.Router();

// index
router.get('/new', (req, res) => {
  res.render('articles/new', {article: new Article()})
});

// create
router.post('/', async (req, res, next) => {
  req.article = new Article();
  next();
}, saveArticleAndRedirect('new'))

// show
router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({slug: req.params.slug});
  if(article === null) res.redirect('/'); 
  res.render('articles/show', {article: article});
});


// edit
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', {article: article});
});

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  next();
}, saveArticleAndRedirect('edit'));


// delete
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

function saveArticleAndRedirect (path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      console.log(e);
      res.render(`articles/${path}`, {article: article})
    }
  }
}

module.exports = router;