const {SeekPreferences} = require("./seek-preferences");
const {FadePreferences} = require("./fade-preferences");

/**
 * Defines the set of preferences that dictate how the audio player will behave. These
 * settings generally have defaults but can be overridden by the user if necessary.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioPlayer
 */
class PlayerPreferences {

    /**
     * Whether or not the player should attempt to auto-play. Note: Because of rules
     * around autoplay for audio in different browsers, setting this to true does not
     * guarantee that audio will automatically play. If audio is not able to be played
     * automatically, it will be played as soon as the user activates the page. Defaults
     * to false.
     * @public
     * @type {Boolean}
     */
    autoPlay = false;

    /**
     * Whether or not the audio should be automatically paused when the tab that the player
     * is on becomes hidden. If this is true, the audio will be automatically resumed when
     * the player becomes visible again. NOTE: The rules for what constitutes a "hidden" tab
     * are browser-dependent. Defaults to true.
     * @public
     * @type {Boolean}
     */
    pauseOnHide = true;

    /**
     * The default volume to set the player to. This should be a value between zero (no volume)
     * and 100 (full volume). If the volume has previously been set by the user, this value will
     * have no effect. Defaults to 70.
     * @public
     * @type {Number}
     */
    defaultVolume = 70;
    
    /**
     * Whether to connect the audio player to the user's media keys, if available. Defaults to
     * true.
     * @public
     * @type {Boolean}
     */
    mediaKeys = true;

    /**
     * The HTML audio element that the player will manipulate. If not set, the player will
     * automatically create a new one upon initialisation and append it to the HTML body.
     * @public
     * @type {HTMLAudioElement}
     */
    audioElement;

    /**
     * The HTML element that will cause audio to start playing when clicked.
     * @public
     * @type {HTMLElement}
     */
    playElement;

    /**
     * The HTML element that will cause audio to pause when clicked.
     * @public
     * @type {HTMLElement}
     */
    pauseElement;

    /**
     * The HTML element that will toggle audio between playing and paused.
     * @public
     * @type {HTMLElement}
     */
    playPauseElement;

    /**
     * The CSS class to apply to the playPauseElement when audio is playing. Defaults to "playing".
     * @public
     * @type {String}
     */
    playingClass = "playing";

    /**
     * The CSS class to apply to the playPauseElement when audio is paused. Defaults to "paused".
     * @public
     * @type {String}
     */
    pausedClass = "paused";

    /**
     * The HTML element that will show and allow the user to change the position of the player
     * in the current track. Must be an HTML range element.
     * @public
     * @type {HTMLInputElement}
     */
    positionRangeElement;

    /**
     * The HTML element that will cause the audio player to seek forward in the current track.
     * @public
     * @type {HTMLElement}
     */
    seekForwardElement;

    /**
     * The HTML element that will cause the audio player to seek backward in the current track.
     * @public
     * @type {HTMLElement}
     */
    seekBackwardElement;

    /**
     * The HTML element that will cause the audio to become muted.
     * @public
     * @type {HTMLElement}
     */
    muteElement;

    /**
     * The CSS class to apply to the muteElement when audio is muted. Defaults to "muted".
     * @public
     * @type {String}
     */
    mutedClass = "muted";

    /**
     * The CSS class to apply to the muteElement when audio is not muted. Defaults to "un-muted".
     * @public
     * @type {String}
     */
    unmutedClass = "un-muted";

    /**
     * The HTML element that will cause the volume to be increased.
     * @public
     * @type {HTMLElement}
     */
    volumeUpElement;

    /**
     * The HTML element that will cause the volume to be decreased.
     * @public
     * @type {HTMLElement}
     */
    volumeDownElement;

    /**
     * The HTML element that will display and allow the user to change the volume. Must be an
     * HTML range element.
     * @public
     * @type {HTMLInputElement}
     */
    volumeRangeElement;

    /**
     * The HTML element that will display a human-readable form of the current position of playback
     * in the current track.
     * @public
     * @type {HTMLElement}
     */
    trackPositionLabelElement;

    /**
     * The HTML element that will display a human-readable form of the duration of the current track.
     * @public
     * @type {HTMLElement}
     */
    trackDurationLabelElement;

    /**
     * The preferences that will be applied to fading in/out.
     * @public
     * @type {FadePreferences}
     */
    fadePreferences = new FadePreferences();

    /**
     * The preferences that will be applied to seeking forward/backward.
     * @public
     * @type {SeekPreferences}
     */
    seekPreferences = new SeekPreferences();
}

module.exports = { PlayerPreferences };