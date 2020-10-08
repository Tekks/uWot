const { json } = require('express')
var express = require('express')
var router = express.Router()

// Influx -> % Arrow red, green and white

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

    res.setHeader("Content-Type", "application/json")
    res.json(
      {
        "frames": [
          {
            "text": guilds,
            "icon": "24552"
          },
          {
            "text": offlineMembersCount + onlineMembersCount,
            "icon": "40358"
          },
          {
            "text": onlineMembersCount,
            "icon": "40354"
          },
          {
            "text": offlineMembersCount,
            "icon": "40356"
          },
          {
            "icon": 858,
            "goalData": {
              "start": 0,
              "current": Math.round(onlineMembersCount / (onlineMembersCount + offlineMembersCount) * 100),
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

