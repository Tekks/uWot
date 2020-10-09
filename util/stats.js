function getMemberCounts(client) {
	let memberCounts = {
		online: 0,
		offline: 0,
		bots: 0
	}

	client.guilds.cache.forEach((guild) => {
		memberCounts.offline += guild.memberCount
		memberCounts.online += guild.members.cache.filter(member => member.presence.status !== "offline").size
		memberCounts.bots += guild.members.cache.filter(member => member.user.bot === true).size
	});
	memberCounts.offline -= memberCounts.bots
	memberCounts.online -= memberCounts.bots

	return memberCounts
}

module.exports = {
	getMemberCounts
}