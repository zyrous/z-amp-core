<a name="ZAmp.Configuration.ZAmpConfigurer"></a>

## Configuration.ZAmpConfigurer
Provides a facility that allows the user to configure a ZAmp instance's componentsfor use by a single theme.

**Kind**: static class of [<code>Configuration</code>](#ZAmp.Configuration)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.ZAmpConfigurer](#ZAmp.Configuration.ZAmpConfigurer)
    * [new ZAmpConfigurer(themeName)](#new_ZAmp.Configuration.ZAmpConfigurer_new)
    * [.addComponentConfigurer(configurer)](#ZAmp.Configuration.ZAmpConfigurer+addComponentConfigurer)
    * [.addLayoutConfigurer(configurer)](#ZAmp.Configuration.ZAmpConfigurer+addLayoutConfigurer)
    * [.configureComponents(elementSelector)](#ZAmp.Configuration.ZAmpConfigurer+configureComponents) ⇒ <code>Array.&lt;AudioComponent&gt;</code>
    * [.for(elementSelector)](#ZAmp.Configuration.ZAmpConfigurer+for)
    * [.configureLayouts(elementSelector)](#ZAmp.Configuration.ZAmpConfigurer+configureLayouts)
    * [.apply()](#ZAmp.Configuration.ZAmpConfigurer+apply) ⇒ <code>Promise.&lt;Amp&gt;</code>
    * [.addAudioPipeline()](#ZAmp.Configuration.ZAmpConfigurer+addAudioPipeline) ⇒ <code>AudioPipelineConfigurer</code>
    * [.addLayout(fileName)](#ZAmp.Configuration.ZAmpConfigurer+addLayout)

<a name="new_ZAmp.Configuration.ZAmpConfigurer_new"></a>

### new ZAmpConfigurer(themeName)

| Param | Type | Description |
| --- | --- | --- |
| themeName | <code>String</code> | Optional. The name of the theme that the configurer is for. If left empty, calling apply() will result in an error if more than one theme is available. |

<a name="ZAmp.Configuration.ZAmpConfigurer+addComponentConfigurer"></a>

### zAmpConfigurer.addComponentConfigurer(configurer)
Add a component configurer to this set of configurers. Intended for use by childcomponents.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| configurer | <code>ComponentConfigurer</code> | The component configurer to add. |

<a name="ZAmp.Configuration.ZAmpConfigurer+addLayoutConfigurer"></a>

### zAmpConfigurer.addLayoutConfigurer(configurer)
Add a layout configurer to this set of configurers. Intended for use by childcomponents.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| configurer | <code>LayoutConfigurer</code> | The layout configurer to add. |

<a name="ZAmp.Configuration.ZAmpConfigurer+configureComponents"></a>

### zAmpConfigurer.configureComponents(elementSelector) ⇒ <code>Array.&lt;AudioComponent&gt;</code>
Configure the entire set of components that make up this ZAmp configuration.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The HTML element to use to attach to. |

<a name="ZAmp.Configuration.ZAmpConfigurer+for"></a>

### zAmpConfigurer.for(elementSelector)
Set the element that the configurer will apply to.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The selector that will be used to find the element to initialise. |

<a name="ZAmp.Configuration.ZAmpConfigurer+configureLayouts"></a>

### zAmpConfigurer.configureLayouts(elementSelector)
Configure the entire set of layouts that make up this ZAmp configuration.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The HTML element to use to render content into. |

<a name="ZAmp.Configuration.ZAmpConfigurer+apply"></a>

### zAmpConfigurer.apply() ⇒ <code>Promise.&lt;Amp&gt;</code>
Apply this configuration and initialise the element.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Returns**: <code>Promise.&lt;Amp&gt;</code> - The newly initialised Amp.  
<a name="ZAmp.Configuration.ZAmpConfigurer+addAudioPipeline"></a>

### zAmpConfigurer.addAudioPipeline() ⇒ <code>AudioPipelineConfigurer</code>
Add a pipeline for processing and playing audio.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.ZAmpConfigurer+addLayout"></a>

### zAmpConfigurer.addLayout(fileName)
Add a new layout for this configuration.

**Kind**: instance method of [<code>ZAmpConfigurer</code>](#ZAmp.Configuration.ZAmpConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>String</code> | The path to the file that contains the layout template. |

