'use strict';

const express = require('express');

const db = {
  posts: [{
    submitter: 'stanleypaddles',
    title: 'Baby goat introduces himself to a horse',
    topic: 'awww',
    url: 'https://i.imgur.com/0NQmvQ7.gifv',
    votes: 1
  }, {
    submitter: 'stanleypaddles',
    title: 'React: Design Principles',
    topic: 'reactjs',
    url: 'https://facebook.github.io/react/contributing/design-principles.html',
    votes: 1
  }]
};



// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/posts', (_req, res) => {
  res.send(db.posts);
});

module.exports = router;

router.post('/posts', (req, res) => {
  db.posts.push(req.body);

  res.send(req.body);
});
