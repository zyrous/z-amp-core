<a name="ZAmp.Components.Equalizer.EqualizerPreset"></a>

## Equalizer.EqualizerPreset
Represents a preset of bands and frequencies for an equalizer.

**Kind**: static class of [<code>Equalizer</code>](#ZAmp.Components.Equalizer)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.EqualizerPreset](#ZAmp.Components.Equalizer.EqualizerPreset)
    * [new EqualizerPreset(object)](#new_ZAmp.Components.Equalizer.EqualizerPreset_new)
    * [.name](#ZAmp.Components.Equalizer.EqualizerPreset+name) : <code>String</code>
    * [.bands](#ZAmp.Components.Equalizer.EqualizerPreset+bands) : <code>Map</code>
    * [.addBand](#ZAmp.Components.Equalizer.EqualizerPreset+addBand) ⇒ <code>EqualizerPreset</code>

<a name="new_ZAmp.Components.Equalizer.EqualizerPreset_new"></a>

### new EqualizerPreset(object)
Create a new preset for an equalizer.


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to cast to a preset. |

<a name="ZAmp.Components.Equalizer.EqualizerPreset+name"></a>

### equalizerPreset.name : <code>String</code>
The name of the preset.

**Kind**: instance property of [<code>EqualizerPreset</code>](#ZAmp.Components.Equalizer.EqualizerPreset)  
<a name="ZAmp.Components.Equalizer.EqualizerPreset+bands"></a>

### equalizerPreset.bands : <code>Map</code>
The set of frequencies and gain levels that make up the preset.

**Kind**: instance property of [<code>EqualizerPreset</code>](#ZAmp.Components.Equalizer.EqualizerPreset)  
<a name="ZAmp.Components.Equalizer.EqualizerPreset+addBand"></a>

### equalizerPreset.addBand ⇒ <code>EqualizerPreset</code>
Add a frequency band to this preset.

**Kind**: instance property of [<code>EqualizerPreset</code>](#ZAmp.Components.Equalizer.EqualizerPreset)  

| Param | Type | Description |
| --- | --- | --- |
| frequency | <code>Number</code> | The frequency to adjust. |
| gain | <code>Number</code> | The gain level (positive or negative) to apply to the frequency. |

