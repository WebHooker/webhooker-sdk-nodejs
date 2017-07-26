const expect = require('chai').expect
const nock = require('nock')
const Client = require('../lib/Client')
const Message = require('../lib/Message')

const basicParams = {
	tenant: 'foo',
	type: 'bar',
	payloads: {
		json: {
			foo: 123,
		},
	},
}

describe('WebhookerClient', () => {
	describe('Static Construction', () => {
		it('defaults api domain to webhooker', () => {
			const client = Client.withKey('asd-123-hgv')

			expect(client.config.domain).to.equal('https://api.webhooker.io/')
		})
	})
	describe('Messages', () => {
		describe('should successfully', () => {
			beforeEach(() => {
				nock('https://api.webhooker.io')
					.post('/messages')
					.reply(200, {
						id: 'foo'
					})
			})
			it('return a Message when given an object', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams)
					.then(message => expect(message).to.be.an.instanceOf(Message))
					.then(() => done())
					.catch(done)
			})
			it('set id of returned message', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams)
					.then(message => expect(message.properties.id).to.equal('foo'))
					.then(() => done())
					.catch(done)
			})
			it('correctly route parameters to a callback', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams, (err, message) => {
					if (err) done(err)
					else {
						expect(message).to.be.an.instanceOf(Message)
						expect(message.properties.id).to.equal('foo')
						done()
					}
				})
			})
			it('accept Message instances', (done) => {
				const client = Client.withKey('asd-123-hgv')
				const message = Message.from(basicParams)
				client.send(message)
					.then(() => done(), done)
			})
			it('return the same message instance', (done) => {
				const client = Client.withKey('asd-123-hgv')
				const message = Message.from(basicParams)
				client.send(message)
					.then(m => {
						expect(m).to.equal(message)
						expect(message.properties.id).to.equal('foo')
						done()
					})
					.catch(done)
			})
		})
		describe('when there is a http error', () => {
			beforeEach(() => {
				nock('https://api.webhooker.io')
					.post('/messages')
					.reply(400, {
						message: 'Failed to validate API-KEY'
					})
			})
			it('rejects the promise', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams)
					.then(() => done(new Error('Expected an error response')))
					.catch(err => {
						expect(err).is.an.instanceOf(Error)
						done()
					})
			})
			it('passes an error to the callback', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams, (err, message) => {
					expect(err).to.exist.and.be.an.instanceOf(Error)
					expect(message).to.not.exist
					done()
				})
			})
		})
		describe('when there is a badly formatted server error', () => {
			beforeEach(() => {
				nock('https://api.webhooker.io')
					.post('/messages')
					.reply(418, 'Whoops! something has gone wrong. also this isn\'t in the correct format')
			})
			
			it('formats the promise error to contain the status code', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams)
					.then(() => done(new Error('Expected an error response')))
					.catch(err => {
						expect(err).is.an.instanceOf(Error)
						expect(err.message).to.match(/418/)
						done()
					})
			})
			it('formats the callback error to contain the status code', (done) => {
				const client = Client.withKey('asd-123-hgv')
				client.send(basicParams, (err, message) => {
					expect(err).to.exist.and.be.an.instanceOf(Error)
					expect(err.message).to.match(/418/)
					expect(message).to.not.exist
					done()
				})
			})
		})
	})
})