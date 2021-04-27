<a name="ZAmp.Components.PlaylistManager.PlaylistManager"></a>

## PlaylistManager.PlaylistManager ⇐ <code>AudioComponent</code>
Provides an audio component that manages a list of tracks that a user can choose from.Supports playing components by providing tracks to play when none are available or whenone completes.

**Kind**: static class of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.PlaylistManager](#ZAmp.Components.PlaylistManager.PlaylistManager) ⇐ <code>AudioComponent</code>
    * [new PlaylistManager(preferences, componentName)](#new_ZAmp.Components.PlaylistManager.PlaylistManager_new)
    * [.preferences](#ZAmp.Components.PlaylistManager.PlaylistManager+preferences) ⇒ <code>PlaylistPreferences</code>
    * [.tracks](#ZAmp.Components.PlaylistManager.PlaylistManager+tracks) ⇒ <code>Array.&lt;AudioTrack&gt;</code>
    * [.loadState()](#ZAmp.Components.PlaylistManager.PlaylistManager+loadState)
    * [.initialiseKeys()](#ZAmp.Components.PlaylistManager.PlaylistManager+initialiseKeys)
    * [.initialiseElements()](#ZAmp.Components.PlaylistManager.PlaylistManager+initialiseElements)
    * [.changeTrack(track)](#ZAmp.Components.PlaylistManager.PlaylistManager+changeTrack)
    * [.addTrack(track, force)](#ZAmp.Components.PlaylistManager.PlaylistManager+addTrack)
    * [.addTracks(tracks, force)](#ZAmp.Components.PlaylistManager.PlaylistManager+addTracks)
    * [.removeTrack(trackIndex)](#ZAmp.Components.PlaylistManager.PlaylistManager+removeTrack)
    * [.clear()](#ZAmp.Components.PlaylistManager.PlaylistManager+clear)
    * [.setShuffle(value)](#ZAmp.Components.PlaylistManager.PlaylistManager+setShuffle)
    * [.setLoop(value)](#ZAmp.Components.PlaylistManager.PlaylistManager+setLoop)

<a name="new_ZAmp.Components.PlaylistManager.PlaylistManager_new"></a>

### new PlaylistManager(preferences, componentName)
Construct a new playlist component.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| preferences | <code>PlaylistPreferences</code> |  | The preferences that will be used to initialise this playlist. |
| componentName | <code>String</code> | <code>PlaylistManager</code> | Optional. The name of the component. Defaults to "PlaylistManager". |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+preferences"></a>

### playlistManager.preferences ⇒ <code>PlaylistPreferences</code>
Gets the current set of preferences for this playlist element.

**Kind**: instance property of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+tracks"></a>

### playlistManager.tracks ⇒ <code>Array.&lt;AudioTrack&gt;</code>
Gets the set of tracks that this playlist element is tracking.

**Kind**: instance property of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+loadState"></a>

### playlistManager.loadState()
Load any previously saved state to initialise this playlist with.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: protected  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+initialiseKeys"></a>

### playlistManager.initialiseKeys()
Initialise key combinations that this playlist will respond to.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: protected  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+initialiseElements"></a>

### playlistManager.initialiseElements()
Initialise the graphical UI elements that the user will use to control the playlist.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: protected  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+changeTrack"></a>

### playlistManager.changeTrack(track)
Change the currently playing track.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>AudioTrack</code> | The track to change to. |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+addTrack"></a>

### playlistManager.addTrack(track, force)
Add a new track to the playlist.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>AudioTrack</code> | The track to add to the playlist. |
| force | <code>boolean</code> | Whether to force the addition of the track, even if it exists. Defaults to false. |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+addTracks"></a>

### playlistManager.addTracks(tracks, force)
Add an array of new tracks to the playlist. Tracks will be added in the same order that they are presentin the array.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| tracks | <code>Array.&lt;AudioTrack&gt;</code> | The array of tracks to add to the playlist. |
| force | <code>boolean</code> | Whether to force the addition of the track, even if it exists. Defaults to false. |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+removeTrack"></a>

### playlistManager.removeTrack(trackIndex)
Remove a track from the playlist.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| trackIndex | <code>Number</code> | The zero-based index of the track to remove from the playlist. |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+clear"></a>

### playlistManager.clear()
Clear this playlist.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  
<a name="ZAmp.Components.PlaylistManager.PlaylistManager+setShuffle"></a>

### playlistManager.setShuffle(value)
Change the current value for shuffle mode.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | Whether shuffle should be on or off. |

<a name="ZAmp.Components.PlaylistManager.PlaylistManager+setLoop"></a>

### playlistManager.setLoop(value)
Change the current value for loop mode.

**Kind**: instance method of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager.PlaylistManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | Whether loop should be on or off. |

