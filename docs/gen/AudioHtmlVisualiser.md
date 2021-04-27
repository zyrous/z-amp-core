<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser"></a>

## AudioHtmlVisualiser.AudioHtmlVisualiser ⇐ <code>AudioComponent</code>
Implements a visualisation based on the audio frequencies of a specificaudio element. This component uses HTML elements with the "audio-vis-eq-frequency"attribute and manipulates them over time, to the music.

**Kind**: static class of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioHtmlVisualiser](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser) ⇐ <code>AudioComponent</code>
    * [new AudioHtmlVisualiser(prefs, componentName)](#new_ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser_new)
    * [.preferences](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+preferences) ⇒ <code>AudioHtmlVisualiserPreferences</code>
    * [.initialiseElements()](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+initialiseElements)
    * [.loadState()](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+loadState)
    * [.startAnimation(frameCallback)](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+startAnimation)
    * [.stopAnimation()](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+stopAnimation)

<a name="new_ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser_new"></a>

### new AudioHtmlVisualiser(prefs, componentName)
Create a new visualiser for manipulating HTML elements.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prefs | <code>AudioHtmlVisualiserPreferences</code> |  | Optional. The set of preferences that control this vis. |
| componentName | <code>String</code> | <code>AudioHtmlVisualiser</code> | Optional. Sets the name of the component. Defaults to "AudioHtmlVisualiser". |

<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+preferences"></a>

### audioHtmlVisualiser.preferences ⇒ <code>AudioHtmlVisualiserPreferences</code>
Gets the set of preferences that control how this visualiser is configured and behaves.

**Kind**: instance property of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser)  
<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+initialiseElements"></a>

### audioHtmlVisualiser.initialiseElements()
Find and attach to all of the HTML elements that will be used to perform the visualisation.

**Kind**: instance method of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser)  
**Access**: protected  
<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+loadState"></a>

### audioHtmlVisualiser.loadState()
Connect to all HTML elements and prepare to manipulate them according to a sound source.

**Kind**: instance method of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser)  
**Access**: protected  
<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+startAnimation"></a>

### audioHtmlVisualiser.startAnimation(frameCallback)
Start the animation running. The animation loop will continue untilcancelAnimation() is called.

**Kind**: instance method of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser)  
**Access**: public  

| Param | Description |
| --- | --- |
| frameCallback | The callback method to invoke after a frame has been animated. |

<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser+stopAnimation"></a>

### audioHtmlVisualiser.stopAnimation()
Request that the animation be stopped as soon as possible.

**Kind**: instance method of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiser)  
**Access**: public  
