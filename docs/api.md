## Classes

<dl>
<dt><a href="#WebhookerClient">WebhookerClient</a></dt>
<dd><p>The API client used to send requests to the webhooker api</p>
</dd>
<dt><a href="#Config">Config</a></dt>
<dd></dd>
<dt><a href="#Message">Message</a></dt>
<dd><p>Represents a message sent within the Webhooker system</p>
</dd>
<dt><a href="#SignedMessage">SignedMessage</a> ⇐ <a href="#Message">`Message`</a></dt>
<dd><p>Represents a message within the webhooker system that should generate 
signatures when sending to the API</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#WebhookerCallback">WebhookerCallback</a> : function</dt>
<dd><p>The callback provided to methods that utilise the Webhooker api. When a 
WebhookerCallback is accepted, it can instead be omitted to cause the called
function to return a Promise</p>
</dd>
<dt><a href="#MessageObject">MessageObject</a> : Object</dt>
<dd><p>An easily constructed version of the
<a href="#MessagePayload">MessagePayload</a> object using a js-native naming scheme for
payloads, as compared to the request body names. This type will usually be
the one accepted by the public API, and MessagePayload will usually be the 
type used internally</p>
</dd>
<dt><a href="#MessagePayload">MessagePayload</a> : Object</dt>
<dd><p>The body parameters for a
<a href="#WebhookerClient">WebhookerClient</a> send request</p>
</dd>
<dt><a href="#TenantKey">TenantKey</a> : string</dt>
<dd><p>The non-unique user specified identifier for a
single subsciption endpoint. Multiple subscriptions can have the same
tenant key, and a request will be sent to all subscriptions that have tenant
keys matching the one specified with the API request</p>
</dd>
</dl>

<br><br><br>
<a id="WebhookerClient"></a>

## WebhookerClient
The API client used to send requests to the webhooker api

**Kind**: global class  

* [WebhookerClient](#WebhookerClient)
    * [new WebhookerClient(config)](#new_WebhookerClient_new)
    * _instance_
        * [.send(message, [callback])](#WebhookerClient+send) ⇒ Promise
        * [.getSubscribers([callback])](#WebhookerClient+getSubscribers) ⇒ Promise
        * [.getSubscriptions([callback])](#WebhookerClient+getSubscriptions) ⇒ Promise
    * _static_
        * [.withKey(apiKey)](#WebhookerClient.withKey)

<br><br><br>
<a id="new_WebhookerClient_new"></a>

### new WebhookerClient(config)
Create a new Webhooker client.


| Param | Type | Description |
| --- | --- | --- |
| config | [`Config`](#Config) | A config object that provides API information to the client. Can be used to customise the domain, in case it differs from the standard webhooker api |

<br><br><br>
<a id="WebhookerClient+send"></a>

### webhookerClient.send(message, [callback]) ⇒ Promise
Send a message payload to Webhooker, which will then send the payload
to the matching subscribers

**Kind**: instance method of [`WebhookerClient`](#WebhookerClient)  
**Returns**: Promise - A promise that will resolve when the request has
completed. If there was an error, the promise will be rejected. 
Otherwise it will be resolved with the server response. Only returned
when `callback` is null or undefined  

| Param | Type | Description |
| --- | --- | --- |
| message | [`Message`](#Message) / [`MessageObject`](#MessageObject) |  |
| [callback] | [`WebhookerCallback`](#WebhookerCallback) | A callback that will be triggered when the request has completed. If this is omitted, the function will instead return a promise |

<br><br><br>
<a id="WebhookerClient+getSubscribers"></a>

### webhookerClient.getSubscribers([callback]) ⇒ Promise
Get all of the subscribers for this application

**Kind**: instance method of [`WebhookerClient`](#WebhookerClient)  

| Param | Type |
| --- | --- |
| [callback] | [`WebhookerCallback`](#WebhookerCallback) | 

<br><br><br>
<a id="WebhookerClient+getSubscriptions"></a>

### webhookerClient.getSubscriptions([callback]) ⇒ Promise
Get all of the subscriptions for a subscriber belonging to this 
application

**Kind**: instance method of [`WebhookerClient`](#WebhookerClient)  

| Param | Type |
| --- | --- |
| [callback] | [`WebhookerCallback`](#WebhookerCallback) | 

<br><br><br>
<a id="WebhookerClient.withKey"></a>

### WebhookerClient.withKey(apiKey)
Create a new Webhooker client with default parameters and the specified
api key

**Kind**: static method of [`WebhookerClient`](#WebhookerClient)  

| Param | Type |
| --- | --- |
| apiKey | string | 

<br><br><br>
<a id="Config"></a>

## Config
**Kind**: global class  

* [Config](#Config)
    * [new Config(apiKey, domain)](#new_Config_new)
    * [.withKey(apiKey)](#Config.withKey)

<br><br><br>
<a id="new_Config_new"></a>

### new Config(apiKey, domain)
Create a new configuration object


| Param | Type | Description |
| --- | --- | --- |
| apiKey | string | The api key to send with webhooker requests |
| domain | string | The domain name to send webhooker requests to |

<br><br><br>
<a id="Config.withKey"></a>

### Config.withKey(apiKey)
Create a new configuration object with the default webhooker domain

**Kind**: static method of [`Config`](#Config)  

| Param | Type | Description |
| --- | --- | --- |
| apiKey | string | The api key to send with webhooker requests |

<br><br><br>
<a id="Message"></a>

## Message
Represents a message sent within the Webhooker system

**Kind**: global class  

* [Message](#Message)
    * [new Message(id, tenant, type, payloads, [signatureType])](#new_Message_new)
    * _instance_
        * [.id(id)](#Message+id) ⇒ [`Message`](#Message)
        * [.tenant(tenant)](#Message+tenant) ⇒ [`Message`](#Message)
        * [.type(type)](#Message+type) ⇒ [`Message`](#Message)
        * [.json(json)](#Message+json) ⇒ [`Message`](#Message)
        * [.xml(xml)](#Message+xml) ⇒ [`Message`](#Message)
        * [.isSent()](#Message+isSent) ⇒ boolean
        * [.toPayload()](#Message+toPayload) ⇒ [`MessagePayload`](#MessagePayload)
    * _static_
        * [.XML_KEY](#Message.XML_KEY)
        * [.JSON_KEY](#Message.JSON_KEY)
        * [.from(params)](#Message.from) ⇒ [`Message`](#Message)
        * [.builder()](#Message.builder) ⇒ [`Message`](#Message)

<br><br><br>
<a id="new_Message_new"></a>

### new Message(id, tenant, type, payloads, [signatureType])
Create a new message


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | int / null |  | The message identifier. Can be null for unsent messages |
| tenant | [`TenantKey`](#TenantKey) |  | The tenant key that will be used to filter  this message |
| type | string |  | The event name/type that this message  will be sent as |
| payloads | Object |  | An object containing the payloads to send |
| [payloads.json] | string / Object / Array |  | The string encoded json body, or an object to be serialised |
| [payloads.xml] | string |  | The string encoded xml body |
| [signatureType] | string / false | <code>&quot;&#x27;SHA256&#x27;&quot;</code> |  |

<br><br><br>
<a id="Message+id"></a>

### message.id(id) ⇒ [`Message`](#Message)
Fluently set the id of the message instance

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| id | int / null | The identifier of this message within the Webhooker system. This method should generally not be used outside of the SDK, but may prove useful for hydrating a serialised Message instance |

<br><br><br>
<a id="Message+tenant"></a>

### message.tenant(tenant) ⇒ [`Message`](#Message)
Fluently set the tenant key of the message instance

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| tenant | [`TenantKey`](#TenantKey) | The user defined subscription identifier that that this message will be sent to |

<br><br><br>
<a id="Message+type"></a>

### message.type(type) ⇒ [`Message`](#Message)
Fluently set the type of the message instance

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| type | string | The event name that will be sent with this message (e.g. task.created or my-system-notification) |

<br><br><br>
<a id="Message+json"></a>

### message.json(json) ⇒ [`Message`](#Message)
Fluently set the JSON payload of the message instance

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| json | string / Object / Array | A JSON compatible payload to be sent. This can either be something that will stringify (Object or Array) or it can be a pre-stringified payload. |

<br><br><br>
<a id="Message+xml"></a>

### message.xml(xml) ⇒ [`Message`](#Message)
Fluently set the XML payload of the message instance

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| xml | string | An XML string taht will be sent as the payload of  this message |

<br><br><br>
<a id="Message+isSent"></a>

### message.isSent() ⇒ boolean
Check to see if this message has been succesfully sent

**Kind**: instance method of [`Message`](#Message)  
**Returns**: boolean - whether or not this message has been sent, as
indicated by the existence of an ID. If an ID has been manually set on
an unsent message, this method will falsly report that the message has
been sent - only sent messages should have an ID  
<br><br><br>
<a id="Message+toPayload"></a>

### message.toPayload() ⇒ [`MessagePayload`](#MessagePayload)
Turns this message into a raw payload object that can be used as the
body of a [WebhookClient](WebhookClient) send request

**Kind**: instance method of [`Message`](#Message)  
**Returns**: [`MessagePayload`](#MessagePayload) - The formatted payload that conforms to the
Webhooker HTTP api spec  
<br><br><br>
<a id="Message.XML_KEY"></a>

### Message.XML_KEY
The key used for the stringified XML body in the request payload

**Kind**: static property of [`Message`](#Message)  
<br><br><br>
<a id="Message.JSON_KEY"></a>

### Message.JSON_KEY
The key used for the stringified JSON body in the request payload

**Kind**: static property of [`Message`](#Message)  
<br><br><br>
<a id="Message.from"></a>

### Message.from(params) ⇒ [`Message`](#Message)
Hydrate a new unsent message from the provided portable object

**Kind**: static method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - The Message instance that represents the provided object  

| Param | Type | Description |
| --- | --- | --- |
| params | [`MessageObject`](#MessageObject) | The basic object containing message parameters |

<br><br><br>
<a id="Message.builder"></a>

### Message.builder() ⇒ [`Message`](#Message)
Create a new blank [Message](#Message) as a builder interface. The message
will have no defaults set, and by default will not create signatures

**Kind**: static method of [`Message`](#Message)  
**Returns**: [`Message`](#Message) - A blank message with no properties. Will not pass 
validation by default unless values are set on it  
<br><br><br>
<a id="SignedMessage"></a>

## SignedMessage ⇐ [`Message`](#Message)
Represents a message within the webhooker system that should generate 
signatures when sending to the API

**Kind**: global class  
**Extends**: [`Message`](#Message)  

* [SignedMessage](#SignedMessage) ⇐ [`Message`](#Message)
    * [new SignedMessage(id, tenant, type, payloads, [signingKey], [signingAlgo])](#new_SignedMessage_new)
    * [.signingKey(signingKey)](#SignedMessage+signingKey) ⇒ [`SignedMessage`](#SignedMessage)
    * [.signingHash(signingAlgo)](#SignedMessage+signingHash) ⇒ [`SignedMessage`](#SignedMessage)
    * [.toPayload()](#SignedMessage+toPayload) ⇒ [`MessagePayload`](#MessagePayload)
    * [.id(id)](#Message+id) ⇒ [`Message`](#Message)
    * [.tenant(tenant)](#Message+tenant) ⇒ [`Message`](#Message)
    * [.type(type)](#Message+type) ⇒ [`Message`](#Message)
    * [.json(json)](#Message+json) ⇒ [`Message`](#Message)
    * [.xml(xml)](#Message+xml) ⇒ [`Message`](#Message)
    * [.isSent()](#Message+isSent) ⇒ boolean

<br><br><br>
<a id="new_SignedMessage_new"></a>

### new SignedMessage(id, tenant, type, payloads, [signingKey], [signingAlgo])
Create a new SignedMessage


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | int / null |  | The message identifier. Can be null for unsent messages |
| tenant | [`TenantKey`](#TenantKey) |  | The tenant key that will be used to filter  this message |
| type | string |  | The event name/type that this message  will be sent as |
| payloads | Object |  | An object containing the payloads to send |
| [payloads.json] | string / Object / Array |  | The string encoded  json body, or an object to be serialised |
| [payloads.xml] | string |  | The string encoded xml body |
| [signingKey] | string |  | The key used to sign the payloads. This should be something known to the recipient so that they can verify that the payload has not been tampered with. It is recommended that this value is also not related to your Webhooker account in any way |
| [signingAlgo] | string | <code>&quot;sha256&quot;</code> | The algorithm to use when creating message signatures. Will default to a sha-256 signature. If an explicit false is passed as this parameter, no signatures will be created |

<br><br><br>
<a id="SignedMessage+signingKey"></a>

### signedMessage.signingKey(signingKey) ⇒ [`SignedMessage`](#SignedMessage)
Fluently set the key used to sign the request payloads

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`SignedMessage`](#SignedMessage) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| signingKey | string | The key used to sign request payloads. It is recommended that this value is also not related to your Webhooker account in any way |

<br><br><br>
<a id="SignedMessage+signingHash"></a>

### signedMessage.signingHash(signingAlgo) ⇒ [`SignedMessage`](#SignedMessage)
Fluently set the algorithm used to sign the request payloads

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`SignedMessage`](#SignedMessage) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| signingAlgo | string | The algorithm used to create the HMAC signature. It should be a value found in crypto.getHashes() |

<br><br><br>
<a id="SignedMessage+toPayload"></a>

### signedMessage.toPayload() ⇒ [`MessagePayload`](#MessagePayload)
Turns this message into a raw payload object that can be used as the
body of a [WebhookClient](WebhookClient) send request. Signatures will be
generated for the json and xml payloads when present.

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Overrides**: [`toPayload`](#Message+toPayload)  
**Returns**: [`MessagePayload`](#MessagePayload) - The formatted payload that conforms to the
Webhooker HTTP api spec  
<br><br><br>
<a id="Message+id"></a>

### signedMessage.id(id) ⇒ [`Message`](#Message)
Fluently set the id of the message instance

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| id | int / null | The identifier of this message within the Webhooker system. This method should generally not be used outside of the SDK, but may prove useful for hydrating a serialised Message instance |

<br><br><br>
<a id="Message+tenant"></a>

### signedMessage.tenant(tenant) ⇒ [`Message`](#Message)
Fluently set the tenant key of the message instance

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| tenant | [`TenantKey`](#TenantKey) | The user defined subscription identifier that that this message will be sent to |

<br><br><br>
<a id="Message+type"></a>

### signedMessage.type(type) ⇒ [`Message`](#Message)
Fluently set the type of the message instance

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| type | string | The event name that will be sent with this message (e.g. task.created or my-system-notification) |

<br><br><br>
<a id="Message+json"></a>

### signedMessage.json(json) ⇒ [`Message`](#Message)
Fluently set the JSON payload of the message instance

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| json | string / Object / Array | A JSON compatible payload to be sent. This can either be something that will stringify (Object or Array) or it can be a pre-stringified payload. |

<br><br><br>
<a id="Message+xml"></a>

### signedMessage.xml(xml) ⇒ [`Message`](#Message)
Fluently set the XML payload of the message instance

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: [`Message`](#Message) - This message instance  

| Param | Type | Description |
| --- | --- | --- |
| xml | string | An XML string taht will be sent as the payload of  this message |

<br><br><br>
<a id="Message+isSent"></a>

### signedMessage.isSent() ⇒ boolean
Check to see if this message has been succesfully sent

**Kind**: instance method of [`SignedMessage`](#SignedMessage)  
**Returns**: boolean - whether or not this message has been sent, as
indicated by the existence of an ID. If an ID has been manually set on
an unsent message, this method will falsly report that the message has
been sent - only sent messages should have an ID  
<br><br><br>
<a id="WebhookerCallback"></a>

## WebhookerCallback : function
The callback provided to methods that utilise the Webhooker api. When a 
WebhookerCallback is accepted, it can instead be omitted to cause the called
function to return a Promise

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| err | Error | If there was an error, this value will be the corresponding error object. Otherwise, it will be nul |
| response | Object | The api response from webhooker. This will contain  different information depending on the request being made |

<br><br><br>
<a id="MessageObject"></a>

## MessageObject : Object
An easily constructed version of the
[MessagePayload](#MessagePayload) object using a js-native naming scheme for
payloads, as compared to the request body names. This type will usually be
the one accepted by the public API, and MessagePayload will usually be the 
type used internally

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tenant | [`TenantKey`](#TenantKey) | The tenant key that will be used to filter this  message |
| type | string | The event name that the message will be sent as (e.g. task.created) |
| payload | Object | A map of webhook message payload types to their respective stringified contents |
| payload.json | string | A string encoded json payload |
| payload.xml | string | A string encoded xml payload |

<br><br><br>
<a id="MessagePayload"></a>

## MessagePayload : Object
The body parameters for a
[WebhookerClient](#WebhookerClient) send request

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tenant | [`TenantKey`](#TenantKey) | The tenant key that will be used to filter this message |
| type | string | The event name that the message will be sent as  (e.g. task.created) |
| payload | Object | A mapping of MIME type to serialised payload. Valid MIME types include `application/json` and `application/xml` |
| payload.application/json | string | A string encoded json payload |
| payload.application/xml | string | A string encoded xml payload |

<br><br><br>
<a id="TenantKey"></a>

## TenantKey : string
The non-unique user specified identifier for a
single subsciption endpoint. Multiple subscriptions can have the same
tenant key, and a request will be sent to all subscriptions that have tenant
keys matching the one specified with the API request

**Kind**: global typedef  
