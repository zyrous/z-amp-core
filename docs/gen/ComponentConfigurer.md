<a name="ZAmp.Configuration.ComponentConfigurer"></a>

## Configuration.ComponentConfigurer
Allows for configuration of a ZAmp component by a theme. This forms partof a collection owned by a ZAmpConfigurer.

**Kind**: static class of [<code>Configuration</code>](#ZAmp.Configuration)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.ComponentConfigurer](#ZAmp.Configuration.ComponentConfigurer)
    * [new ComponentConfigurer(componentType, PreferencesType, builder, componentName)](#new_ZAmp.Configuration.ComponentConfigurer_new)
    * [.preferences](#ZAmp.Configuration.ComponentConfigurer+preferences) : <code>Type</code>
    * [.withSettings(settings)](#ZAmp.Configuration.ComponentConfigurer+withSettings) ⇒ <code>ComponentConfigurer</code>
    * [.withName(name)](#ZAmp.Configuration.ComponentConfigurer+withName) ⇒ <code>ComponentConfigurer</code>
    * [.configure(rootElement, channelName)](#ZAmp.Configuration.ComponentConfigurer+configure) ⇒ <code>any</code>
    * [.and()](#ZAmp.Configuration.ComponentConfigurer+and)

<a name="new_ZAmp.Configuration.ComponentConfigurer_new"></a>

### new ComponentConfigurer(componentType, PreferencesType, builder, componentName)
Create a new configurer for a specific type of ZAmp component.


| Param | Type | Description |
| --- | --- | --- |
| componentType | <code>Type</code> | The type of the component to create. |
| PreferencesType | <code>Type</code> | The type of the preferences that will be provided to the  component when it is created. |
| builder | <code>any</code> | The configurer that this component configurer belongs to. |
| componentName | <code>String</code> | The name to give the component. |

<a name="ZAmp.Configuration.ComponentConfigurer+preferences"></a>

### componentConfigurer.preferences : <code>Type</code>
The preferences that will be provided to the component type when it is initialised.

**Kind**: instance property of [<code>ComponentConfigurer</code>](#ZAmp.Configuration.ComponentConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.ComponentConfigurer+withSettings"></a>

### componentConfigurer.withSettings(settings) ⇒ <code>ComponentConfigurer</code>
Specify the setting overrides for this component.

**Kind**: instance method of [<code>ComponentConfigurer</code>](#ZAmp.Configuration.ComponentConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>any</code> | The settings to override for the component. |

<a name="ZAmp.Configuration.ComponentConfigurer+withName"></a>

### componentConfigurer.withName(name) ⇒ <code>ComponentConfigurer</code>
Specify the name to use for the component.

**Kind**: instance method of [<code>ComponentConfigurer</code>](#ZAmp.Configuration.ComponentConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name to set on the component. |

<a name="ZAmp.Configuration.ComponentConfigurer+configure"></a>

### componentConfigurer.configure(rootElement, channelName) ⇒ <code>any</code>
Create the component defined by this configurer.

**Kind**: instance method of [<code>ComponentConfigurer</code>](#ZAmp.Configuration.ComponentConfigurer)  
**Returns**: <code>any</code> - The newly constructed component.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HtmlElement</code> | The DOM element that the component will configure itself within. |
| channelName | <code>String</code> | The name of the channel to add the component to. |

<a name="ZAmp.Configuration.ComponentConfigurer+and"></a>

### componentConfigurer.and()
Add another component to the ZAmp configurer.

**Kind**: instance method of [<code>ComponentConfigurer</code>](#ZAmp.Configuration.ComponentConfigurer)  
**Access**: public  
