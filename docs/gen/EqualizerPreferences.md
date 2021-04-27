<a name="ZAmp.Components.Equalizer.EqualizerPreferences"></a>

## Equalizer.EqualizerPreferences
Preferences that dictate how an Equalizer component will behave.

**Kind**: static class of [<code>Equalizer</code>](#ZAmp.Components.Equalizer)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.EqualizerPreferences](#ZAmp.Components.Equalizer.EqualizerPreferences)
    * [new EqualizerPreferences(preferences)](#new_ZAmp.Components.Equalizer.EqualizerPreferences_new)
    * [.presets](#ZAmp.Components.Equalizer.EqualizerPreferences+presets) : <code>Array.&lt;EqualizerPreset&gt;</code>
    * [.presetElements](#ZAmp.Components.Equalizer.EqualizerPreferences+presetElements) : <code>Array.&lt;HTMLElement&gt;</code>
    * [.presetSelectedClass](#ZAmp.Components.Equalizer.EqualizerPreferences+presetSelectedClass) : <code>String</code>
    * [.presetUnselectedClass](#ZAmp.Components.Equalizer.EqualizerPreferences+presetUnselectedClass) : <code>String</code>
    * [.filterPreferences](#ZAmp.Components.Equalizer.EqualizerPreferences+filterPreferences) : <code>FilterPreferences</code>

<a name="new_ZAmp.Components.Equalizer.EqualizerPreferences_new"></a>

### new EqualizerPreferences(preferences)
Construct a new set of preferences for an Equalizer component.


| Param | Type | Description |
| --- | --- | --- |
| preferences | <code>FilterPreferences</code> | The set of preferences that dictate how audio filters will be created and applied by this Equalizer. |

<a name="ZAmp.Components.Equalizer.EqualizerPreferences+presets"></a>

### equalizerPreferences.presets : <code>Array.&lt;EqualizerPreset&gt;</code>
The set of presets that will be allowed to be auto-set on the equalizer.

**Kind**: instance property of [<code>EqualizerPreferences</code>](#ZAmp.Components.Equalizer.EqualizerPreferences)  
<a name="ZAmp.Components.Equalizer.EqualizerPreferences+presetElements"></a>

### equalizerPreferences.presetElements : <code>Array.&lt;HTMLElement&gt;</code>
The set of HTML elements that allow users to choose between presets.

**Kind**: instance property of [<code>EqualizerPreferences</code>](#ZAmp.Components.Equalizer.EqualizerPreferences)  
<a name="ZAmp.Components.Equalizer.EqualizerPreferences+presetSelectedClass"></a>

### equalizerPreferences.presetSelectedClass : <code>String</code>
The CSS class to apply to preset buttons when their corresponding presetis active.

**Kind**: instance property of [<code>EqualizerPreferences</code>](#ZAmp.Components.Equalizer.EqualizerPreferences)  
<a name="ZAmp.Components.Equalizer.EqualizerPreferences+presetUnselectedClass"></a>

### equalizerPreferences.presetUnselectedClass : <code>String</code>
The CSS class to apply to preset buttons when their corresponding presetis inactive.

**Kind**: instance property of [<code>EqualizerPreferences</code>](#ZAmp.Components.Equalizer.EqualizerPreferences)  
<a name="ZAmp.Components.Equalizer.EqualizerPreferences+filterPreferences"></a>

### equalizerPreferences.filterPreferences : <code>FilterPreferences</code>
The preferences that dictate how filters will be applied by thisEqualizer.

**Kind**: instance property of [<code>EqualizerPreferences</code>](#ZAmp.Components.Equalizer.EqualizerPreferences)  
