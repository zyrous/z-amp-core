const { EqualizerPreferences } = require("./equalizer-preferences");
const { EqualizerPreset } = require("./equalizer-preset");
const { AudioComponent } = require("../audio-component");

/**
 * @namespace ZAmp.Components.Equalizer
 */

/**
 * A component that allows for graphical EQ by the user. This is achieved through
 * an arbitrary number of range sliders with the "audio-button-eq-range" attribute.
 * The component dynamically creates N number of frequency bands (N = number of range 
 * sliders), chained together and connecting the audio source to its destination.
 * By default, each frequency band can be adjusted by +/- 40dB.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.Equalizer
 * @augments AudioComponent
 */
class Equalizer extends AudioComponent {

    /**
     * The preferences that determine how this equalizer will behave.
     * @public
     * @type {EqualizerPreferences}
     */
    preferences;

    /**
     * The AudioContext used by the system. This is not created by the Equalizer
     * component; rather it is created by a player component and recorded here for
     * later use.
     * @private
     * @type {AudioContext}
     */
    audioContext;
    
    /**
     * The Band Filters that will act upon the Audio Source.
     * @private
     * @type {Map}
     */
    bands = new Map();

    /**
     * The preset that is currently applied to the equalizer.
     * @private
     * @type {String}
     */
    activePreset = "Custom";

    /**
     * A simple boolean that indicates whether this equalizer has initialised its controls
     * and frequencies/bands.
     * @private
     * @type {Boolean}
     */
    frequenciesInitialised = false;

    /**
     * Create a new instance of an Equalizer component.
     * @param {EqualizerPreferences} prefs The preferences that determine how this instance
     * of an Equalizer will configure itself. Defaults to a new instance of the preferences.
     * @param {String} componentName Optional. The name of the component. Defaults to "Equalizer".
     */
    constructor(prefs = new EqualizerPreferences(), componentName = "Equalizer") {
        super(componentName);
        this.preferences = prefs;
        this.addEventListener("audioPipelineCreated", (context) => this.context = context);
    }

    /**
     * Initialise the set of bands and related frequencies for the equalizer. The outcome
     * of this function (when successful) is that the Audio Source is connected to the
     * AudioContext's destination through a chain of band filters that represent the mid-
     * points of each frequency band.
     * @protected
     * @fires frequencyChanged
     * @fires audioPipelineSegmentCreated
     */
    async loadState() {
        
        // Get the currently active preset (if there is one).
        this.getValue("activePreset", this.activePreset).then((results) => this.selectedPreset = results.value);

        // To run successfully, we need to ensure that:
        if(this.frequenciesInitialised // 1. We haven't already run
            || !this.audioContext // 2. We have an AudioContext to work with
            || !this.preferences.filterPreferences.frequencyRangeElements) { // 3. We have HTML elements
            return;
        }
        // NOTE: What we're trying to do here is to calculate a number of sections across a
        // frequency range, where the range itself is non-linear. We calculate the mid-point
        // of each section and make that the frequency that each slider will adjust. Each
        // section is composed of two segments (one before the mid-point and another after it).

        // Calculate the Nyquist frequency (https://en.wikipedia.org/wiki/Nyquist_frequency).
        var nyquist = this.audioContext.sampleRate * 0.5;

        // Use that to calculate the number of octaves that fit in this range.
        var numOctaves = Math.log(nyquist / 10.0) / Math.LN2;

        // Get the number of sliders to initialise (it's just the number of HTML elements we have).
        var numSliders = this.preferences.filterPreferences.frequencyRangeElements.length;

        if(numSliders === 0) {
            // No range elements; we have nothing to do.
            return;
        }

        // Calculate the segment width as a percentage (not taking into account the exponential
        // curve of the frequencies).
        var segmentWidth = 1.0/(numSliders * 2);

        // The connectSource is the object that each band will connect to. As we move down the
        // chain from source -> band -> band -> ... -> band -> destination, the connectSource
        // will represent the previous item in the chain.
        var firstConnectSource, currentConnectSource;


        // We'll count forward through each segment (2 segments = 1 section) so that we can
        // calculate the start- and end-points of each section.
        for(var i = 0; i < numSliders; i++){

            var fLabel, freqMid;

            // First, check whether a frequency has been explicitly set on the HTML control.
            if(this.preferences.filterPreferences.frequencyRangeElements[parseInt(i, 10)].getAttribute("frequency")) {

                // There's a frequency for the element already.
                freqMid = Number.parseFloat(this.preferences.filterPreferences.frequencyRangeElements[parseInt(i, 10)].getAttribute("frequency"));
            } else {

                // These values are simply a percentage of how far through the frequencies we should be.
                var percentMid = segmentWidth * (parseInt(i, 10) * 2 + 1);

                // freqMid is the actual frequency value that the slider will adjust.
                freqMid = nyquist * Math.pow(2.0, numOctaves * (percentMid - 1.0));

                // Now set the frequency back to the element.
                this.preferences.filterPreferences.frequencyRangeElements[parseInt(i, 10)].setAttribute("frequency", freqMid);
            }

            // Calculate a label for the frequency.
            if(freqMid < 1000){
                fLabel = `${freqMid.toFixed(0)}Hz`;
            } else {
                fLabel = `${(freqMid / 1000).toFixed(1)}kHz`;
            } 

            // Set the label if we have a HTML element for it.
            if(this.preferences.filterPreferences.frequencyLabelElements[parseInt(i, 10)]) {
                this.preferences.filterPreferences.frequencyLabelElements[parseInt(i, 10)].textContent = fLabel;
            }

            // Save our calculated information as attributes on the range element. This won't
            // mean anything to the browser, but we'll be able to retrieve it later.
            this.preferences.filterPreferences.frequencyRangeElements[parseInt(i, 10)].frequency = freqMid;
            this.preferences.filterPreferences.frequencyRangeElements[parseInt(i, 10)].frequencyLabel = fLabel;

            // Create a biquad filter for the frequency.
            var band = this.audioContext.createBiquadFilter();
            if(parseInt(i, 10) === 0) {
                // The first (lowest frequency) band should be lowshelf.
                band.type = "lowshelf";
            } else if(parseInt(i, 10) === numSliders - 1) {
                // The last (highest frequency) band should be highshelf.
                band.type = "highshelf";
            } else {
                // Every other band should be peaking.
                band.type = "peaking";
            }
            band.frequency.value = freqMid;

            // Retrieve the current value for the band (zero by default).
            this.getValue(freqMid, 0, band, parseInt(i, 10))
            .then((results) => {
                this.preferences.filterPreferences.frequencyRangeElements[results.args[1]].value = results.value;
                results.args[0].gain.value = results.value;
                this.raiseEvent("frequencyChanged", results.args[0].frequency.value, results.value, this.preferences.filterPreferences.frequencyRangeElements[results.args[1]]);
            });

            // Save the band so we can adjust it later.
            this.bands.set(freqMid, band);
            
            // Connect the next link in the chain.
            if(!currentConnectSource) {
                firstConnectSource = band;
            } else {
                currentConnectSource.connect(band);
            }
            currentConnectSource = band;
        }

        // Finally we've created a new pipeline segment, so publish a message.
        this.raiseEvent("audioPipelineSegmentCreated", firstConnectSource, currentConnectSource, 10);

        this.frequenciesInitialised = true;
    }

    /**
     * Initialise the elements that will allow the user to control this Equalizer.
     * @protected
     */
    async initialiseElements() {
        // Frequency labels.
        this.attachMultipleElements(this.preferences.filterPreferences, "frequencyLabelElements", "[audio-label-eq-frequency]");

        // Frequency sliders.
        this.attachMultipleElements(this.preferences.filterPreferences, "frequencyRangeElements", "[audio-button-eq-range]", {
            eventName: "change",
            callback: this.onFrequencyLevelSelected
        }).then((elements) => {
            elements.map((element) => {
                element.min = this.preferences.filterPreferences.minFrequencyGain;
                element.max = this.preferences.filterPreferences.maxFrequencyGain;
                element.step = this.preferences.filterPreferences.frequencyGainStepSize;
                element.value = this.preferences.filterPreferences.defaultFrequencyGain;
            });
            this.loadState();
        });

        // Preset buttons.
        this.attachMultipleElements(this.preferences, "presetElements", "[audio-button-eq-preset]", {
            eventName: "click",
            callback: (event) => this.applyPreset(event.target.attributes["preset"].value)
        });
    }

    /**
     * Remove a preset from the equalizer based on its unique name.
     * @public
     * @param {String} name 
     */
    removePreset(name) {
        var preset = this.preferences.presets.find((p) => p.name === name);
        if(preset){
            this.preferences.presets.splice(this.preferences.presets.indexOf(preset), 1);
        }
    }

    /**
     * Add a preset to this equalizer.
     * @param {EqualizerPreset} preset The preset to add.
     * @public
     */
    addPreset(preset) {
        this.preferences.presets.push(new EqualizerPreset(preset));
        this.storeValue("equalizerPresets", this.preferences.presets);
    }

    /**
     * Apply a predefined preset to this equalizer.
     * @public
     * @fires presetApplied
     * @param {String} name The name of the preset to apply.
     */
    applyPreset(name) {
        var preset = this.preferences.presets.find((p) => p.name === name);

        if(preset){
            this.selectedPreset = preset.name;

            // Go through each band in the preset and set the frequency levels.
            Array.from(preset.bands.keys()).map((key) => {
                this.changeFrequencyLevel(key, preset.bands.get(key));
                this.bands.get(key).gain.value = preset.bands.get(key);
            });

            this.raiseEvent("presetApplied", preset);
        }
    }

    /**
     * Change a single frequency level.
     * @private
     * @fires frequencyChanged
     * @param {Number} frequency The frequency to set.
     * @param {Number} gain The value of the gain to set the frequency at.
     */
    changeFrequencyLevel = (frequency, gain) => {
        this.bands.get(frequency).gain.value = gain;
        const rangeElement = this.preferences.filterPreferences.frequencyRangeElements.find((e) => e.getAttribute("frequency") === frequency.toString());
        rangeElement.value = gain;
        this.storeValue(frequency, gain);
        this.raiseEvent("frequencyChanged", frequency, gain, rangeElement);
    }

    /**
     * Called when a frequency slider is adjusted by the user.
     * @private
     * @param {Event} event The event provided from the slider element.
     */
    onFrequencyLevelSelected = (event) => {
        this.changeFrequencyLevel(event.target.frequency, event.target.value);
        this.selectedPreset = "Custom";
        // NOTE: Uncomment this line if you want to see the frequencies for a specific level.
        // Array.from(this.bands.keys()).map((key) => console.log(`${key}: ${this.bands.get(key).gain.value}`))
    };

    /**
     * Set the AudioContext for this Equalizer component.
     * @private
     * @param {AudioContext} context The HTML audio AudioContext element that this
     * Equalizer will use.
     */
    set context(context){
        this.audioContext = context;
        this.loadState();
    }

    /**
     * Change the name of the currently selected preset.
     * @private
     * @param {String} name The name of the new preset.
     */
    set selectedPreset(name) {
        this.activePreset = name;

        // Switch CSS classes on preset elements.
        this.preferences.presetElements.map((e) => {
            if(e.getAttribute("preset") === name) {
                e.classList.remove(this.preferences.presetUnselectedClass);
                e.classList.add(this.preferences.presetSelectedClass);
            } else {
                e.classList.remove(this.preferences.presetSelectedClass);
                e.classList.add(this.preferences.presetUnselectedClass);
            }
        });
        this.storeValue("activePreset", name);
    }
}

module.exports = { Equalizer };