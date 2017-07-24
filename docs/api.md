## Classes

<dl>
<dt><a href="#WebhookerClient">WebhookerClient</a></dt>
<dd></dd>
<dt><a href="#Config">Config</a></dt>
<dd></dd>
<dt><a href="#Message">Message</a></dt>
<dd></dd>
</dl>

<br><br><br>
<a id="WebhookerClient"></a>

## WebhookerClient
**Kind**: global class  

* [WebhookerClient](#WebhookerClient)
    * [new WebhookerClient(apiKey)](#new_WebhookerClient_new)
    * [.withKey(apiKey)](#WebhookerClient.withKey)

<br><br><br>
<a id="new_WebhookerClient_new"></a>

### new WebhookerClient(apiKey)
Create a new Webhooker client.


| Param | Type |
| --- | --- |
| apiKey | string | 

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
**Kind**: global class  

* [Message](#Message)
    * [new Message(id, tenant, type, payloads, recipients)](#new_Message_new)
    * [.from(params)](#Message.from)

<br><br><br>
<a id="new_Message_new"></a>

### new Message(id, tenant, type, payloads, recipients)
Create a new message


| Param | Type | Description |
| --- | --- | --- |
| id | int | The message identifier. Can be null for unsent messages |
| tenant | string | The tenant key that will be used to filter this  message |
| type | string | The event name/type that this message  will be sent as |
| payloads | object | An object containing the payloads to send |
| payloads.json | string / object | The string encoded json body, or  an object to be serialised |
| [payloads.xml] | string | The string encoded xml body |
| recipients | string |  |

<br><br><br>
<a id="Message.from"></a>

### Message.from(params)
Hydrate a new unsent message from the provided portable object

**Kind**: static method of [`Message`](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| params | object |  |
| params.tenant | string | The tenant key that will be used to filter this message |
| params.type | string | The event name/type that this message will be sent as |
| params.payloads | object |  |
| [params.payloads.json] | string | The string encoded json body |
| [params.payloads.xml] | string | The string encoded xml body |

