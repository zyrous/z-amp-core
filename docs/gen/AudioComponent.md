<a name="ZAmp.Components.AudioComponent"></a>

## *Components.AudioComponent*
Provides a base class for all ZAmp components to inherit from.

**Kind**: static abstract class of [<code>Components</code>](#ZAmp.Components)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* *[.AudioComponent](#ZAmp.Components.AudioComponent)*
    * *[new AudioComponent(componentName)](#new_ZAmp.Components.AudioComponent_new)*
    * *[.componentName](#ZAmp.Components.AudioComponent+componentName) : <code>String</code>*
    * *[.rootElement](#ZAmp.Components.AudioComponent+rootElement) : <code>HtmlElement</code>*
    * **[.initialiseElements()](#ZAmp.Components.AudioComponent+initialiseElements)**
    * **[.initialiseKeys()](#ZAmp.Components.AudioComponent+initialiseKeys)**
    * **[.loadState()](#ZAmp.Components.AudioComponent+loadState)**
    * *[.initialise()](#ZAmp.Components.AudioComponent+initialise) ⇒ <code>Promise.&lt;Array&gt;</code>*
    * *[.addEventListener(eventName, callback)](#ZAmp.Components.AudioComponent+addEventListener)*
    * *[.raiseEvent(eventName, ...args)](#ZAmp.Components.AudioComponent+raiseEvent)*
    * *[.handleEvent(eventName, channel, ...args)](#ZAmp.Components.AudioComponent+handleEvent)*
    * *[.attachElement(parentObject, elementName, selector, ...eventListeners)](#ZAmp.Components.AudioComponent+attachElement) ⇒ <code>HTMLElement</code>*
    * *[.attachMultipleElements(parentObject, elementName, selector, ...eventListeners)](#ZAmp.Components.AudioComponent+attachMultipleElements) ⇒ <code>Array.&lt;HTMLElement&gt;</code>*
    * *[.storeValue(name, value)](#ZAmp.Components.AudioComponent+storeValue) ⇒ <code>any</code>*
    * *[.getValue(name, defaultValue, ...args)](#ZAmp.Components.AudioComponent+getValue) ⇒ <code>StorageRetrievalResult</code>*
    * *[.belongsToChannel(channelName)](#ZAmp.Components.AudioComponent+belongsToChannel) ⇒ <code>Boolean</code>*
    * *[.addToChannel(channelName)](#ZAmp.Components.AudioComponent+addToChannel)*
    * *[.attachToRootElement(rootElement)](#ZAmp.Components.AudioComponent+attachToRootElement)*
    * *[.setStorageProvider(provider)](#ZAmp.Components.AudioComponent+setStorageProvider)*

<a name="new_ZAmp.Components.AudioComponent_new"></a>

### *new AudioComponent(componentName)*
Construct a new ZAmp component. Each ZAmp component must call this method withinits own constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| componentName | <code>String</code> | <code>Undefined</code> | The name of this component. Names are used to uniquely identify an *instance* of a component. |

<a name="ZAmp.Components.AudioComponent+componentName"></a>

### *audioComponent.componentName : <code>String</code>*
Gets the name of this component.

**Kind**: instance property of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  
<a name="ZAmp.Components.AudioComponent+rootElement"></a>

### *audioComponent.rootElement : <code>HtmlElement</code>*
Gets the parent element that the component should attach to.

**Kind**: instance property of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: protected  
<a name="ZAmp.Components.AudioComponent+initialiseElements"></a>

### **audioComponent.initialiseElements()**
Initialise elements on the page to allow the user to control this component. EachZAmp component is expected to implement this method.

**Kind**: instance abstract method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: protected  
<a name="ZAmp.Components.AudioComponent+initialiseKeys"></a>

### **audioComponent.initialiseKeys()**
Initialise the set of keys and key combinations that will be used to control thiscomponent. Each ZAmp component is expected to implement this method.

**Kind**: instance abstract method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: protected  
<a name="ZAmp.Components.AudioComponent+loadState"></a>

### **audioComponent.loadState()**
Load any previously saved state into this component, using the storage provider. Each ZAmp component is expected to implement this method.

**Kind**: instance abstract method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: protected  
<a name="ZAmp.Components.AudioComponent+initialise"></a>

### *audioComponent.initialise() ⇒ <code>Promise.&lt;Array&gt;</code>*
Initialise this audio component so that it is ready to be used.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - The promise that, when resolved, indicates that this componenthas been initialised.  
**Access**: public  
<a name="ZAmp.Components.AudioComponent+addEventListener"></a>

### *audioComponent.addEventListener(eventName, callback)*
Adds a listener for a specific named event. When the event fires,the callback will be invoked.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event to listen to. |
| callback | <code>function</code> | The function to call. |

<a name="ZAmp.Components.AudioComponent+raiseEvent"></a>

### *audioComponent.raiseEvent(eventName, ...args)*
Raise an event. All handlers attached to the event will be invoked.In addition, an extra event "eventRaised" will be instantiated.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event to raise. |
| ...args | <code>any</code> | Any arguments to pass to the listening function(s). |

<a name="ZAmp.Components.AudioComponent+handleEvent"></a>

### *audioComponent.handleEvent(eventName, channel, ...args)*
Handle an event that has been raised.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event to handle. |
| channel | <code>string</code> | The name of the channel that the event was raised on. |
| ...args | <code>any</code> | Any arguments to pass to event listeners. |

<a name="ZAmp.Components.AudioComponent+attachElement"></a>

### *audioComponent.attachElement(parentObject, elementName, selector, ...eventListeners) ⇒ <code>HTMLElement</code>*
Finds an HTML element in the page given a CSS selector and attaches it to a parent objectfor future use. Also attaches handlers for events, if required.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>HTMLElement</code> - The HTML element that was attached to.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| parentObject | <code>object</code> | The object to which the found element will be attached. |
| elementName | <code>string</code> | The name to give to the element's object when it is attached. |
| selector | <code>string</code> | The CSS selector string to use to find the element. |
| ...eventListeners | <code>any</code> | The set of listeners to attach to the element. |

<a name="ZAmp.Components.AudioComponent+attachMultipleElements"></a>

### *audioComponent.attachMultipleElements(parentObject, elementName, selector, ...eventListeners) ⇒ <code>Array.&lt;HTMLElement&gt;</code>*
Finds all HTML elements in the page given a CSS selector and attaches them to a parentobject for future use. Also attaches each one to handlers for events, if required.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>Array.&lt;HTMLElement&gt;</code> - The array of HTML elements that were attached to.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| parentObject | <code>any</code> | The object to which the found element will be attached. |
| elementName | <code>string</code> | The name to give to the element's object when it is attached. |
| selector | <code>string</code> | The CSS selector string to use to find the element. |
| ...eventListeners | <code>any</code> | The set of listeners to attach to each found element. |

<a name="ZAmp.Components.AudioComponent+storeValue"></a>

### *audioComponent.storeValue(name, value) ⇒ <code>any</code>*
Store a value for retrieval later.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>any</code> - The value that was stored.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to save. |
| value | <code>any</code> | The value to save. Note that the value need not be only a string. |

<a name="ZAmp.Components.AudioComponent+getValue"></a>

### *audioComponent.getValue(name, defaultValue, ...args) ⇒ <code>StorageRetrievalResult</code>*
Retrieve a previously stored value.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>StorageRetrievalResult</code> - The result of retrieving the value.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the value to retrieve. |
| defaultValue | <code>any</code> | The value to return if nothing can be found. |
| ...args | <code>any</code> | Any additional arguments to return along with the value. |

<a name="ZAmp.Components.AudioComponent+belongsToChannel"></a>

### *audioComponent.belongsToChannel(channelName) ⇒ <code>Boolean</code>*
Determines whether or not this component belongs to a specific channel.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Returns**: <code>Boolean</code> - True if the component belongs to the channel; false otherwise.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| channelName | <code>String</code> | The name of the channel to check for. |

<a name="ZAmp.Components.AudioComponent+addToChannel"></a>

### *audioComponent.addToChannel(channelName)*
Add this audio component to a specific channel.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| channelName | <code>String</code> | The name of the channel to add this component to. |

<a name="ZAmp.Components.AudioComponent+attachToRootElement"></a>

### *audioComponent.attachToRootElement(rootElement)*
Attach this audio component to a root DOM element.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HtmlElement</code> | The root element to attach this component to. |

<a name="ZAmp.Components.AudioComponent+setStorageProvider"></a>

### *audioComponent.setStorageProvider(provider)*
Set a new type of storage provider for this component.

**Kind**: instance method of [<code>AudioComponent</code>](#ZAmp.Components.AudioComponent)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| provider | <code>StorageProvider</code> | The provider to set. |

