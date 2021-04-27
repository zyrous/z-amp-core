<a name="ZAmp.Storage.SessionStorageProvider"></a>

## Storage.SessionStorageProvider ⇐ <code>StorageProvider</code>
**Kind**: static class of [<code>Storage</code>](#ZAmp.Storage)  
**Extends**: <code>StorageProvider</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.SessionStorageProvider](#ZAmp.Storage.SessionStorageProvider) ⇐ <code>StorageProvider</code>
    * [new SessionStorageProvider()](#new_ZAmp.Storage.SessionStorageProvider_new)
    * [.getName()](#ZAmp.Storage.SessionStorageProvider+getName)
    * [.storeValue(name, value)](#ZAmp.Storage.SessionStorageProvider+storeValue) ⇒ <code>any</code>
    * [.getValue(name, defaultValue, ...args)](#ZAmp.Storage.SessionStorageProvider+getValue) ⇒ <code>StorageRetrievalResult</code>
    * [.isAvailable()](#ZAmp.Storage.SessionStorageProvider+isAvailable) ⇒ <code>Boolean</code>

<a name="new_ZAmp.Storage.SessionStorageProvider_new"></a>

### new SessionStorageProvider()
Construct a new session storage provider.

<a name="ZAmp.Storage.SessionStorageProvider+getName"></a>

### sessionStorageProvider.getName()
Get the unique name of this provider.

**Kind**: instance method of [<code>SessionStorageProvider</code>](#ZAmp.Storage.SessionStorageProvider)  
**Access**: public  
<a name="ZAmp.Storage.SessionStorageProvider+storeValue"></a>

### sessionStorageProvider.storeValue(name, value) ⇒ <code>any</code>
Store a new value (or update an existing one).

**Kind**: instance method of [<code>SessionStorageProvider</code>](#ZAmp.Storage.SessionStorageProvider)  
**Returns**: <code>any</code> - The value that was stored.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key to use to store the value. |
| value | <code>any</code> | The value to store (can be an object or a simple value). |

<a name="ZAmp.Storage.SessionStorageProvider+getValue"></a>

### sessionStorageProvider.getValue(name, defaultValue, ...args) ⇒ <code>StorageRetrievalResult</code>
Retrieve a value based on its name from the storage repository.

**Kind**: instance method of [<code>SessionStorageProvider</code>](#ZAmp.Storage.SessionStorageProvider)  
**Returns**: <code>StorageRetrievalResult</code> - The result of the retrieval attempt.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to retrieve. |
| defaultValue | <code>any</code> | The value to return if one cannot be found. |
| ...args | <code>any</code> | Any arguments to return along with the value. |

<a name="ZAmp.Storage.SessionStorageProvider+isAvailable"></a>

### sessionStorageProvider.isAvailable() ⇒ <code>Boolean</code>
Determine whether or not this storage provider is available in thecurrent context.

**Kind**: instance method of [<code>SessionStorageProvider</code>](#ZAmp.Storage.SessionStorageProvider)  
**Access**: public  
