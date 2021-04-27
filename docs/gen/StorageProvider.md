<a name="ZAmp.Storage.StorageProvider"></a>

## *Storage.StorageProvider*
Provides a base (abstract) class for different types of providers thatoffer storage capability to audio components.

**Kind**: static abstract class of [<code>Storage</code>](#ZAmp.Storage)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* *[.StorageProvider](#ZAmp.Storage.StorageProvider)*
    * _instance_
        * **[.storeValue(name, value)](#ZAmp.Storage.StorageProvider+storeValue)**
        * **[.getValue(name, defaultValue, ...args)](#ZAmp.Storage.StorageProvider+getValue) ⇒ <code>StorageRetrievalResult</code>**
        * **[.isAvailable()](#ZAmp.Storage.StorageProvider+isAvailable) ⇒ <code>Boolean</code>**
    * _static_
        * **[.getName()](#ZAmp.Storage.StorageProvider.getName) ⇒ <code>String</code>**

<a name="ZAmp.Storage.StorageProvider+storeValue"></a>

### **storageProvider.storeValue(name, value)**
Store a name-value pair of information.

**Kind**: instance abstract method of [<code>StorageProvider</code>](#ZAmp.Storage.StorageProvider)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to store. |
| value | <code>any</code> | The string value to store. Note that any type of object is accepted, not only strings. |

<a name="ZAmp.Storage.StorageProvider+getValue"></a>

### **storageProvider.getValue(name, defaultValue, ...args) ⇒ <code>StorageRetrievalResult</code>**
Retrieve a value based on its name from the storage repository.

**Kind**: instance abstract method of [<code>StorageProvider</code>](#ZAmp.Storage.StorageProvider)  
**Returns**: <code>StorageRetrievalResult</code> - The result of the retrieval attempt.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to retrieve. |
| defaultValue | <code>any</code> | The value to return if one cannot be found. |
| ...args | <code>any</code> | Any arguments to return along with the value. |

<a name="ZAmp.Storage.StorageProvider+isAvailable"></a>

### **storageProvider.isAvailable() ⇒ <code>Boolean</code>**
Determine whether or not this storage provider is available in thecurrent context.

**Kind**: instance abstract method of [<code>StorageProvider</code>](#ZAmp.Storage.StorageProvider)  
**Access**: public  
<a name="ZAmp.Storage.StorageProvider.getName"></a>

### **StorageProvider.getName() ⇒ <code>String</code>**
Gets the name of this type of storage provider.

**Kind**: static abstract method of [<code>StorageProvider</code>](#ZAmp.Storage.StorageProvider)  
**Access**: public  
