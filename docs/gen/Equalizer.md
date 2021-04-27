<a name="ZAmp.Components.Equalizer.Equalizer"></a>

## Equalizer.Equalizer ⇐ <code>AudioComponent</code>
A component that allows for graphical EQ by the user. This is achieved throughan arbitrary number of range sliders with the "audio-button-eq-range" attribute.The component dynamically creates N number of frequency bands (N = number of range sliders), chained together and connecting the audio source to its destination.By default, each frequency band can be adjusted by +/- 40dB.

**Kind**: static class of [<code>Equalizer</code>](#ZAmp.Components.Equalizer)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.Equalizer](#ZAmp.Components.Equalizer.Equalizer) ⇐ <code>AudioComponent</code>
    * [new Equalizer(prefs, componentName)](#new_ZAmp.Components.Equalizer.Equalizer_new)
    * [.preferences](#ZAmp.Components.Equalizer.Equalizer+preferences) : <code>EqualizerPreferences</code>
    * [.loadState()](#ZAmp.Components.Equalizer.Equalizer+loadState)
    * [.initialiseElements()](#ZAmp.Components.Equalizer.Equalizer+initialiseElements)
    * [.removePreset(name)](#ZAmp.Components.Equalizer.Equalizer+removePreset)
    * [.addPreset(preset)](#ZAmp.Components.Equalizer.Equalizer+addPreset)
    * [.applyPreset(name)](#ZAmp.Components.Equalizer.Equalizer+applyPreset)

<a name="new_ZAmp.Components.Equalizer.Equalizer_new"></a>

### new Equalizer(prefs, componentName)
Create a new instance of an Equalizer component.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prefs | <code>EqualizerPreferences</code> |  | The preferences that determine how this instance of an Equalizer will configure itself. Defaults to a new instance of the preferences. |
| componentName | <code>String</code> | <code>Equalizer</code> | Optional. The name of the component. Defaults to "Equalizer". |

<a name="ZAmp.Components.Equalizer.Equalizer+preferences"></a>

### equalizer.preferences : <code>EqualizerPreferences</code>
The preferences that determine how this equalizer will behave.

**Kind**: instance property of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Access**: public  
<a name="ZAmp.Components.Equalizer.Equalizer+loadState"></a>

### equalizer.loadState()
Initialise the set of bands and related frequencies for the equalizer. The outcomeof this function (when successful) is that the Audio Source is connected to theAudioContext's destination through a chain of band filters that represent the mid-points of each frequency band.

**Kind**: instance method of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Emits**: <code>event:frequencyChanged</code>, <code>event:audioPipelineSegmentCreated</code>  
**Access**: protected  
<a name="ZAmp.Components.Equalizer.Equalizer+initialiseElements"></a>

### equalizer.initialiseElements()
Initialise the elements that will allow the user to control this Equalizer.

**Kind**: instance method of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Access**: protected  
<a name="ZAmp.Components.Equalizer.Equalizer+removePreset"></a>

### equalizer.removePreset(name)
Remove a preset from the equalizer based on its unique name.

**Kind**: instance method of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="ZAmp.Components.Equalizer.Equalizer+addPreset"></a>

### equalizer.addPreset(preset)
Add a preset to this equalizer.

**Kind**: instance method of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| preset | <code>EqualizerPreset</code> | The preset to add. |

<a name="ZAmp.Components.Equalizer.Equalizer+applyPreset"></a>

### equalizer.applyPreset(name)
Apply a predefined preset to this equalizer.

**Kind**: instance method of [<code>Equalizer</code>](#ZAmp.Components.Equalizer.Equalizer)  
**Emits**: <code>event:presetApplied</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the preset to apply. |

