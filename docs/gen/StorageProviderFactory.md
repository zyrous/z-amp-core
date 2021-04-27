<a name="ZAmp.Storage.StorageProviderFactory"></a>

## Storage.StorageProviderFactory
Uses the factory pattern to provide access to different types of storage provider.

**Kind**: static class of [<code>Storage</code>](#ZAmp.Storage)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  
<a name="ZAmp.Storage.StorageProviderFactory+createProvider"></a>

### storageProviderFactory.createProvider(providerName) ⇒ <code>StorageProvider</code>
Create a new storage provider, given its unique name.

**Kind**: instance method of [<code>StorageProviderFactory</code>](#ZAmp.Storage.StorageProviderFactory)  
**Returns**: <code>StorageProvider</code> - The new storage provider.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| providerName | <code>String</code> | The unique string that identifies a provider to retrieve. |

