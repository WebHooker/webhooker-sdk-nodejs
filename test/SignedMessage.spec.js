const expect = require('chai').expect
const crypto = require('crypto')
const Message = require('../lib/Message')
const SignedMessage = require('../lib/SignedMessage')
const Err = require('../lib/Error')

const basicParams = {
	type: 'foo',
	tenant: 'bar',
	payloads: {
		json: { foo: 123 },
		xml: '<foo>123</foo>',
	},
}

describe('Signed Messages', () => {
	const XML_PARAM = 'application/xml'
	const JSON_PARAM = 'application/json'

	describe('Predicate', () => {
		// These assumptions are made in the tests. If these fail there is an issue
		// with the tests, not with the application code

		it(`Serialisation xml key is ${XML_PARAM}`, () => expect(SignedMessage.XML_KEY).to.equal(XML_PARAM))
		it(`Serialisation json key is ${JSON_PARAM}`, () => expect(SignedMessage.JSON_KEY).to.equal(JSON_PARAM))

		it('SignedMessage inherits from Message', () => {
			// This test ensures the validity of the assumption that SignedMessage
			// will also be covered by the results of the tests for Message.
			// If that ever changes, delete this test and replicate the Message
			// Tests for SignedMessage
			const message = SignedMessage.from(basicParams)
			expect(message).to.be.an.instanceOf(Message)
		})
	})

	describe('Static construction', () => {
		it('should return a SignedMessage', () => {
			const message = SignedMessage.from(basicParams)

			expect(message).to.be.an.instanceOf(SignedMessage)
		})
		it('should also have a signature property', () => {
			const message = SignedMessage.from(basicParams)

			expect(message.properties.signature).to.exist
		})
		it('should not set a signing key by default', () => {
			const message = SignedMessage.from(basicParams)

			expect(message.properties.signature.key).to.not.be.ok
		})
	})

	describe('Fluent Construction', () => {
		it('should return a SignedMessage', () => {
			const message = SignedMessage.builder()

			expect(message).to.be.an.instanceof(SignedMessage)
		})
		it('should also have a signature property', () => {
			const message = SignedMessage.builder()

			expect(message.properties.signature).to.exist
		})
		it('should not set a signing key by default', () => {
			const message = SignedMessage.builder()

			expect(message.properties.signature.key).to.not.be.ok
		})
		it('should correctly update the signing key and algorithm', () => {
			const message = SignedMessage.builder()
				.signingKey('foo')
				.signingHash('sha1')

			expect(message.properties.signature.key).to.equal('foo')
			expect(message.properties.signature.algorithm).to.equal('sha1')
		})
		it('should validate the signing hash when set', () => {
			const message = SignedMessage.builder()

			expect(message.signingHash.bind(message, 'SHA-256')).to.throw(Err.InvalidHash, /SHA-256/)
		})
	})

	describe('Serialisation to Payload', () => {
		const key = 'signing-key-123'
		const hash = 'sha256'

		it('should only create signatures for included types', () => {
			const onlyJSON = { tenant: 'foo', type: 'bar', payloads: { json: { foo: 123 } } }
			const onlyXML = { tenant: 'foo', type: 'bar', payloads: { xml: '<foo>123</foo>' } }

			let message = SignedMessage.from(onlyJSON).signingKey(key).signingHash(hash)
			let payload = message.toPayload()

			expect(payload.signatures).to.exist
			expect(payload.signatures[JSON_PARAM]).to.exist
			expect(payload.signatures[XML_PARAM]).to.not.exist

			message = SignedMessage.from(onlyXML).signingKey(key).signingHash(hash)
			payload = message.toPayload()

			expect(payload.signatures[JSON_PARAM]).to.not.exist
			expect(payload.signatures[XML_PARAM]).to.exist

			message = SignedMessage.from(basicParams).signingKey(key).signingHash(hash)
			payload = message.toPayload()

			expect(payload.signatures[JSON_PARAM]).to.exist
			expect(payload.signatures[XML_PARAM]).to.exist
		})

		it('should generate valid hex sigantures', () => {
			const payload = SignedMessage.from(basicParams).signingKey(key).signingHash(hash).toPayload()
			const jsonSig = crypto.createHmac(hash, key).update('{"foo":123}').digest('hex')
			const xmlSig = crypto.createHmac(hash, key).update('<foo>123</foo>').digest('hex')

			expect(payload.signatures[JSON_PARAM]).to.equal(jsonSig)
			expect(payload.signatures[XML_PARAM]).to.equal(xmlSig)
		})
	})
})