const userOnlineStates = ["online", "idle", "dnd"]

function getMemberCounts(client) {
	const memberCounts = new Map()

	client.guilds.cache.forEach(guild => {
		let members = guild.members.cache
		let memberCount = guild.memberCount

		let users = members.filter(member => !member.user.bot)
		let onlineUserCount = users.filter(member => userOnlineStates.includes(member.presence.status)).size;
		let bots = members.filter(member => member.user.bot)
		let cachedBotCount = bots.size
		let onlineBotCount = bots.filter(member => userOnlineStates.includes(member.presence.status)).size

		memberCounts.set(guild.id, {
			total: memberCount,
			users: {
				total: memberCount - cachedBotCount,
				online: onlineUserCount,
				offline: memberCount - cachedBotCount - onlineUserCount
			},
			bots: {
				total: cachedBotCount,
				online: onlineBotCount,
				offline: cachedBotCount - onlineBotCount
			}
		})
	})

	const countValues = [...memberCounts.values()]
	const acc = valueExtractor => () => countValues.reduce((acc, val) => acc + valueExtractor(val), 0)

	memberCounts.total = acc(val => val.total)
	memberCounts.users = {
		total: acc(val => val.users.total),
		online: acc(val => val.users.online),
		offline: acc(val => val.users.offline)
	}
	memberCounts.bots = {
		total: acc(val => val.bots.total),
		online: acc(val => val.bots.online),
		offline: acc(val => val.bots.offline)
	}

	return memberCounts
}

module.exports = {
	getMemberCounts
}