<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences"></a>

## PlaylistManager.PlaylistPreferences
The set of preferences that dictate how a playlist configures itself and behaves.

**Kind**: static class of [<code>PlaylistManager</code>](#ZAmp.Components.PlaylistManager)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.PlaylistPreferences](#ZAmp.Components.PlaylistManager.PlaylistPreferences)
    * [.tracks](#ZAmp.Components.PlaylistManager.PlaylistPreferences+tracks) : <code>Array.&lt;AudioTrack&gt;</code>
    * [.loop](#ZAmp.Components.PlaylistManager.PlaylistPreferences+loop) : <code>Boolean</code>
    * [.shuffle](#ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffle) : <code>Boolean</code>
    * [.mediaKeys](#ZAmp.Components.PlaylistManager.PlaylistPreferences+mediaKeys) : <code>Boolean</code>
    * [.nextTrackElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+nextTrackElement) : <code>HTMLElement</code>
    * [.previousTrackElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+previousTrackElement) : <code>HTMLElement</code>
    * [.shuffleElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleElement) : <code>HTMLElement</code>
    * [.shuffleTrueClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleTrueClass) : <code>String</code>
    * [.shuffleFalseClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleFalseClass) : <code>String</code>
    * [.loopElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+loopElement) : <code>HTMLElement</code>
    * [.loopTrueClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+loopTrueClass) : <code>String</code>
    * [.loopFalseClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+loopFalseClass) : <code>String</code>
    * [.trackNumberLabelElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+trackNumberLabelElement) : <code>HTMLElement</code>
    * [.trackNameLabelElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+trackNameLabelElement) : <code>HTMLElement</code>
    * [.artistNameLabelElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+artistNameLabelElement) : <code>HTMLElement</code>
    * [.trackUrlLabelElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+trackUrlLabelElement) : <code>HTMLElement</code>
    * [.pausedInformationElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+pausedInformationElement) : <code>HTMLElement</code>
    * [.playingInformationElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+playingInformationElement) : <code>HTMLElement</code>
    * [.informationApplicableClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+informationApplicableClass) : <code>String</code>
    * [.informationNotApplicableClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+informationNotApplicableClass) : <code>String</code>
    * [.playlistItemContainerTemplate](#ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerTemplate) : <code>HTMLElement</code>
    * [.playlistItemListElement](#ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemListElement) : <code>HTMLElement</code>
    * [.playlistItemContainerElements](#ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerElements) : <code>Array.&lt;HTMLElement&gt;</code>
    * [.playlistItemContainerPlayingClass](#ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerPlayingClass) : <code>String</code>

<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+tracks"></a>

### playlistPreferences.tracks : <code>Array.&lt;AudioTrack&gt;</code>
The array of tracks that the playlist contains.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+loop"></a>

### playlistPreferences.loop : <code>Boolean</code>
Whether to loop the playlist; that is, whether to start at track #1 again afterthe last track finishes playing. If shuffle is set to true, this value has noeffect. Defaults to true.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffle"></a>

### playlistPreferences.shuffle : <code>Boolean</code>
Whether to shuffle the playlist; that is, whether to play the next song in orderwhen one finishes or whether to play a random song. Defaults to false.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+mediaKeys"></a>

### playlistPreferences.mediaKeys : <code>Boolean</code>
Whether to bind to the user's media keys upon initialisation. Defaults to true.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+nextTrackElement"></a>

### playlistPreferences.nextTrackElement : <code>HTMLElement</code>
The HTML element that, when clicked, will cause the playlist to move to the nexttrack.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+previousTrackElement"></a>

### playlistPreferences.previousTrackElement : <code>HTMLElement</code>
The HTML element that, when clicked, will cause the playlist to move to the previoustrack.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleElement"></a>

### playlistPreferences.shuffleElement : <code>HTMLElement</code>
The HTML element that, when clicked, will toggle the playlist's shuffle function onor off.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleTrueClass"></a>

### playlistPreferences.shuffleTrueClass : <code>String</code>
The CSS class that should be applied to the shuffleElement when shuffle is activated.Defaults to "shuffle-on".

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+shuffleFalseClass"></a>

### playlistPreferences.shuffleFalseClass : <code>String</code>
The CSS class that should be applied to the shuffleElement when shuffle is deactivated.Defaults to "shuffle-off".

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+loopElement"></a>

### playlistPreferences.loopElement : <code>HTMLElement</code>
The HTML element that, when clicked, will toggle the playlist's loop function on or off.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+loopTrueClass"></a>

### playlistPreferences.loopTrueClass : <code>String</code>
The CSS class to apply to the loopElement when the loop function is activated. Defaults to"loop-on".

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+loopFalseClass"></a>

### playlistPreferences.loopFalseClass : <code>String</code>
The CSS class to apply to the loopElement when the loop function is deactivated. Defaults to"loop-off".

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+trackNumberLabelElement"></a>

### playlistPreferences.trackNumberLabelElement : <code>HTMLElement</code>
The HTML element that will display the current track number to the user.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+trackNameLabelElement"></a>

### playlistPreferences.trackNameLabelElement : <code>HTMLElement</code>
The HTML element that will display the current track name to the user.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+artistNameLabelElement"></a>

### playlistPreferences.artistNameLabelElement : <code>HTMLElement</code>
The HTML element that will display the current artist name to the user.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+trackUrlLabelElement"></a>

### playlistPreferences.trackUrlLabelElement : <code>HTMLElement</code>
The HTML element that will display the current track URL to the user.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+pausedInformationElement"></a>

### playlistPreferences.pausedInformationElement : <code>HTMLElement</code>
The HTML element that will display to the user that media is not playing.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+playingInformationElement"></a>

### playlistPreferences.playingInformationElement : <code>HTMLElement</code>
The HTML element that will display to the user that media is playing.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+informationApplicableClass"></a>

### playlistPreferences.informationApplicableClass : <code>String</code>
The CSS class that will be applied to the information elements when that particularelement's information is applicable.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+informationNotApplicableClass"></a>

### playlistPreferences.informationNotApplicableClass : <code>String</code>
The CSS class that will be applied to the information elements when that particularelement's information is not applicable.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerTemplate"></a>

### playlistPreferences.playlistItemContainerTemplate : <code>HTMLElement</code>
The HTML element that dictates the template that the playlist manager should usewhen adding tracks.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemListElement"></a>

### playlistPreferences.playlistItemListElement : <code>HTMLElement</code>
The HTML element that holds the playlist items.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerElements"></a>

### playlistPreferences.playlistItemContainerElements : <code>Array.&lt;HTMLElement&gt;</code>
The HTML elements that contain a single playlist item.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
<a name="ZAmp.Components.PlaylistManager.PlaylistPreferences+playlistItemContainerPlayingClass"></a>

### playlistPreferences.playlistItemContainerPlayingClass : <code>String</code>
The CSS class to apply to a playlist item that is currently playing.

**Kind**: instance property of [<code>PlaylistPreferences</code>](#ZAmp.Components.PlaylistManager.PlaylistPreferences)  
