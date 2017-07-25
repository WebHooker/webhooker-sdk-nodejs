const api = require('./api')
const map = require('./mappers')

const Config = require('./Config')
const Message = require('./Message')

/**
 * The callback provided to methods that utilise the Webhooker api. When a 
 * WebhookerCallback is accepted, it can instead be omitted to cause the called
 * function to return a Promise
 * @callback WebhookerCallback 
 * 
 * @param {Error} err If there was an error, this value will be the
 * corresponding error object. Otherwise, it will be nul
 * @param {Object} response The api response from webhooker. This will contain 
 * different information depending on the request being made
 */

 /**
  * The API client used to send requests to the webhooker api
  */
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
	 * @param {Config} config A config object that provides API information to
	 * the client. Can be used to customise the domain, in case it differs from
	 * the standard webhooker api
	 */
	constructor(config) {
		this.config = config
	}
	
	/**
	 * Send a message payload to Webhooker, which will then send the payload
	 * to the matching subscribers
	 * 
	 * @param {Message | MessageObject} message 
	 * @param {WebhookerCallback=} callback A callback that will be triggered
	 * when the request has completed. If this is omitted, the function will
	 * instead return a promise
	 * @return {Promise} A promise that will resolve when the request has
	 * completed. If there was an error, the promise will be rejected. 
	 * Otherwise it will be resolved with the server response. Only returned
	 * when `callback` is null or undefined
	 */
	send(message, callback) {
		let validMessage = message
		if (!(validMessage instanceof Message)) {
			validMessage = Message.from(message)
		}

		return this._getBaseRequest()
			.endpoint('messages')
			.body(validMessage.toPayload())
			.response(map.toMessage(validMessage))
			.send(callback)
	}

	_getBaseRequest() {
		return api()
			.domain(this.config.domain)
			.header('X-API-Key', this.config.apiKey)
	}
}

module.exports = WebhookerClient
