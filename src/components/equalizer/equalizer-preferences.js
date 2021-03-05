const {FilterPreferences} = require("./filter-preferences");
const {EqualizerPreset} = require("./equalizer-preset");

/**
 * Preferences that dictate how an Equalizer component will behave.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.Equalizer
 */
class EqualizerPreferences {

    /**
     * The set of presets that will be allowed to be auto-set on the equalizer.
     * @type {EqualizerPreset[]}
     */
    presets = [];

    /**
     * The set of HTML elements that allow users to choose between presets.
     * @type {HTMLElement[]}
     */
    presetElements;

    /**
     * The CSS class to apply to preset buttons when their corresponding preset
     * is active.
     * @type {String}
     */
    presetSelectedClass = "preset-selected";

    /**
     * The CSS class to apply to preset buttons when their corresponding preset
     * is inactive.
     * @type {String}
     */
    presetUnselectedClass = "preset-unselected";

    /**
     * The preferences that dictate how filters will be applied by this
     * Equalizer.
     * @type {FilterPreferences}
     */
    filterPreferences;

    /**
     * Construct a new set of preferences for an Equalizer component.
     * @param {FilterPreferences} preferences The set of preferences that dictate
     * how audio filters will be created and applied by this Equalizer.
     */
    constructor(preferences = new FilterPreferences()) {
        this.filterPreferences = preferences;
    }
};

module.exports = { EqualizerPreferences };