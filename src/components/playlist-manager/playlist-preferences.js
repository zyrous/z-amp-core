/**
 * The set of preferences that dictate how a playlist configures itself and behaves.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.PlaylistManager
 */
class PlaylistPreferences {

    /**
     * The array of tracks that the playlist contains.
     * @type {AudioTrack[]}
     */
    tracks= [];

    /**
     * Whether to loop the playlist; that is, whether to start at track #1 again after
     * the last track finishes playing. If shuffle is set to true, this value has no
     * effect. Defaults to true.
     * @type {Boolean}
     */
    loop = true;

    /**
     * Whether to shuffle the playlist; that is, whether to play the next song in order
     * when one finishes or whether to play a random song. Defaults to false.
     * @type {Boolean}
     */
    shuffle = false;

    /**
     * Whether to bind to the user's media keys upon initialisation. Defaults to true.
     * @type {Boolean}
     */
    mediaKeys = true;

    /**
     * The HTML element that, when clicked, will cause the playlist to move to the next
     * track.
     * @type {HTMLElement}
     */
    nextTrackElement;

    /**
     * The HTML element that, when clicked, will cause the playlist to move to the previous
     * track.
     * @type {HTMLElement}
     */
    previousTrackElement;

    /**
     * The HTML element that, when clicked, will toggle the playlist's shuffle function on
     * or off.
     * @type {HTMLElement}
     */
    shuffleElement;

    /**
     * The CSS class that should be applied to the shuffleElement when shuffle is activated.
     * Defaults to "shuffle-on".
     * @type {String}
     */
    shuffleTrueClass = "shuffle-on";

    /**
     * The CSS class that should be applied to the shuffleElement when shuffle is deactivated.
     * Defaults to "shuffle-off".
     * @type {String}
     */
    shuffleFalseClass = "shuffle-off";

    /**
     * The HTML element that, when clicked, will toggle the playlist's loop function on or off.
     * @type {HTMLElement} 
     */
    loopElement;

    /**
     * The CSS class to apply to the loopElement when the loop function is activated. Defaults to
     * "loop-on".
     * @type {String}
     */
    loopTrueClass = "loop-on";

    /**
     * The CSS class to apply to the loopElement when the loop function is deactivated. Defaults to
     * "loop-off".
     * @type {String}
     */
    loopFalseClass = "loop-off";

    /**
     * The HTML element that will display the current track number to the user.
     * @type {HTMLElement}
     */
    trackNumberLabelElement;

    /**
     * The HTML element that will display the current track name to the user.
     * @type {HTMLElement}
     */
    trackNameLabelElement;

    /**
     * The HTML element that will display the current artist name to the user.
     * @type {HTMLElement}
     */
    artistNameLabelElement;

    /**
     * The HTML element that will display the current track URL to the user.
     * @type {HTMLElement}
     */
    trackUrlLabelElement;

    /**
     * The HTML element that will display to the user that media is not playing.
     * @type {HTMLElement}
     */
    pausedInformationElement;

    /**
     * The HTML element that will display to the user that media is playing.
     * @type {HTMLElement}
     */
    playingInformationElement;

    /**
     * The CSS class that will be applied to the information elements when that particular
     * element's information is applicable.
     * @type {String}
     */
    informationApplicableClass = "applicable";

    /**
     * The CSS class that will be applied to the information elements when that particular
     * element's information is not applicable.
     * @type {String}
     */
    informationNotApplicableClass = "not-applicable";

    /**
     * The HTML element that dictates the template that the playlist manager should use
     * when adding tracks.
     * @type {HTMLElement}
     */
    playlistItemContainerTemplate;

    /**
     * The HTML element that holds the playlist items.
     * @type {HTMLElement}
     */
    playlistItemListElement;

    /**
     * The HTML elements that contain a single playlist item.
     * @type {HTMLElement[]}
     */
    playlistItemContainerElements = [];

    /**
     * The CSS class to apply to a playlist item that is currently playing.
     * @type {String}
     */
    playlistItemContainerPlayingClass = "playing";
}

module.exports = { PlaylistPreferences };