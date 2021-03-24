/**
 * Preferences that dictate how an Equalizer will initialise and control its frequencies.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.Equalizer
 */
class FilterPreferences {

    /**
     * The set of HTML range elements that will be used for adjusting frequencies. If not
     * set by the user, this will be dynamically allocated at initialisation time based on
     * the "audio-button-eq-range" attribute.
     * @type {HTMLElement[]}
     */
    frequencyRangeElements;

    /**
     * The set of HTML label elements that will be used for showing the frequencies of
     * each band. If not set by the user, this will be dynamically allocated at initialisation
     * time based on the "audio-label-eq-frequency" attribute.
     * @type {HTMLElement[]}
     */
    frequencyLabelElements;

    /**
     * The minimum amount of gain to allow the user to apply to each frequency, in decibels.
     * Defaults to -25.0dB.
     * @type {Number}
     */
    minFrequencyGain = -25.0;

    /**
     * The maximum amount of gain to allow the user to apply to each frequency, in decibels.
     * Defaults to 25dB.
     * @type {Number}
     */
    maxFrequencyGain = 25.0;

    /**
     * The amount between each change of gain to allow the use to make, in decbels. Defaults 
     * to 0.01dB.
     * @type {Number}
     */
    frequencyGainStepSize = 0.01;

    /**
     * The default amount of gain to apply to each frequency, in decibels. Defaults to 0.0dB.
     * @type {Number}
     */
    defaultFrequencyGain = 0.0;
}

module.exports = {FilterPreferences};