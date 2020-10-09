const { json } = require('express')
var express = require('express')
var router = express.Router()
var stats = require('../util/stats')

// Influx -> % Arrow red, green and white

module.exports = function (client) {

  router.get('/', function (req, res, next) {
    var guilds = client.guilds.cache.size
    var memberCounts = stats.getMemberCounts(client)

    res.setHeader("Content-Type", "application/json")
    res.json(
      {
        "frames": [
          {
            "text": guilds,
            "icon": "24552"
          },
          {
            "text": memberCounts.offline + memberCounts.online,
            "icon": "40358"
          },
          {
            "text": memberCounts.online,
            "icon": "40354"
          },
          {
            "text": memberCounts.offline,
            "icon": "40356"
          },
          {
            "icon": 858,
            "goalData": {
              "start": 0,
              "current": Math.round(memberCounts.online / (memberCounts.online + memberCounts.offline) * 100),
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

