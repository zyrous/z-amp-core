/**
 * Represents a preset of bands and frequencies for an equalizer.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.Equalizer
 */ 
class EqualizerPreset {

    /**
     * The name of the preset.
     * @type {String}
     */
    name;

    /**
     * The set of frequencies and gain levels that make up the preset.
     * @type {Map}
     */
    bands;

    /**
     * Create a new preset for an equalizer.
     * @param {Object} object The object to cast to a preset.
     */
    constructor(object) {
        object && Object.assign(this, object);
    }

    /**
     * Add a frequency band to this preset.
     * @param {Number} frequency The frequency to adjust.
     * @param {Number} gain The gain level (positive or negative) to apply to the frequency.
     * @returns {EqualizerPreset}
     */
    addBand = (frequency, gain) => {
        this.bands.set(frequency, gain);
        return this;
    }
}

module.exports = { EqualizerPreset };