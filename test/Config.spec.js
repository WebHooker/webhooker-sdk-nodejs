const expect = require('chai').expect
const Config = require('../lib/Config')

describe('Config', () => {
	describe('Static construction', () => {
		it('defaults api to webhooker', () => {
			const config = Config.withKey('asd-123-hgv')

			expect(config.domain).to.equal('https://api.webhooker.io/')
		})
	})
})