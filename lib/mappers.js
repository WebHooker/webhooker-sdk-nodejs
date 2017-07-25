/**
 * @ignore [Internal]
 * 
 * Takes an api response from `POST /messages` and maps the id back onto an
 * enclosed message instance, returning that instance
 * 
 * @callback MessageResponseCallback
 * @param {Object} response The api response object
 * @param {string} response.id The id of the message created by the API
 */

/**
 * @ignore [Internal]
 * 
 * Create a closure to capture the message being sent, so that we can update it
 * and return it from the actual mapper that gets passed to the api
 * 
 * @param {Message | SignedMessage} message The message instance that is being
 * sent via the api
 * @return {MessageResponseCallback}
 */
exports.toMessage = function toMessageClosure(message) {
	return function mapToMessage(response) {
		return message.id(response.id)
	}
}