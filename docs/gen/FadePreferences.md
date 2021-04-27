<a name="ZAmp.Components.AudioPlayer.FadePreferences"></a>

## AudioPlayer.FadePreferences
The set of preferences that dictate how the audio player will behave when fading in/out.

**Kind**: static class of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.FadePreferences](#ZAmp.Components.AudioPlayer.FadePreferences)
    * [.fade](#ZAmp.Components.AudioPlayer.FadePreferences+fade) : <code>Boolean</code>
    * [.duration](#ZAmp.Components.AudioPlayer.FadePreferences+duration) : <code>Number</code>
    * [.stepCount](#ZAmp.Components.AudioPlayer.FadePreferences+stepCount) : <code>Number</code>

<a name="ZAmp.Components.AudioPlayer.FadePreferences+fade"></a>

### fadePreferences.fade : <code>Boolean</code>
Whether or not to fade volume. If false, audio will be immediately started at the currentvolume. Defaults to true.

**Kind**: instance property of [<code>FadePreferences</code>](#ZAmp.Components.AudioPlayer.FadePreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.FadePreferences+duration"></a>

### fadePreferences.duration : <code>Number</code>
The duration, in milliseconds, to fade across. Defaults to 300.

**Kind**: instance property of [<code>FadePreferences</code>](#ZAmp.Components.AudioPlayer.FadePreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.FadePreferences+stepCount"></a>

### fadePreferences.stepCount : <code>Number</code>
The number of steps to use to move between volume levels. Defaults to 10.

**Kind**: instance property of [<code>FadePreferences</code>](#ZAmp.Components.AudioPlayer.FadePreferences)  
**Access**: public  
