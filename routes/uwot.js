var express = require('express');
var router = express.Router();

module.exports = function (client) {
  
  router.get('/', function (req, res, next) {
    res.render('uwot',
      {
        title: '🏗️ Under Construction'
      });
  });

  return router;
  
}