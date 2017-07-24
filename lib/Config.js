class Config {
	/**
	 * Create a new configuration object with the default webhooker domain
	 * 
	 * @param {string} apiKey The api key to send with webhooker requests
	 */
	static withKey(apiKey) {
		return new Config(apiKey, 'https://api.webhooker.io')
	}
	/**
	 * Create a new configuration object
	 * 
	 * @param {string} apiKey The api key to send with webhooker requests
	 * @param {string} domain The domain name to send webhooker requests to
	 */
	constructor(apiKey, domain) {
		this.apiKey = apiKey
		this.domain = domain
	}
}

module.exports = Config
