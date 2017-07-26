const expect = require('chai').expect
const Message = require('../lib/Message')
const Err = require('../lib/Error')

const basicParams = {
	type: 'foo',
	tenant: 'bar',
	payloads: {
		json: { foo: 123 },
		xml: { }
	},
}

describe('Messages', () => {
	const XML_PARAM = 'application/xml'
	const JSON_PARAM = 'application/json'
	
	describe('Predicate', () => {
		// These assumptions are made in the tests. If these fail there is an issue
		// with the tests, not with the application code

		it(`Serialisation xml key is ${XML_PARAM}`, () => expect(Message.XML_KEY).to.equal(XML_PARAM))
		it(`Serialisation json key is ${JSON_PARAM}`, () => expect(Message.JSON_KEY).to.equal(JSON_PARAM))
	})

	describe('Static Construction', () => {
		it('should store attributes in publically accessible property "properties"', () => {
			const message = Message.from(basicParams)

			expect(message.properties).to.be.an('Object')
		})
		it('should create properties equal to a well formed param', () => {
			const message = Message.from(basicParams)

			expect(message.properties.type).to.equal(basicParams.type)
			expect(message.properties.tenant).to.equal(basicParams.tenant)
			expect(message.properties.payloads).to.deep.include(basicParams.payloads)
		})
		it('should not store an object reference to the params', () => {
			const message = Message.from(basicParams)

			expect(message.properties).to.not.equal(basicParams)
		})
		it('should not store object references to nested objects', () => {
			const message = Message.from(basicParams)

			expect(message.properties.payloads).to.not.equal(basicParams.payloads)
			expect(message.properties.payloads.json).to.not.equal(basicParams.payloads.json)
			expect(message.properties.payloads.xml).to.not.equal(basicParams.payloads.xml)
		})
		it('should not store extraneous properties', () => {
			const payload = Object.assign({ bar: 'invalid param' }, basicParams)
			const message = Message.from(payload)

			expect(message.properties).to.not.have.property('bar')
		})
	})

	describe('Fluent Construction', () => {
		it('acts fluently for all property methods', () => {
			const message = Message.builder()
			expect(message).to.be.an.instanceOf(Message)

			expect(message.id('foo')).to.equal(message)
			expect(message.type('foo')).to.equal(message)
			expect(message.tenant('foo')).to.equal(message)
			expect(message.json('foo')).to.equal(message)
			expect(message.xml('foo')).to.equal(message)
		})
		it('correctly sets "properties" values', () => {
			const message = Message.builder()
				.id('id1')
				.type('type2')
				.tenant('tenant3')
				.json('{"foo":123}')
				.xml('<foo>123</foo>')

			expect(message.properties).to.deep.include({
				id: 'id1',
				type: 'type2',
				tenant: 'tenant3',
				payloads: {
					json: '{"foo":123}',
					xml: '<foo>123</foo>',
				},
			})
		})
	})

	describe('Serialisation to Payload', () => {
		it('creates a key called "payload" and not "payloads"', () => {
			const payload = Message.from(basicParams).toPayload()

			expect(payload.payload).to.exist.and.be.ok
			expect(payload.payloads).to.not.exist
		})
		it('correctly converts to MIME types', () => {
			const payload = Message.from(basicParams).toPayload()

			expect(payload.payload[XML_PARAM]).to.exist.and.be.ok
			expect(payload.payload[JSON_PARAM]).to.exist.and.be.ok
		})
		it('creates a valid JSON string for the JSON payload', () => {
			const payload = Message.from(basicParams).toPayload()

			expect(payload.payload[JSON_PARAM]).to.equal('{"foo":123}')
		})
		it('throws validation errors for invalid payloads', () => {
			const missingType = { tenant: 'foo', payloads: { json: { } }}
			const missingPayloads = { tenant: 'foo', type: 'bar' }
			const missingAtLeastOnePayload = { tenant: 'foo', type: 'bar', payloads: {} }

			let message = Message.from(missingType)
			expect(message.toPayload.bind(message)).to.throw(Err.InvalidMessage, /type/)

			message = Message.from(missingPayloads)
			expect(message.toPayload.bind(message)).to.throw(Err.InvalidMessage, /payloads/)

			message = Message.from(missingAtLeastOnePayload)
			expect(message.toPayload.bind(message)).to.throw(Err.InvalidMessage, /payloads content/)
		})
	})
})