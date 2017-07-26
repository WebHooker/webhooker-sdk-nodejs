const crypto = require('crypto')
const Message = require('./Message')
const Err = require('./Error')

function sign(payload, opts) {
	return crypto.createHmac(opts.algorithm, opts.key)
		.update(payload)
		.digest('hex')
}

/**
 * Represents a message within the webhooker system that should generate 
 * signatures when sending to the API
 * 
 * @extends Message
 */
class SignedMessage extends Message {
	/**
	 * Create a new SignedMessage
	 * 
	 * @param {int | null} id The message identifier. Can be null for unsent
	 * messages
	 * @param {TenantKey} tenant The tenant key that will be used to filter 
	 * this message
	 * @param {string} type The event name/type that this message 
	 * will be sent as
	 * @param {Object} payloads An object containing the payloads to send
	 * @param {string | Object | Array} [payloads.json] The string encoded 
	 * json body, or an object to be serialised
	 * @param {string=} payloads.xml The string encoded xml body
	 * @param {string=} signingKey The key used to sign the payloads. This
	 * should be something known to the recipient so that they can verify that
	 * the payload has not been tampered with. It is recommended that this
	 * value is also not related to your Webhooker account in any way
	 * @param {string} [signingAlgo=sha256] The algorithm to use
	 * when creating message signatures. Will default to a sha-256 signature.
	 * If an explicit false is passed as this parameter, no signatures will be
	 * created 
	 */
	constructor(id, tenant, type, payloads, signingKey, signingAlgo) {
		super(id, tenant, type, payloads)

		this.properties.signature = {
			algorithm: signingAlgo || 'sha256',
			key: signingKey,
		}
	}

	/**
	 * Fluently set the key used to sign the request payloads
	 * 
	 * @param {string} signingKey The key used to sign request payloads. It is
	 * recommended that this value is also not related to your Webhooker
	 * account in any way
	 * @return {SignedMessage} This message instance
	 */
	signingKey(signingKey) {
		this.properties.signature.key = signingKey
		return this
	}

	/**
	 * Fluently set the algorithm used to sign the request payloads
	 * 
	 * @param {string} signingAlgo The algorithm used to create the HMAC
	 * signature. It should be a value found in crypto.getHashes()
	 * @return {SignedMessage} This message instance
	 */
	signingHash(signingAlgo) {
		const hashes = crypto.getHashes()
		if (!hashes.some(hash => hash === signingAlgo)) {
			throw new Err.InvalidHash(signingAlgo)
		}
		this.properties.signature.algorithm = signingAlgo
		return this
	}

	/**
	 * Turns this message into a raw payload object that can be used as the
	 * body of a {@link WebhookClient} send request. Signatures will be
	 * generated for the json and xml payloads when present.
	 * 
	 * @return {MessagePayload} The formatted payload that conforms to the
	 * Webhooker HTTP api spec
	 */
	toPayload() {
		const original = super.toPayload()
		const xml = Message.XML_KEY
		const json = Message.JSON_KEY

		if (!this.properties.signature.key) throw new Err.InvalidMessage({ signingKey: 'missing required field' })

		original.signatures = {}

		if (xml in original.payload) {
			original.signatures[xml] = sign(
				original.payload[xml], 
				this.properties.signature
			)
		}

		if (json in original.payload) {
			original.signatures[json] = sign(
				original.payload[json],
				this.properties.signature
			)
		}

		return original
	}
}

module.exports = SignedMessage
