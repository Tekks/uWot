var express = require('express');
var router = express.Router();

module.exports = function (client) {

  router.get('/', function (req, res, next) {
    var guilds = client.guilds.cache.size
    var onlineMembersCount = 0
    var offlineMembersCount = 0
    var botCount = 0
    client.guilds.cache.forEach((guild) => {
      offlineMembersCount += guild.memberCount
      onlineMembersCount += guild.members.cache.filter(member => member.presence.status !== "offline").size
      botCount += guild.members.cache.filter(member => member.user.bot === true).size
    });
    offlineMembersCount -= botCount
    onlineMembersCount -= botCount
    res.render('index',
      {
        title: '🏗️ Under Construction',
        subTitle: '🚧 This page is under construction 🚧',
        botId: client.user.id,
        onlineMembers: offlineMembersCount + onlineMembersCount,
        guilds: guilds
      })
  })

  return router

}
