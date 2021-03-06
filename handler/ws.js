var path = require('path')
var express = require('express');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

/**
 * Websocket
 * @param {number}         port
 * @param {discord.Client} client 
 */
class WebSocket {

  constructor(port, client) {
    this.port = port
    this.client = client
    this.app = express()

    // Engine   
    this.app.set('views', path.join(__dirname, '/../views'));
    this.app.set('view engine', 'ejs');

    //this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '/../public')));

    this.registerRoots()

    this.server = this.app.listen(port, () => {
      console.log("Websocket API set up at port " + this.server.address().port)
    })
  }

  registerRoots() {
    
    // Search Engines
    this.app.get('/robots.txt', function (req, res) {
      res.type('text/plain');
      res.send("User-agent: *\nDisallow: /");
    });

    // Router
    this.app.use('/', require('../routes/index')(this.client));
    this.app.use('/commands', require('../routes/commands')(this.client));
    this.app.use('/api/lametric/uwot/poll', require('../routes/api')(this.client));
    this.app.use('/api/lametric/uwot/push', require('../routes/callback')(this.client));

    // Error Handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    this.app.use(function (err, req, res, next) {
      res.render('error',
      {
        title: 'About Me | Error',
        subTitle: 'About Me | Error',
        err: err
      });
    });

  }
}

module.exports = WebSocket