/**
 * Describes settings for a HTML visualiser that control how it configures itself and how
 * it behaves.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioHtmlVisualiser
 */
class AudioHtmlVisualiserPreferences {

    /**
     * The targeted length of a single frame of animation for the visualiser. Defaults to
     * 17 (60 frames per second).
     * @public
     * @type {Number}
     */
    animationFrameLength = 17;

    /**
     * The HTML attribute name to find in order to mutate elements. Change this if you
     * want a distinct set of mutated elements that aren't affected by others. Defaults 
     * to "audio-vis-eq-frequency".
     * @public
     * @type {String}
     */
    mutationHtmlAttributeName = "audio-vis-eq-frequency";

    /**
     * The set of HTML elements that will be animated according to the audio frequencies.
     * @public
     * @type {HTMLElement[]}
     */
    frequencyElements = [];
}

module.exports = { AudioHtmlVisualiserPreferences };