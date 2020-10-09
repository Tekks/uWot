var express = require('express')
var router = express.Router()
var stats = require('../util/stats')

module.exports = function (client) {
  router.get('/', function (req, res, next) {
    var guilds = client.guilds.cache.size
    var memberCounts = stats.getMemberCounts(client)
    
    res.render('index',
      {
        title: '🏗️ Under Construction',
        subTitle: '🚧 This page is under construction 🚧',
        botId: client.user.id,
        onlineMembers: memberCounts.offline + memberCounts.online,
        guilds: guilds
      })
  })

  return router

}
