const { json } = require('express')
var express = require('express')
var router = express.Router()

// Influx -> % Arrow red, green and white

module.exports = function (client) {
  
  router.get('/', function (req, res, next) {

    var guilds = client.guilds.cache.size;
    var onlineMembers = 0
    var offlineMembers = 0
    client.guilds.cache.forEach((guild) => {
        var onlineSize = guild.members.cache.filter(member => member.presence.status !== "offline" && member.user.bot === false).size
        onlineMembers += onlineSize
        var offlineSize = guild.members.cache.filter(member => member.presence.status !== "online" && member.user.bot === false).size
        offlineMembers += offlineSize
    });

    res.setHeader("Content-Type", "application/json")
    res.json(
      {
        "frames": [
          {
            "text": guilds,
            "icon": "24552"
          },
          {
            "text": onlineMembers + offlineMembers,
            "icon": "40358"
          },
          {
            "text": onlineMembers,
            "icon": "40354"
          },
          {
            "text": offlineMembers,
            "icon": "40356"
          },
          {
            "icon": 858,
            "goalData": {
              "start": 0,
              "current": Math.round(onlineMembers/offlineMembers*100),
              "end": 100,
              "unit": "%"
            }
          },
        ]
      }
    )
  })

  return router

}

