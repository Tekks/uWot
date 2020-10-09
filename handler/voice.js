const isStream = require('is-stream')

class VoiceUtil {

	constructor() {
		this.volume = 5
	}

	getVoiceChannel(client, userId) {
		let voiceChannel
		client.guilds.cache.forEach(guild => {
			let member = guild.member(userId)
			if (member && !voiceChannel) {
				voiceChannel = member.voice.channel
			}
		})
		return voiceChannel
	}

	// getVoiceChannel(client, user) {
	// 	let member
	// 	client.guilds.cache.forEach(guild => {
	// 		if (!member) member = guild.member(user.id)
	// 	})
	// 	return member.voice.channel
	// }

	async connectVoiceChannel(channel) {
		if (!channel) return Promise.reject('Invalid channel')
		if (!channel.joinable) return Promise.reject('No permissions to join voice channel')

		this.connection = channel.join()

		this.connection
				.then(connection => this.connection = connection)
				.catch(console.error)

		return this.connection
	}

	async disconnectVoice() {
		if (!this.connection) return

		await this.stopAudio()

		this.connection.channel.leave()
		this.connection = null
	}

	async playAudio(source, leaveOnEnd) {
		if (!this.connection) return

		if (this.playing) await this.stopAudio()

		this.dispatcher = this.connection.play(source)

		this.dispatcher.on('error', console.error);

		this.dispatcher.setVolume(this.volume / 10)
		
		this.dispatcher.on('finish', () => {
			if (isStream(source) && source.stop) {
				source.stop()
			}

			if (leaveOnEnd) {
				this.disconnectVoice()
			}

			this.dispatcher = null
		})

		return this.dispatcher
	}

	async stopAudio() {
		if (!this.playing) return

		this.dispatcher.end()
		this.dispatcher = null
	}

	async pauseAudio() {
		if (!this.playing) return

		this.dispatcher.pause()
	}

	async resumeAudio() {
		if (!this.playing) return

		this.dispatcher.resume()
	}

	async setVolume(volume) {
		this.volume = volume

		if (this.playing) {
			this.dispatcher.setVolume(volume / 10)
		}
	}

	get channel() {
		return this.connection ? this.connection.channel : null
	}

	get playing() {
		return !!this.dispatcher
	}

	get duration() {
		return this.playing ? this.dispatcher.time : -1
	}
}

module.exports = VoiceUtil