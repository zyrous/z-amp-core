<a name="ZAmp.Storage.NullStorageProvider"></a>

## Storage.NullStorageProvider ⇐ <code>StorageProvider</code>
The null storage provider stores nothing. Instead it responds to eachcall to retrieve a value with the default that is supplied to it. Usethis provider if you want ZAmp interactions to be short-lived, i.e.for the duration of a single page load only.

**Kind**: static class of [<code>Storage</code>](#ZAmp.Storage)  
**Extends**: <code>StorageProvider</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.NullStorageProvider](#ZAmp.Storage.NullStorageProvider) ⇐ <code>StorageProvider</code>
    * [new NullStorageProvider()](#new_ZAmp.Storage.NullStorageProvider_new)
    * [.storeValue](#ZAmp.Storage.NullStorageProvider+storeValue) ⇒ <code>any</code>
    * [.getValue](#ZAmp.Storage.NullStorageProvider+getValue) ⇒ <code>StorageRetrievalResult</code>
    * [.isAvailable](#ZAmp.Storage.NullStorageProvider+isAvailable) ⇒ <code>Boolean</code>
    * [.getName()](#ZAmp.Storage.NullStorageProvider+getName)

<a name="new_ZAmp.Storage.NullStorageProvider_new"></a>

### new NullStorageProvider()
Construct a new null storage provider.

<a name="ZAmp.Storage.NullStorageProvider+storeValue"></a>

### nullStorageProvider.storeValue ⇒ <code>any</code>
Store a new value (or update an existing one).

**Kind**: instance property of [<code>NullStorageProvider</code>](#ZAmp.Storage.NullStorageProvider)  
**Returns**: <code>any</code> - The value that was stored.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key to use to store the value. |
| value | <code>any</code> | The value to store (can be an object or a simple value). |

<a name="ZAmp.Storage.NullStorageProvider+getValue"></a>

### nullStorageProvider.getValue ⇒ <code>StorageRetrievalResult</code>
Retrieve a value based on its name from the storage repository.

**Kind**: instance property of [<code>NullStorageProvider</code>](#ZAmp.Storage.NullStorageProvider)  
**Returns**: <code>StorageRetrievalResult</code> - The result of the retrieval attempt.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to retrieve. |
| defaultValue | <code>any</code> | The value to return if one cannot be found. |
| ...args | <code>any</code> | Any arguments to return along with the value. |

<a name="ZAmp.Storage.NullStorageProvider+isAvailable"></a>

### nullStorageProvider.isAvailable ⇒ <code>Boolean</code>
Determine whether or not this storage provider is available in thecurrent context.

**Kind**: instance property of [<code>NullStorageProvider</code>](#ZAmp.Storage.NullStorageProvider)  
**Access**: public  
<a name="ZAmp.Storage.NullStorageProvider+getName"></a>

### nullStorageProvider.getName()
Get the unique name of this provider.

**Kind**: instance method of [<code>NullStorageProvider</code>](#ZAmp.Storage.NullStorageProvider)  
**Access**: public  
