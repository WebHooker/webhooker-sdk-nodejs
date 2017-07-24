const url = require('url')
const request = require('request')

const Config = require('./Config')
const Message = require('./Message')

class WebhookerClient {
	/**
	 * Create a new Webhooker client with default parameters and the specified
	 * api key
	 * 
	 * @param {string} apiKey 
	 */
	static withKey(apiKey) {
		return new WebhookerClient(Config.withKey(apiKey)) 
	}
	
	/**
	 * Create a new Webhooker client.
	 * 
	 * @param {string} apiKey
	 */
	constructor(config) {
		this.config = config
	}

	send(method, path, message, callback) {
		let validMessage = message
		if (!validMessage instanceof Message) {
			validMessage = Message.fromObject(message)
		}

		const path = url.resolve(this.config.domain, validMessage.path)

		request(validMessage.getPath())
	}
}

module.exports = WebhookerClient
