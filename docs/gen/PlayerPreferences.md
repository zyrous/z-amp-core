<a name="ZAmp.Components.AudioPlayer.PlayerPreferences"></a>

## AudioPlayer.PlayerPreferences
Defines the set of preferences that dictate how the audio player will behave. Thesesettings generally have defaults but can be overridden by the user if necessary.

**Kind**: static class of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.PlayerPreferences](#ZAmp.Components.AudioPlayer.PlayerPreferences)
    * [.autoPlay](#ZAmp.Components.AudioPlayer.PlayerPreferences+autoPlay) : <code>Boolean</code>
    * [.pauseOnHide](#ZAmp.Components.AudioPlayer.PlayerPreferences+pauseOnHide) : <code>Boolean</code>
    * [.defaultVolume](#ZAmp.Components.AudioPlayer.PlayerPreferences+defaultVolume) : <code>Number</code>
    * [.mediaKeys](#ZAmp.Components.AudioPlayer.PlayerPreferences+mediaKeys) : <code>Boolean</code>
    * [.audioElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+audioElement) : <code>HTMLAudioElement</code>
    * [.playElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+playElement) : <code>HTMLElement</code>
    * [.pauseElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+pauseElement) : <code>HTMLElement</code>
    * [.playPauseElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+playPauseElement) : <code>HTMLElement</code>
    * [.playingClass](#ZAmp.Components.AudioPlayer.PlayerPreferences+playingClass) : <code>String</code>
    * [.pausedClass](#ZAmp.Components.AudioPlayer.PlayerPreferences+pausedClass) : <code>String</code>
    * [.positionRangeElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+positionRangeElement) : <code>HTMLInputElement</code>
    * [.seekForwardElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+seekForwardElement) : <code>HTMLElement</code>
    * [.seekBackwardElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+seekBackwardElement) : <code>HTMLElement</code>
    * [.muteElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+muteElement) : <code>HTMLElement</code>
    * [.mutedClass](#ZAmp.Components.AudioPlayer.PlayerPreferences+mutedClass) : <code>String</code>
    * [.unmutedClass](#ZAmp.Components.AudioPlayer.PlayerPreferences+unmutedClass) : <code>String</code>
    * [.volumeUpElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+volumeUpElement) : <code>HTMLElement</code>
    * [.volumeDownElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+volumeDownElement) : <code>HTMLElement</code>
    * [.volumeRangeElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+volumeRangeElement) : <code>HTMLInputElement</code>
    * [.trackPositionLabelElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+trackPositionLabelElement) : <code>HTMLElement</code>
    * [.trackDurationLabelElement](#ZAmp.Components.AudioPlayer.PlayerPreferences+trackDurationLabelElement) : <code>HTMLElement</code>
    * [.fadePreferences](#ZAmp.Components.AudioPlayer.PlayerPreferences+fadePreferences) : <code>FadePreferences</code>
    * [.seekPreferences](#ZAmp.Components.AudioPlayer.PlayerPreferences+seekPreferences) : <code>SeekPreferences</code>

<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+autoPlay"></a>

### playerPreferences.autoPlay : <code>Boolean</code>
Whether or not the player should attempt to auto-play. Note: Because of rulesaround autoplay for audio in different browsers, setting this to true does notguarantee that audio will automatically play. If audio is not able to be playedautomatically, it will be played as soon as the user activates the page. Defaultsto false.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+pauseOnHide"></a>

### playerPreferences.pauseOnHide : <code>Boolean</code>
Whether or not the audio should be automatically paused when the tab that the playeris on becomes hidden. If this is true, the audio will be automatically resumed whenthe player becomes visible again. NOTE: The rules for what constitutes a "hidden" tabare browser-dependent. Defaults to true.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+defaultVolume"></a>

### playerPreferences.defaultVolume : <code>Number</code>
The default volume to set the player to. This should be a value between zero (no volume)and 100 (full volume). If the volume has previously been set by the user, this value willhave no effect. Defaults to 70.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+mediaKeys"></a>

### playerPreferences.mediaKeys : <code>Boolean</code>
Whether to connect the audio player to the user's media keys, if available. Defaults totrue.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+audioElement"></a>

### playerPreferences.audioElement : <code>HTMLAudioElement</code>
The HTML audio element that the player will manipulate. If not set, the player willautomatically create a new one upon initialisation and append it to the HTML body.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+playElement"></a>

### playerPreferences.playElement : <code>HTMLElement</code>
The HTML element that will cause audio to start playing when clicked.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+pauseElement"></a>

### playerPreferences.pauseElement : <code>HTMLElement</code>
The HTML element that will cause audio to pause when clicked.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+playPauseElement"></a>

### playerPreferences.playPauseElement : <code>HTMLElement</code>
The HTML element that will toggle audio between playing and paused.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+playingClass"></a>

### playerPreferences.playingClass : <code>String</code>
The CSS class to apply to the playPauseElement when audio is playing. Defaults to "playing".

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+pausedClass"></a>

### playerPreferences.pausedClass : <code>String</code>
The CSS class to apply to the playPauseElement when audio is paused. Defaults to "paused".

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+positionRangeElement"></a>

### playerPreferences.positionRangeElement : <code>HTMLInputElement</code>
The HTML element that will show and allow the user to change the position of the playerin the current track. Must be an HTML range element.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+seekForwardElement"></a>

### playerPreferences.seekForwardElement : <code>HTMLElement</code>
The HTML element that will cause the audio player to seek forward in the current track.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+seekBackwardElement"></a>

### playerPreferences.seekBackwardElement : <code>HTMLElement</code>
The HTML element that will cause the audio player to seek backward in the current track.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+muteElement"></a>

### playerPreferences.muteElement : <code>HTMLElement</code>
The HTML element that will cause the audio to become muted.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+mutedClass"></a>

### playerPreferences.mutedClass : <code>String</code>
The CSS class to apply to the muteElement when audio is muted. Defaults to "muted".

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+unmutedClass"></a>

### playerPreferences.unmutedClass : <code>String</code>
The CSS class to apply to the muteElement when audio is not muted. Defaults to "un-muted".

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+volumeUpElement"></a>

### playerPreferences.volumeUpElement : <code>HTMLElement</code>
The HTML element that will cause the volume to be increased.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+volumeDownElement"></a>

### playerPreferences.volumeDownElement : <code>HTMLElement</code>
The HTML element that will cause the volume to be decreased.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+volumeRangeElement"></a>

### playerPreferences.volumeRangeElement : <code>HTMLInputElement</code>
The HTML element that will display and allow the user to change the volume. Must be anHTML range element.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+trackPositionLabelElement"></a>

### playerPreferences.trackPositionLabelElement : <code>HTMLElement</code>
The HTML element that will display a human-readable form of the current position of playbackin the current track.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+trackDurationLabelElement"></a>

### playerPreferences.trackDurationLabelElement : <code>HTMLElement</code>
The HTML element that will display a human-readable form of the duration of the current track.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+fadePreferences"></a>

### playerPreferences.fadePreferences : <code>FadePreferences</code>
The preferences that will be applied to fading in/out.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.PlayerPreferences+seekPreferences"></a>

### playerPreferences.seekPreferences : <code>SeekPreferences</code>
The preferences that will be applied to seeking forward/backward.

**Kind**: instance property of [<code>PlayerPreferences</code>](#ZAmp.Components.AudioPlayer.PlayerPreferences)  
**Access**: public  
