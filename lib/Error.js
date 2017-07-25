exports.InvalidMessage = class extends Error {
	constructor(fields) {
		let message = 'Invalid message object:\n'
		for (const field in fields) {
			if (fields.hasOwnProperty(field)) {
				message += `\t- ${field}: ${fields[field]}\n`
			}
		}

		super(message)
	}
}