/**
 * The set of preferences that dictate how the audio player will behave when seeking through a track.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioPlayer
 */
class SeekPreferences {

    /**
     * The number of seconds to seek forward in a track when a user wishes to do so. Defaults to 20.
     * @public
     * @type {Number}
     */
    seekForwardTime = 20;

    /**
     * The number of seconds to seek backward in a track when a user wishes to do so. Defaults to 10.
     * @public
     * @type {Number}
     */
    seekBackwardTime = 10;
}

module.exports = { SeekPreferences };