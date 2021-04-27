<a name="ZAmp.Storage.LocalStorageProvider"></a>

## Storage.LocalStorageProvider ⇐ <code>StorageProvider</code>
A provider that uses the browser's local storage to save and retrieve values.Local storage is persistent between sessions, so use this provider type if youwant things like play position, EQ settings etc to return to their originalvalues when the user comes back to your site. Not that this also persistsacross all pages in the same domain, so if you have multiple pages with aplayer, they will share the same values.

**Kind**: static class of [<code>Storage</code>](#ZAmp.Storage)  
**Extends**: <code>StorageProvider</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.LocalStorageProvider](#ZAmp.Storage.LocalStorageProvider) ⇐ <code>StorageProvider</code>
    * [new LocalStorageProvider()](#new_ZAmp.Storage.LocalStorageProvider_new)
    * [.getName()](#ZAmp.Storage.LocalStorageProvider+getName)
    * [.storeValue(name, value)](#ZAmp.Storage.LocalStorageProvider+storeValue) ⇒ <code>any</code>
    * [.getValue(name, defaultValue, ...args)](#ZAmp.Storage.LocalStorageProvider+getValue) ⇒ <code>StorageRetrievalResult</code>
    * [.isAvailable()](#ZAmp.Storage.LocalStorageProvider+isAvailable) ⇒ <code>Boolean</code>

<a name="new_ZAmp.Storage.LocalStorageProvider_new"></a>

### new LocalStorageProvider()
Construct a new local storage provider.

<a name="ZAmp.Storage.LocalStorageProvider+getName"></a>

### localStorageProvider.getName()
Get the unique name of this provider.

**Kind**: instance method of [<code>LocalStorageProvider</code>](#ZAmp.Storage.LocalStorageProvider)  
**Access**: public  
<a name="ZAmp.Storage.LocalStorageProvider+storeValue"></a>

### localStorageProvider.storeValue(name, value) ⇒ <code>any</code>
Store a new value (or update an existing one).

**Kind**: instance method of [<code>LocalStorageProvider</code>](#ZAmp.Storage.LocalStorageProvider)  
**Returns**: <code>any</code> - The value that was stored.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key to use to store the value. |
| value | <code>any</code> | The value to store (can be an object or a simple value). |

<a name="ZAmp.Storage.LocalStorageProvider+getValue"></a>

### localStorageProvider.getValue(name, defaultValue, ...args) ⇒ <code>StorageRetrievalResult</code>
Retrieve a value based on its name from the storage repository.

**Kind**: instance method of [<code>LocalStorageProvider</code>](#ZAmp.Storage.LocalStorageProvider)  
**Returns**: <code>StorageRetrievalResult</code> - The result of the retrieval attempt.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to retrieve. |
| defaultValue | <code>any</code> | The value to return if one cannot be found. |
| ...args | <code>any</code> | Any arguments to return along with the value. |

<a name="ZAmp.Storage.LocalStorageProvider+isAvailable"></a>

### localStorageProvider.isAvailable() ⇒ <code>Boolean</code>
Determine whether or not this storage provider is available in thecurrent context.

**Kind**: instance method of [<code>LocalStorageProvider</code>](#ZAmp.Storage.LocalStorageProvider)  
**Access**: public  
