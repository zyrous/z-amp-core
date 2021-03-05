/**
 * The set of preferences that dictate how the audio player will behave when fading in/out.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioPlayer
 */
class FadePreferences {

    /**
     * Whether or not to fade volume. If false, audio will be immediately started at the current
     * volume. Defaults to true.
     * @public
     * @type {Boolean}
     */
    fade = true;

    /**
     * The duration, in milliseconds, to fade across. Defaults to 300.
     * @public
     * @type {Number}
     */
    duration = 300;

    /**
     * The number of steps to use to move between volume levels. Defaults to 10.
     * @public
     * @type {Number}
     */
    stepCount = 10;
};

module.exports = {FadePreferences};