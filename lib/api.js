const request = require('request')

function paramsToRequest(params) {
	return {
		uri: params.endpoint,
		baseUrl: params.domain,
		method: params.method,
		headers: params.headers,
		json: params.body,
	}
}

function requestWithCallback(params, callback) {
	request(paramsToRequest(params), (err, response, body) => {
		callback(err, body)
	})
}

function requestWithPromise(params) {
	return new Promise((resolve, reject) => {
		request(paramsToRequest(params), (err, response, body) => {
			if (err) {
				reject(err)
			} else {
				resolve(body)
			}
		})
	})
}

module.exports = function requestBuilder() {
	const params = {
		method: 'POST',
		endpoint: '/',
		domain: 'https://api.webhooker.io',
		body: {},
		headers: {},
	}

	const intrface = {
		method(method) {
			params.method = method.toUpperCase()
			return intrface
		},
		endpoint(endpoint) {
			params.endpoint = endpoint
			return intrface
		},
		domain(domain) {
			params.domain = domain
			return intrface
		},
		body(body) {
			params.body = body
			return intrface
		},
		headers(headers) {
			params.headers = headers
			return intrface
		},
		header(name, value) {
			params.headers[name] = value
			return intrface
		},
		send(callback) {
			if (callback) {
				return requestWithCallback(params, callback)
			}
			return requestWithPromise(params)
		}
	}

	return intrface
}