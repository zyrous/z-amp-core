<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences"></a>

## AudioHtmlVisualiser.AudioHtmlVisualiserPreferences
Describes settings for a HTML visualiser that control how it configures itself and howit behaves.

**Kind**: static class of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioHtmlVisualiserPreferences](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences)
    * [.animationFrameLength](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+animationFrameLength) : <code>Number</code>
    * [.mutationHtmlAttributeName](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+mutationHtmlAttributeName) : <code>String</code>
    * [.frequencyElements](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+frequencyElements) : <code>Array.&lt;HTMLElement&gt;</code>

<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+animationFrameLength"></a>

### audioHtmlVisualiserPreferences.animationFrameLength : <code>Number</code>
The targeted length of a single frame of animation for the visualiser. Defaults to17 (60 frames per second).

**Kind**: instance property of [<code>AudioHtmlVisualiserPreferences</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+mutationHtmlAttributeName"></a>

### audioHtmlVisualiserPreferences.mutationHtmlAttributeName : <code>String</code>
The HTML attribute name to find in order to mutate elements. Change this if youwant a distinct set of mutated elements that aren't affected by others. Defaults to "audio-vis-eq-frequency".

**Kind**: instance property of [<code>AudioHtmlVisualiserPreferences</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences+frequencyElements"></a>

### audioHtmlVisualiserPreferences.frequencyElements : <code>Array.&lt;HTMLElement&gt;</code>
The set of HTML elements that will be animated according to the audio frequencies.

**Kind**: instance property of [<code>AudioHtmlVisualiserPreferences</code>](#ZAmp.Components.AudioHtmlVisualiser.AudioHtmlVisualiserPreferences)  
**Access**: public  
