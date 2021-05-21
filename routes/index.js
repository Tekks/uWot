const config = require('../config.js')
var express = require('express')
var router = express.Router()
var stats = require('../util/stats')

module.exports = function (client) {
  
  router.get('/', function (req, res, next) {
    var guilds = client.guilds.cache.size
    var memberCounts = stats.getMemberCounts(client)
    res.render('index',
      {
        title: 'About Me | Main',
        subTitle: 'About Me | Main',
        botId: config.discord.invite,
        totalUsers: memberCounts.users.total(),
        guilds: guilds
      })
  })

  return router

}