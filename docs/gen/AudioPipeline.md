<a name="ZAmp.Components.AudioPipeline.AudioPipeline"></a>

## AudioPipeline.AudioPipeline ⇐ <code>AudioComponent</code>
Provides and manages a processing pipeline for audio.

**Kind**: static class of [<code>AudioPipeline</code>](#ZAmp.Components.AudioPipeline)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioPipeline](#ZAmp.Components.AudioPipeline.AudioPipeline) ⇐ <code>AudioComponent</code>
    * [new AudioPipeline(componentName)](#new_ZAmp.Components.AudioPipeline.AudioPipeline_new)
    * [.loadState()](#ZAmp.Components.AudioPipeline.AudioPipeline+loadState)

<a name="new_ZAmp.Components.AudioPipeline.AudioPipeline_new"></a>

### new AudioPipeline(componentName)
Construct a new audio processing pipeline.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| componentName | <code>String</code> | <code>AudioPipeline</code> | The name of this component. Defaults to "AudioPipeline". "Default". |

<a name="ZAmp.Components.AudioPipeline.AudioPipeline+loadState"></a>

### audioPipeline.loadState()
Load any previous state for this pipeline and prepare for processing.

**Kind**: instance method of [<code>AudioPipeline</code>](#ZAmp.Components.AudioPipeline.AudioPipeline)  
**Access**: protected  
