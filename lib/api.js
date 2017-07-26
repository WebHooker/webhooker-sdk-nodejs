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
		if (response.statusCode >= 400) {
			err = new Error(body.message || `Status ${response.statusCode}`)
		}
		if (err) {
			callback(err, null)
		} else {
			callback(null, params.response ? params.response(body) : body)
		}
	})
}

function requestWithPromise(params) {
	return new Promise((resolve, reject) => {
		request(paramsToRequest(params), (err, response, body) => {
			if (response.statusCode >= 400) {
				err = new Error(body.message || `Status ${response.statusCode}`)
			}
			if (err) {
				reject(err)
			} else {
				resolve(params.response ? params.response(body) : body)
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
		response: null,
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
		response(mapper) {
			params.response = mapper
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