const JSON_KEY = 'application/json'
const XML_KEY = 'application/xml'

class Message {
	/**
	 * Hydrate a new unsent message from the provided portable object
	 * 
	 * @param {object} params 
	 * @param {string} params.tenant The tenant key that will be used to filter
	 * this message
	 * @param {string} params.type The event name/type that this message will
	 * be sent as
	 * @param {object} params.payloads
	 * @param {string=} params.payloads.json The string encoded json body
	 * @param {string=} params.payloads.xml The string encoded xml body
	 */
	static from(params) {
		return new Message(
			null,
			params.tenant,
			params.type
		)
	}

	/**
	 * Create a new message
	 * 
	 * @param {int} id The message identifier. Can be null for unsent messages
	 * @param {string} tenant The tenant key that will be used to filter this 
	 * message
	 * @param {string} type The event name/type that this message 
	 * will be sent as
	 * @param {object} payloads An object containing the payloads to send
	 * @param {string=|object=} payloads.json The string encoded json body, or 
	 * an object to be serialised
	 * @param {string=} payloads.xml The string encoded xml body
	 * @param {string} recipients 
	 */
	constructor(id, tenant, type, payloads, recipients) {
		this.properties = {
			id,
			tenant,
			type,
			payloads,
			recipients,
		}
	}

	isSent() {
		return this.id != null
	}

	serialise() {
		const payloads = this.properties.payloads
		const obj = Object.assign({}, this.properties)

		delete obj.payloads
		obj.payload = {}

		if (payloads.json) {
			obj.payload[JSON_KEY] = typeof payloads.json == 'string' ?
				payloads.json
				: JSON.stringify(payloads.json)
		}

		if (payloads.xml) {
			obj.payload[XML_KEY] = payloads.xml
		}
	}
}

module.exports = Message