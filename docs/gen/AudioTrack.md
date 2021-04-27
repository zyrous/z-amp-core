<a name="ZAmp.Domain.AudioTrack"></a>

## Domain.AudioTrack
Represents an audio track that a player can play.

**Kind**: static class of [<code>Domain</code>](#ZAmp.Domain)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioTrack](#ZAmp.Domain.AudioTrack)
    * [new AudioTrack(object)](#new_ZAmp.Domain.AudioTrack_new)
    * [.url](#ZAmp.Domain.AudioTrack+url) : <code>String</code>
    * [.title](#ZAmp.Domain.AudioTrack+title) : <code>String</code>
    * [.artist](#ZAmp.Domain.AudioTrack+artist) : <code>String</code>
    * [.hash](#ZAmp.Domain.AudioTrack+hash) : <code>String</code>
    * [.equals(track)](#ZAmp.Domain.AudioTrack+equals)

<a name="new_ZAmp.Domain.AudioTrack_new"></a>

### new AudioTrack(object)
Create a new audio track for a player to play.


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to assign to an AudioTrack object. |

<a name="ZAmp.Domain.AudioTrack+url"></a>

### audioTrack.url : <code>String</code>
The URL that the track will be streamed from.

**Kind**: instance property of [<code>AudioTrack</code>](#ZAmp.Domain.AudioTrack)  
<a name="ZAmp.Domain.AudioTrack+title"></a>

### audioTrack.title : <code>String</code>
The title of the track.

**Kind**: instance property of [<code>AudioTrack</code>](#ZAmp.Domain.AudioTrack)  
<a name="ZAmp.Domain.AudioTrack+artist"></a>

### audioTrack.artist : <code>String</code>
The creator of the track.

**Kind**: instance property of [<code>AudioTrack</code>](#ZAmp.Domain.AudioTrack)  
<a name="ZAmp.Domain.AudioTrack+hash"></a>

### audioTrack.hash : <code>String</code>
The hash of this track.

**Kind**: instance property of [<code>AudioTrack</code>](#ZAmp.Domain.AudioTrack)  
<a name="ZAmp.Domain.AudioTrack+equals"></a>

### audioTrack.equals(track)
Returns true if the provided track is considered equal to this one.

**Kind**: instance method of [<code>AudioTrack</code>](#ZAmp.Domain.AudioTrack)  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>AudioTrack</code> | The track to compare this one to. |

