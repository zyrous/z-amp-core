const { AudioHtmlVisualiserPreferences } = require("./audio-html-visualiser-preferences");
const { AudioComponent } = require("../audio-component");
const { CssMutator } = require("./css-mutator");

/**
 * @namespace ZAmp.Components.AudioHtmlVisualiser
 */

/**
 * Implements a visualisation based on the audio frequencies of a specific
 * audio element. This component uses HTML elements with the "audio-vis-eq-frequency"
 * attribute and manipulates them over time, to the music.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.AudioHtmlVisualiser
 * @augments AudioComponent
 */
class AudioHtmlVisualiser extends AudioComponent {

    /**
     * The set of preferences that control how this visualiser configures itself and
     * how it behaves.
     * @private
     * @type {AudioHtmlVisualiserPreferences}
     */
    _preferences;

    /**
     * Gets the set of preferences that control how this visualiser is configured and behaves.
     * @returns {AudioHtmlVisualiserPreferences}
     */
    get preferences() {
        return this._preferences;
    }

    /**
     * The Audio Context that the visualiser will use.
     * @private
     * @type {AudioContext}
     */
    _audioContext;

    /**
     * The analyser that the visualiser will use to retrieve frequencies.
     * @private
     * @type {AnalyserNode}
     */
    _analyser;

    /**
     * Whether or not this visualiser has initialised its state yet.
     * @private
     * @type {Boolean}
     */
    _visualiserInitialised = false;

    /**
     * Whether or not cancellation of the animation has been requested.
     * @private
     * @type {Boolean}
     */
    _cancelAnimation = false;

    /**
     * The timer that will run the animation.
     * @private
     * @type {NodeJS.Timeout}
     */
    _timerHandle;

    /**
     * The starting values of each frequency block in the distribution.
     * @private
     * @type {decimal[]}
     */
    _distributionStarts;

    /**
     * The ending values of each frequency block in the distribution.
     * @private
     * @type {decimal[]}
     */
    _distributionEnds;

    /**
     * The lengths of each frequency block in the distribution.
     * @private
     * @type {int[]}
     */
    _distributionEnds;

    /**
     * The values of each frequency band for use in the animation.
     * @private
     * @type {decimal[]}
     */
    _frequencyValues;

    /**
     * The set of HTML mutators that will be applied to HTML elements
     * during the animation.
     * @private
     * @type {CssMutator[]}
     */
    _mutators;

    /**
     * Create a new visualiser for manipulating HTML elements.
     * @param {AudioHtmlVisualiserPreferences} prefs Optional. The set of preferences that control this vis.
     * @param {String} componentName Optional. Sets the name of the component. Defaults to "AudioHtmlVisualiser".
     */
    constructor(prefs = new AudioHtmlVisualiserPreferences(), componentName = "AudioHtmlVisualiser"){
        super(componentName);
        this._preferences = prefs;

        // Listen for when components are created that we care about.
        this.addEventListener("audioPipelineCreated", (context) => {
            this._audioContext = context;
            this.loadState();
        });
    }

    /**
     * Find and attach to all of the HTML elements that will be used to perform the visualisation.
     * @protected
     */
    async initialiseElements() {
        // Frequency elements.
        this.attachMultipleElements(this._preferences, "frequencyElements", `[${this._preferences.mutationHtmlAttributeName}]`)
        .then(() => this.loadState());
    }

    /**
     * Connect to all HTML elements and prepare to manipulate them according to a sound source.
     * @protected
     */
    async loadState(){

        // We should only continue if: 
        if(this._visualiserInitialised  // 1. We haven't already been initialised.
            || !this._audioContext      // 2. We have an audio context.
            || !this._preferences.frequencyElements) {  // 3. We have HTML elements.
            return;
        }

        // Create an analyser and connect the audio source to it.
        this._analyser = this._audioContext.createAnalyser();

        // We want the analyser to be a part of the audio pipeline, so we need to publish a
        // message announcing that it has been crated.
        // NOTE: We are giving the segment a weighting of 99, meaning that it should be attached
        // at or near the end of the pipeline. That means that anything upstream that modifies
        // the audio (such as the equalizer) will have an effect on the animation.
        this.raiseEvent("audioPipelineSegmentCreated", this._analyser, this._analyser, 99);

        // Get the array that we will hold our frequency data in. This will be an empty array
        // for now.
        this._frequencyValues = new Uint8Array(this._analyser.frequencyBinCount);
        
        // Calculate the Nyquist frequency (https://en.wikipedia.org/wiki/Nyquist_frequency).
        var nyquist = this._audioContext.sampleRate * 0.5;

        // Use that to calculate the number of octaves that fit in this range.
        var numOctaves = Math.log(nyquist / 10.0) / Math.LN2;

        // Get the number of sliders to initialise (it's just the number of HTML elements we have).
        var elementCount = this._preferences.frequencyElements.length;

        // Calculate the segment width as a percentage (not taking into account the exponential
        // curve of the frequencies).
        var segmentWidth = 1.0/(elementCount * 2);

        // We need to create a map of the freqency ranges that each bar represents. Because the
        // data array comes to use in a linear distribution, we need to take into account our
        // exponential frequency scale.
        this._distributionStarts = [];
        this._distributionEnds = [];
        this._distributionLengths = [];

        this._mutators = [];
        for(var i=0; i<this._preferences.frequencyElements.length; i++){

            // fStart/fEnd is simply a percentage of how far through the frequencies we should be.
            var fStart = segmentWidth * (i * 2);
            var fEnd = segmentWidth * ((i + 1) * 2);

            // fLower/fUpper is the actual frequency range that the bar will represent.
            var fLower = nyquist * Math.pow(2.0, numOctaves * (fStart - 1.0));
            var fUpper = nyquist * Math.pow(2.0, numOctaves * (fEnd - 1.0));

            // Calculate the indices into the frequency array we should be looking at for this bar.
            // All we're doing here is calculating how far through our nyquist value we are and
            // using that percentage to get an array index.
            var startSampleIndex = Math.round((fLower / nyquist) * this._frequencyValues.length);
            var endSampleIndex = Math.round((fUpper / nyquist) * this._frequencyValues.length);

            // We need to check whether our calculated indices are less than or equal to the previous
            // ones. Because we're on a logarithmic scale, it's possible for the lower indices that
            // we will calculate to be the same value as the previous one. In this case we simply 
            // increase the index by one from the previous number, ensuring that no two bars have the 
            // same index values.
            if(i !== 0 && this._distributionStarts[i-1] >= startSampleIndex){
                startSampleIndex = this._distributionStarts[i-1] + 1;
            }
            if(endSampleIndex <= startSampleIndex){
                endSampleIndex = startSampleIndex + 1;
            }
            if(i !== 0 && this._distributionEnds[i-1] >= endSampleIndex){
                endSampleIndex = this._distributionEnds[i-1] + 1;
            }

            this._distributionStarts.push(startSampleIndex);
            this._distributionEnds.push(endSampleIndex);
            this._distributionLengths.push(endSampleIndex - startSampleIndex);

            // Now we need to check for mutators to apply to the object.
            if(this._preferences.frequencyElements[i].getAttribute("mutate")) {
                var elementMutators = [];

                // Find HTML attributes of the correct type.
                const elementMutates = this._preferences.frequencyElements[i].getAttribute("mutate").split("|");
                elementMutates.map((elementMutate) => {

                    // Get the arguments to the mutate function.
                    var mutateParts = elementMutate.split(/[\(\)]/);
                    var argumentParts = mutateParts[1].split(",");

                    // Check for CSS mutators.
                    if(mutateParts[0].toLowerCase() === "css") {
                        // Add a CSS mutator.
                        elementMutators.push(new CssMutator(this._preferences.frequencyElements[i], ...argumentParts));
                    }
                });
                this._mutators.push(elementMutators);
            } else {
                this._mutators.push([new CssMutator(this._preferences.frequencyElements[i])]);
            }
        }

        this._visualiserInitialised = true;
        
        // Start the animation.
        this.startAnimation();
    }

    /**
     * Start the animation running. The animation loop will continue until
     * cancelAnimation() is called.
     * @param frameCallback The callback method to invoke after a frame has been animated.
     * @public
     * @method
     */
    startAnimation(frameCallback) {

        // Start processing.
        var currentMagnitude;
        this._timerHandle = setInterval(() => {

            // Check whether we should be cancelling.
            if(this._cancelAnimation){
                // Stop the timer.
                clearInterval(this._timerHandle);
                // Reset the flag.
                this._cancelAnimation = false;
            }

            // First, get the current frequency data.
            this._analyser.getByteFrequencyData(this._frequencyValues);

            // Now, calculate what each bar's magnitude is.
            for(var i=0; i<this._preferences.frequencyElements.length; i++) {

                // We're doing this in one command to save time. We need to calculate an average
                // of the range of frequency data for this element.
                currentMagnitude = this._frequencyValues.slice(this._distributionStarts[i], this._distributionEnds[i])   // Pick out the range of items
                .reduce((previous, current) => previous + current,0) / this._distributionLengths[i]   // Average them
                * 100.0 / 256.0;                                                                // Normalise them to a value out of 100.

                // Now pass the percentage value to each of our mutators for this item.
                // this._preferences.frequencyElements[i].style.height = `${currentMagnitude}%`;
                this._mutators[i].map((mutator) => mutator.mutate(currentMagnitude));
            }

            // Check whether we have a callback to make.
            if(frameCallback) {
                // Make the callback, passing back the HTML elements that were affected.
                frameCallback(this._preferences.frequencyElements);
            }
        }, this._preferences.animationFrameLength);
    }

    /**
     * Request that the animation be stopped as soon as possible.
     * @public
     * @method
     */
    stopAnimation() {
        this._cancelAnimation = true;
    }
}

module.exports = {AudioHtmlVisualiser};