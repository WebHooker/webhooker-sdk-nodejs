# Getting Started

This module provides a complete client for interacting with your [Webhooker](https://webhooker.io) applications. All you need is a little bit of setup and a single function call to simplify your webhook distribution architecture.

The Webhooker client is requires nodejs version 4 or later. It should also be browserify compatible, but this it is generally not recommended as this *will* leak your Webhooker API key.

## Installation

Use your favourite package manager to install the client. No extra setup is required

```bash
# npm
npm install --save webhooker-client

# ied
ied install --save webhooker-client

# yarn
yarn add webhooker-client
```

## Usage

Utilising the client in your code is quite simple. You'll need to replace `<API_KEY>` in the following code with the api key available on your application page in the Webhooker interface.

This example shows off the fluent builder interface for messages and passing a callback to the `Client#send` method. See [Sending a Message](Message.md) for more ways of creating a message, and information about the promise interface for sending messages.

```js
const { WebhookerClient, Message } = require('webhooker-client')

const client = new WebhookerClient('<API_KEY>')

const message = Message.builder()
	.event('my-event')
	.tenant('fkey-213')
	.json({ name: 'foo', value: 123 })

client.send(message, (err, m) => { // (message === m)
	if (err) console.error(err)
	else console.log('Sent message', m.id)
})
```