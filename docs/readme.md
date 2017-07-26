# Webhooker-SDK-nodejs

Simplify your webhook distribution infrastructure to a single line of code.

Installation and guides are available in [the docs](https://webhooker.github.io/webhooker-sdk-nodejs)

### Quick Start

- Install from npm: `npm install --save webhooker-client`
- Require the module and create a client:

```js
const Webhooker = require('webhooker-client')
const client = Webhooker.withKey('My Key')
```

- Send a message to your subscribers:

```js
client.send({ 
	tenant: 'account.1', 
	type: 'task.created', 
	payloads: { 
		json: { id: 123, name: 'foo' },
	},
})
```

## API
