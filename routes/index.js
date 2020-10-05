var express = require('express');
var router = express.Router();

module.exports = function (client) {

  router.get('/', function (req, res, next) {
    var guilds = client.guilds.cache.size;
    var onlineMembers = 0;
    var offlineMembers = 0;
    client.guilds.cache.forEach((guild) => {
        var onlineSize = guild.members.cache.filter(member => member.presence.status !== "offline" && member.user.bot === false).size;
        onlineMembers += onlineSize;
        var offlineSize = guild.members.cache.filter(member => member.presence.status !== "online" && member.user.bot === false).size;
        offlineMembers += offlineSize;
    });
    res.render('index',
      {
        title: '🏗️ Under Construction',
        subTitle: '🚧 This page is under construction 🚧',
        botId: client.user.id,
        onlineMembers: onlineMembers,
        guilds: guilds
      });
  });

  return router;

}
