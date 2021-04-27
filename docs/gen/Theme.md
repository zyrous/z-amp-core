<a name="ZAmp.Components.Theme.Theme"></a>

## Theme.Theme ⇐ <code>AudioComponent</code>
Provides a base class for custom ZAmp themes.

**Kind**: static class of [<code>Theme</code>](#ZAmp.Components.Theme)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.Theme](#ZAmp.Components.Theme.Theme) ⇐ <code>AudioComponent</code>
    * [new Theme(componentName)](#new_ZAmp.Components.Theme.Theme_new)
    * _instance_
        * [.configurer](#ZAmp.Components.Theme.Theme+configurer) : <code>ZAmpConfigurer</code>
        * [.themeName](#ZAmp.Components.Theme.Theme+themeName)
        * [.themeName](#ZAmp.Components.Theme.Theme+themeName) ⇒ <code>String</code>
        * [.register()](#ZAmp.Components.Theme.Theme+register)
        * *[.buildConfiguration()](#ZAmp.Components.Theme.Theme+buildConfiguration) ⇒ <code>ZAmpConfigurer</code>*
        * [.startConfiguring()](#ZAmp.Components.Theme.Theme+startConfiguring) ⇒ <code>ZAmpConfigurer</code>
    * _static_
        * [.create(themeName)](#ZAmp.Components.Theme.Theme.create) ⇒ <code>Theme</code>

<a name="new_ZAmp.Components.Theme.Theme_new"></a>

### new Theme(componentName)
Construct a new theme.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| componentName | <code>String</code> | <code>Theme</code> | Optional. The name of the component. Defaults to "Theme". |

<a name="ZAmp.Components.Theme.Theme+configurer"></a>

### theme.configurer : <code>ZAmpConfigurer</code>
The configurer that will be used to create the components and layoutsneeded by this theme.

**Kind**: instance property of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: public  
<a name="ZAmp.Components.Theme.Theme+themeName"></a>

### theme.themeName
Sets the name of this theme. Can be called from derived classes.

**Kind**: instance property of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| themeName | <code>String</code> | The name to give to the theme. |

<a name="ZAmp.Components.Theme.Theme+themeName"></a>

### theme.themeName ⇒ <code>String</code>
Gets the name of this theme.

**Kind**: instance property of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: public  
<a name="ZAmp.Components.Theme.Theme+register"></a>

### theme.register()
Register this theme with the theme manager. This method must be calledbefore the theme is available for use within ZAmp.

**Kind**: instance method of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: public  
<a name="ZAmp.Components.Theme.Theme+buildConfiguration"></a>

### *theme.buildConfiguration() ⇒ <code>ZAmpConfigurer</code>*
Build the configuration that will provide the components and layouts forthis theme. This must be implemented in derived classes.

**Kind**: instance abstract method of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: protected  
<a name="ZAmp.Components.Theme.Theme+startConfiguring"></a>

### theme.startConfiguring() ⇒ <code>ZAmpConfigurer</code>
Begin configuring the ZAmp configuration for this theme.

**Kind**: instance method of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: protected  
<a name="ZAmp.Components.Theme.Theme.create"></a>

### Theme.create(themeName) ⇒ <code>Theme</code>
Create, register and return a new instance of a Theme.

**Kind**: static method of [<code>Theme</code>](#ZAmp.Components.Theme.Theme)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| themeName | <code>String</code> | <code>Theme</code> | Optional. The name to give to the new theme.  Defaults to a random UUID. |

