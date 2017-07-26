const Err = require('./Error')

const JSON_KEY = 'application/json'
const XML_KEY = 'application/xml'

/**
 * @typedef {Object} MessageObject An easily constructed version of the
 * {@link MessagePayload} object using a js-native naming scheme for
 * payloads, as compared to the request body names. This type will usually be
 * the one accepted by the public API, and MessagePayload will usually be the 
 * type used internally
 * 
 * @property {TenantKey} tenant The tenant key that will be used to filter this 
 * message
 * @property {string} type The event name that the message will be sent as
 * (e.g. task.created)
 * @property {Object} payload A map of webhook message payload types to their
 * respective stringified contents
 * @property {string=} payload.json A string encoded json payload
 * @property {string=} payload.xml A string encoded xml payload	
 */

/**
 * @typedef {Object} MessagePayload The body parameters for a
 * {@link WebhookerClient} send request
 * 
 * @property {TenantKey} tenant The tenant key that will be used to filter this
 * message
 * @property {string} type The event name that the message will be sent as 
 * (e.g. task.created)
 * @property {Object} payload A mapping of MIME type to serialised payload.
 * Valid MIME types include `application/json` and `application/xml`
 * @property {string} [payload.application/json] A string encoded json payload
 * @property {string} [payload.application/xml] A string encoded xml payload
 */

/**
 * @typedef {string} TenantKey The non-unique user specified identifier for a
 * single subsciption endpoint. Multiple subscriptions can have the same
 * tenant key, and a request will be sent to all subscriptions that have tenant
 * keys matching the one specified with the API request
 */

 /**
  * Represents a message sent within the Webhooker system
  */
class Message {
	/**
	 * The key used for the stringified XML body in the request payload
	 */
	static get XML_KEY() { return XML_KEY }
	/**
	 * The key used for the stringified JSON body in the request payload
	 */
	static get JSON_KEY() { return JSON_KEY }

	/**
	 * Hydrate a new unsent message from the provided portable object
	 * 
	 * @param {MessageObject} params The basic object containing message
	 * parameters
	 * @return {Message} The Message instance that represents the provided object
	 */
	static from(params) {
		const payloads = {}
		if (params.payloads) {
			if (params.payloads.json) {
				// We intentionally want to lose non-json values like functions
				payloads.json = JSON.parse(JSON.stringify(params.payloads.json))
			}
			if (params.payloads.xml) {
				payloads.xml = params.payloads.xml
			}
		}
		return new this(
			null,
			params.tenant,
			params.type,
			payloads
		)
	}

	/**
	 * Create a new blank {@link Message} as a builder interface. The message
	 * will have no defaults set, and by default will not create signatures
	 * 
	 * @return {Message} A blank message with no properties. Will not pass 
	 * validation by default unless values are set on it
	 */
	static builder() {
		return new this(
			null,
			null,
			null,
			{},
			false
		)
	}

	/**
	 * Create a new message
	 * 
	 * @param {string | null} id The message identifier. Can be null for unsent
	 * messages
	 * @param {TenantKey} tenant The tenant key that will be used to filter 
	 * this message
	 * @param {string} type The event name/type that this message 
	 * will be sent as
	 * @param {Object} payloads An object containing the payloads to send
	 * @param {string | Object | Array} [payloads.json] The string encoded json
	 * body, or
	 * an object to be serialised
	 * @param {string=} payloads.xml The string encoded xml body
	 * @param {string | false} [signatureType='SHA256'] 
	 */
	constructor(id, tenant, type, payloads) {
		this.properties = {
			id,
			tenant,
			type,
			payloads,
		}
	}

	/**
	 * Fluently set the id of the message instance
	 * 
	 * @param {string | null} id The identifier of this message within the
	 * Webhooker system. This method should generally not be used outside of
	 * the SDK, but may prove useful for hydrating a serialised Message
	 * instance
	 * @return {Message} This message instance
	 */
	id(id) {
		this.properties.id = id
		return this
	}

	/**
	 * Fluently set the tenant key of the message instance
	 * 
	 * @param {TenantKey} tenant The user defined subscription identifier that
	 * that this message will be sent to
	 * @return {Message} This message instance
	 */
	tenant(tenant) {
		this.properties.tenant = tenant
		return this
	}

	/**
	 * Fluently set the type of the message instance
	 * 
	 * @param {string} type The event name that will be sent with this message
	 * (e.g. task.created or my-system-notification)
	 * @return {Message} This message instance
	 */
	type(type) {
		this.properties.type = type
		return this
	}

	/**
	 * Fluently set the JSON payload of the message instance
	 * 
	 * @param {string | Object | Array} json A JSON compatible payload to be
	 * sent. This can either be something that will stringify (Object or Array)
	 * or it can be a pre-stringified payload.
	 * @return {Message} This message instance
	 */
	json(json) {
		this.properties.payloads = this.properties.payloads || {}
		this.properties.payloads.json = json
		return this
	}

	/**
	 * Fluently set the XML payload of the message instance
	 * 
	 * @param {string} xml An XML string taht will be sent as the payload of 
	 * this message
	 * @return {Message} This message instance 
	 */
	xml(xml) {
		this.properties.payloads = this.properties.payloads || {}
		this.properties.payloads.xml = xml
		return this
	}

	/**
	 * Check to see if this message has been succesfully sent
	 * 
	 * @return {boolean} whether or not this message has been sent, as
	 * indicated by the existence of an ID. If an ID has been manually set on
	 * an unsent message, this method will falsly report that the message has
	 * been sent - only sent messages should have an ID
	 */
	isSent() {
		return this.id != null
	}

	/**
	 * Turns this message into a raw payload object that can be used as the
	 * body of a {@link WebhookClient} send request
	 * 
	 * @return {MessagePayload} The formatted payload that conforms to the
	 * Webhooker HTTP api spec
	 */
	toPayload() {
		const errors = []
		const payloads = this.properties.payloads
		const obj = Object.assign({}, this.properties)

		if (obj.payloads) {
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

			if (!payloads.json && !payloads.xml) {
				errors.push({
					name: 'payloads content',
					message: 'missing at least one of: json, xml'
				})
			}
		} else {
			errors.push({
				name: 'payloads',
				message: 'missing required field',
			})
		}

		if (obj.type == null) errors.push({ name: 'type', message: 'missing required field' })

		if (errors.length > 0) {
			const errorFields = errors.reduce((acc, field) => {
				return Object.assign(acc, {
					[field.name]: field.message,
				})
			}, {})

			throw new Err.InvalidMessage(errorFields)
		}
		
		return obj
	}
}

module.exports = Message