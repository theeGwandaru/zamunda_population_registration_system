var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/natural-persons', function (req, res, next) {
  //res.render('natural-persons', { pageName: 'natural persons page' })
  res.sendFile(path.join(__dirname, '../public/html/natural-persons.html'));
});

router.get('/legal-persons', function (req, res, next) {
  //res.render('legal-persons', { pageName: 'legal persons page' })
  res.sendFile(path.join(__dirname, '../public/html/legal-persons.html'));
});
module.exports = router;
