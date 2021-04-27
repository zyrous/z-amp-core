<a name="ZAmp.Components.AudioPlayer.AudioPlayer"></a>

## AudioPlayer.AudioPlayer ⇐ <code>AudioComponent</code>
A component that allows for playback of audio by the user. The following functions are provided for: - Play/Pause - Volume Up/Down/Select - Seek Forward/Back/SelectThese functions are bound to both HTML elements with the correct attributes and, where applicable,the media keys of the host OS.

**Kind**: static class of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioPlayer](#ZAmp.Components.AudioPlayer.AudioPlayer) ⇐ <code>AudioComponent</code>
    * [new AudioPlayer(prefs, componentName)](#new_ZAmp.Components.AudioPlayer.AudioPlayer_new)
    * [.track](#ZAmp.Components.AudioPlayer.AudioPlayer+track) : <code>AudioTrack</code>
    * [.volume](#ZAmp.Components.AudioPlayer.AudioPlayer+volume) : <code>Number</code>
    * [.volume](#ZAmp.Components.AudioPlayer.AudioPlayer+volume)
    * [.isMuted](#ZAmp.Components.AudioPlayer.AudioPlayer+isMuted) : <code>Boolean</code>
    * [.position](#ZAmp.Components.AudioPlayer.AudioPlayer+position) : <code>Number</code>
    * [.preferences](#ZAmp.Components.AudioPlayer.AudioPlayer+preferences) ⇒ <code>PlayerPreferences</code>
    * [.isPaused](#ZAmp.Components.AudioPlayer.AudioPlayer+isPaused) : <code>Boolean</code>
    * [.loadState()](#ZAmp.Components.AudioPlayer.AudioPlayer+loadState)
    * [.initialiseKeys()](#ZAmp.Components.AudioPlayer.AudioPlayer+initialiseKeys)
    * [.initialiseElements()](#ZAmp.Components.AudioPlayer.AudioPlayer+initialiseElements)
    * [.play(track)](#ZAmp.Components.AudioPlayer.AudioPlayer+play)
    * [.pause()](#ZAmp.Components.AudioPlayer.AudioPlayer+pause)

<a name="new_ZAmp.Components.AudioPlayer.AudioPlayer_new"></a>

### new AudioPlayer(prefs, componentName)
Construct a new component for playing audio tracks.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prefs | <code>PlayerPreferences</code> |  | The settings that will control how the audio player is configured and behaves. |
| componentName | <code>String</code> | <code>AudioPlayer</code> | The name of this component. Defaults to "AudioPlayer". |

<a name="ZAmp.Components.AudioPlayer.AudioPlayer+track"></a>

### audioPlayer.track : <code>AudioTrack</code>
Gets the currently playing track.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+volume"></a>

### audioPlayer.volume : <code>Number</code>
Gets the current volume level that the player is set to (out of 100).

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+volume"></a>

### audioPlayer.volume
Sets the volume level. Value should be between 0 and 100.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>Number</code> | The volume level to set. |

<a name="ZAmp.Components.AudioPlayer.AudioPlayer+isMuted"></a>

### audioPlayer.isMuted : <code>Boolean</code>
Gets whether the player is currently muted.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+position"></a>

### audioPlayer.position : <code>Number</code>
Gets the current position (as a percentage, not seconds) of the current track.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+preferences"></a>

### audioPlayer.preferences ⇒ <code>PlayerPreferences</code>
Get the preferences that control this player.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Returns**: <code>PlayerPreferences</code> - The current set of preferences for the player.  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+isPaused"></a>

### audioPlayer.isPaused : <code>Boolean</code>
Gets whether the player is currently paused.

**Kind**: instance property of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+loadState"></a>

### audioPlayer.loadState()
Retrieve any existing (saved) state for the audio player from our storage mechanism.

**Kind**: instance method of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: protected  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+initialiseKeys"></a>

### audioPlayer.initialiseKeys()
Initialise the keys that the player will respond to.

**Kind**: instance method of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: protected  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+initialiseElements"></a>

### audioPlayer.initialiseElements()
Initialise the HTML elements that the player will bind to.

**Kind**: instance method of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: protected  
<a name="ZAmp.Components.AudioPlayer.AudioPlayer+play"></a>

### audioPlayer.play(track)
Initiate the playing of a specific track. This function uses the provided URL to streamaudio, replacing the current track if necessary.

**Kind**: instance method of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>AudioTrack</code> | The track to play (optional). Defaults to the current track. |

<a name="ZAmp.Components.AudioPlayer.AudioPlayer+pause"></a>

### audioPlayer.pause()
Pause whichever track is playing right now.

**Kind**: instance method of [<code>AudioPlayer</code>](#ZAmp.Components.AudioPlayer.AudioPlayer)  
**Access**: public  
