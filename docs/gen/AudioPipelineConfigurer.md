<a name="ZAmp.Configuration.AudioPipelineConfigurer"></a>

## Configuration.AudioPipelineConfigurer
Provides a facility that allows the user to configure a ZAmp instance's componentsfor use by a single theme.

**Kind**: static class of [<code>Configuration</code>](#ZAmp.Configuration)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioPipelineConfigurer](#ZAmp.Configuration.AudioPipelineConfigurer)
    * [new AudioPipelineConfigurer(builder, pipelineName, parentSelector)](#new_ZAmp.Configuration.AudioPipelineConfigurer_new)
    * [.parentSelector](#ZAmp.Configuration.AudioPipelineConfigurer+parentSelector) : <code>String</code>
    * [.addComponentConfigurer(configurer)](#ZAmp.Configuration.AudioPipelineConfigurer+addComponentConfigurer)
    * [.addLayoutConfigurer(configurer)](#ZAmp.Configuration.AudioPipelineConfigurer+addLayoutConfigurer)
    * [.configureComponents(rootElement)](#ZAmp.Configuration.AudioPipelineConfigurer+configureComponents) ⇒ <code>Array.&lt;AudioComponent&gt;</code>
    * [.for(elementSelector)](#ZAmp.Configuration.AudioPipelineConfigurer+for) ⇒ <code>AudioPipelineConfigurer</code>
    * [.configureLayouts(rootElement)](#ZAmp.Configuration.AudioPipelineConfigurer+configureLayouts) ⇒ <code>Array.&lt;Promise&gt;</code>
    * [.withAudioHtmlVisualiser()](#ZAmp.Configuration.AudioPipelineConfigurer+withAudioHtmlVisualiser) ⇒ <code>ComponentConfigurer</code>
    * [.withAudioPlayer()](#ZAmp.Configuration.AudioPipelineConfigurer+withAudioPlayer) ⇒ <code>ComponentConfigurer</code>
    * [.withEqualizer()](#ZAmp.Configuration.AudioPipelineConfigurer+withEqualizer) ⇒ <code>ComponentConfigurer</code>
    * [.withPlaylistManager()](#ZAmp.Configuration.AudioPipelineConfigurer+withPlaylistManager) ⇒ <code>ComponentConfigurer</code>
    * [.withLayout(fileName)](#ZAmp.Configuration.AudioPipelineConfigurer+withLayout)
    * [.withName(name)](#ZAmp.Configuration.AudioPipelineConfigurer+withName) ⇒ <code>AudioPipelineConfigurer</code>
    * [.then()](#ZAmp.Configuration.AudioPipelineConfigurer+then) ⇒

<a name="new_ZAmp.Configuration.AudioPipelineConfigurer_new"></a>

### new AudioPipelineConfigurer(builder, pipelineName, parentSelector)

| Param | Type | Description |
| --- | --- | --- |
| builder | <code>any</code> | The builder that is adding this audio pipeline to itself. |
| pipelineName | <code>String</code> | Optional. The name of the pipeline that will be configured. Defaults to "Default". |
| parentSelector | <code>String</code> | Optional. The selector that will be used to find the element to initialise. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+parentSelector"></a>

### audioPipelineConfigurer.parentSelector : <code>String</code>
The HTML selector that will be used to identify the parentelement to initialise within.

**Kind**: instance property of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.AudioPipelineConfigurer+addComponentConfigurer"></a>

### audioPipelineConfigurer.addComponentConfigurer(configurer)
Add a component configurer to this set of configurers. Intended for use by childcomponents.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| configurer | <code>ComponentConfigurer</code> | The component configurer to add. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+addLayoutConfigurer"></a>

### audioPipelineConfigurer.addLayoutConfigurer(configurer)
Add a layout configurer to this set of configurers. Intended for use by childcomponents.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| configurer | <code>LayoutConfigurer</code> | The layout configurer to add. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+configureComponents"></a>

### audioPipelineConfigurer.configureComponents(rootElement) ⇒ <code>Array.&lt;AudioComponent&gt;</code>
Configure the entire set of components that make up this ZAmp configuration.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HTMLElement</code> | The HTML element to use to attach to DOM elements. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+for"></a>

### audioPipelineConfigurer.for(elementSelector) ⇒ <code>AudioPipelineConfigurer</code>
Set the element that the configurer will apply to. Overrides any selector setby the parent.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The selector that will be used to find the element to initialise. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+configureLayouts"></a>

### audioPipelineConfigurer.configureLayouts(rootElement) ⇒ <code>Array.&lt;Promise&gt;</code>
Configure the entire set of layouts that make up this ZAmp configuration.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HTMLElement</code> | The HTML element to use to render content into. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+withAudioHtmlVisualiser"></a>

### audioPipelineConfigurer.withAudioHtmlVisualiser() ⇒ <code>ComponentConfigurer</code>
Add a visualiser for manipulating HTML elements in time to the audio.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.AudioPipelineConfigurer+withAudioPlayer"></a>

### audioPipelineConfigurer.withAudioPlayer() ⇒ <code>ComponentConfigurer</code>
Add an audio player for streaming media from an online source.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.AudioPipelineConfigurer+withEqualizer"></a>

### audioPipelineConfigurer.withEqualizer() ⇒ <code>ComponentConfigurer</code>
Add an equalizer for manipulating frequency bands in the audio pipeline.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.AudioPipelineConfigurer+withPlaylistManager"></a>

### audioPipelineConfigurer.withPlaylistManager() ⇒ <code>ComponentConfigurer</code>
Add a manager for multiple media files.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.AudioPipelineConfigurer+withLayout"></a>

### audioPipelineConfigurer.withLayout(fileName)
Add a new layout for this configuration.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>String</code> | The path to the file that contains the layout template. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+withName"></a>

### audioPipelineConfigurer.withName(name) ⇒ <code>AudioPipelineConfigurer</code>
Specify the name to use for the pipeline.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name to set on the pipeline. |

<a name="ZAmp.Configuration.AudioPipelineConfigurer+then"></a>

### audioPipelineConfigurer.then() ⇒
Complete configuration of the audio pipeline and continue configuration.

**Kind**: instance method of [<code>AudioPipelineConfigurer</code>](#ZAmp.Configuration.AudioPipelineConfigurer)  
**Returns**: The builder that this audio pipeline is for.  
