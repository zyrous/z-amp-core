<a name="ZAmp.Components.Equalizer.FilterPreferences"></a>

## Equalizer.FilterPreferences
Preferences that dictate how an Equalizer will initialise and control its frequencies.

**Kind**: static class of [<code>Equalizer</code>](#ZAmp.Components.Equalizer)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.FilterPreferences](#ZAmp.Components.Equalizer.FilterPreferences)
    * [.frequencyRangeElements](#ZAmp.Components.Equalizer.FilterPreferences+frequencyRangeElements) : <code>Array.&lt;HTMLElement&gt;</code>
    * [.frequencyLabelElements](#ZAmp.Components.Equalizer.FilterPreferences+frequencyLabelElements) : <code>Array.&lt;HTMLElement&gt;</code>
    * [.minFrequencyGain](#ZAmp.Components.Equalizer.FilterPreferences+minFrequencyGain) : <code>Number</code>
    * [.maxFrequencyGain](#ZAmp.Components.Equalizer.FilterPreferences+maxFrequencyGain) : <code>Number</code>
    * [.frequencyGainStepSize](#ZAmp.Components.Equalizer.FilterPreferences+frequencyGainStepSize) : <code>Number</code>
    * [.defaultFrequencyGain](#ZAmp.Components.Equalizer.FilterPreferences+defaultFrequencyGain) : <code>Number</code>

<a name="ZAmp.Components.Equalizer.FilterPreferences+frequencyRangeElements"></a>

### filterPreferences.frequencyRangeElements : <code>Array.&lt;HTMLElement&gt;</code>
The set of HTML range elements that will be used for adjusting frequencies. If notset by the user, this will be dynamically allocated at initialisation time based onthe "audio-button-eq-range" attribute.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
<a name="ZAmp.Components.Equalizer.FilterPreferences+frequencyLabelElements"></a>

### filterPreferences.frequencyLabelElements : <code>Array.&lt;HTMLElement&gt;</code>
The set of HTML label elements that will be used for showing the frequencies ofeach band. If not set by the user, this will be dynamically allocated at initialisationtime based on the "audio-label-eq-frequency" attribute.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
<a name="ZAmp.Components.Equalizer.FilterPreferences+minFrequencyGain"></a>

### filterPreferences.minFrequencyGain : <code>Number</code>
The minimum amount of gain to allow the user to apply to each frequency, in decibels.Defaults to -25.0dB.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
<a name="ZAmp.Components.Equalizer.FilterPreferences+maxFrequencyGain"></a>

### filterPreferences.maxFrequencyGain : <code>Number</code>
The maximum amount of gain to allow the user to apply to each frequency, in decibels.Defaults to 25dB.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
<a name="ZAmp.Components.Equalizer.FilterPreferences+frequencyGainStepSize"></a>

### filterPreferences.frequencyGainStepSize : <code>Number</code>
The amount between each change of gain to allow the use to make, in decbels. Defaults to 0.01dB.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
<a name="ZAmp.Components.Equalizer.FilterPreferences+defaultFrequencyGain"></a>

### filterPreferences.defaultFrequencyGain : <code>Number</code>
The default amount of gain to apply to each frequency, in decibels. Defaults to 0.0dB.

**Kind**: instance property of [<code>FilterPreferences</code>](#ZAmp.Components.Equalizer.FilterPreferences)  
