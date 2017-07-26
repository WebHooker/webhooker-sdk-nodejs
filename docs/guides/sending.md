# Sending a Message

There are multiple ways to create a message, and multiple types of message that
you can send. All of the different types follow the same basic conventions, and
all messages get sent with the same method call on the client.

## Creating a Client

In order to do anything with the SDK, we first need a `WebhookerClient` object.
As it is the main entry point to the SDK, it is provided as the default export
of the module:

```js
const WebhookerClient = require('webhooker-client')
```

All we need to create a default client is the API key that can be found on the
application page of the webhooker dashboard. For these examples, we'll be using
`abc-123-blt` - replace every instance of that with your API key if you're
following along.

To get an instance of the client with a specific API key, you just need to call
the static `withKey` method:

```js
const client = WebhookerClient.withKey('abc-213-blt')
```

If you need a more complex configuration for your client, you can manually
construct one by creating a [`Config`](/api.md#Config) object and passing that
to the `WebhookerClient` constructor

## Sending a Simple Message

If we want to really quickly send a simple message, we can pass a basic
Javascript object directly to the client's `send` method. The object must 
conform to the [`MessageObject`](/api.md#MessageObject) type, otherwise an
`InvalidMessage` error will be thrown.

Depending on whether or not you're using promises, you can either pass a
callback to `send` or use the returned promise object. Here we'll use a promise
since that gives us more flexibility:

```js
client.send({
	tenant: 'account.1',
	type: 'my-event',
	payloads: {
		json: {
			foo: 123,
			bar: 456,
		},
	},
})
// The client will always return a Message object, so you have to access values 
// via the `properties` property
.then(message => console.log('Sent a message, it has id', message.properties.id))
.catch(err => console.error('Something went wrong:', err))
```

## Building Our Message

An alternative method of creating a message is to use the fluent builder 
interface. This interface allows you to construct message objects by chaining
method calls - you can easily pass the message around and construct it in a way
that gels better with your code base.

Each of the properties that can be set on a message have a self-named method 
that will set the value and then return the object for chaining. This code
creates the same object as the previous example:

```js
const Message = WebhookerClient.Message
const message = Message.builder()
	.tenant('account.1')
	.type('my-event')

message.json({ foo: 123, bar: 456 })
```

The message can then be sent as before with the `WebhookerClient`:

```js
client.send(message)
.then(m => console.log('Sent a message, it has id', m.properties.id))
.catch(err => console.error('Something went wrong:', err))
```

In this case, however, `message` is the same object as `m` since it is
already a [`Message`](/api.md#Message) instance and doesn't need to be 
converted

## Signing The Message

Webhooker has the option of including payload signatures in the message request
so that the recipient can verify that the payload hasn't been tampered with.
Doing this successfully requires a secret that is shared between you and the
message recipient but _not_ with Webhooker or anyone else.

To help with this, the SDK provides the 
[`SignedMessage`](/api.md#SignedMessage) class as an alternative to the 
standard `Message`. It is used in the same way, but can also have a signing key
and signing algorithm set on it. When sent, it will automatically set the relevant 
HMAC signatures on the request payload:

```js
const SignedMessage = WebhookerClient.SignedMessage
const message = SignedMessage.builder()
	.tenant('account.1')
	.type('my-event')
	.json({ foo: 123, bar: 456 })
	.signingKey('my super secret key')

client.send(message)
.then(m => console.log('Sent a signed message, it has id', m.properties.id))
.catch(err => console.error('Something went wrong:', err))
```
