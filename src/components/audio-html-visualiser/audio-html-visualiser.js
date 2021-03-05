const { AudioHtmlVisualiserPreferences } = require("./audio-html-visualiser-preferences");
const { AudioComponent } = require("../audio-component");
const { CssMutator } = require("./css-mutator");

/**
 * @namespace WebAmp.Components.AudioHtmlVisualiser
 */

/**
 * Implements a visualisation based on the audio frequencies of a specific
 * audio element. This component uses HTML elements with the "audio-vis-eq-frequency"
 * attribute and manipulates them over time, to the music.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioHtmlVisualiser
 * @augments AudioComponent
 */
class AudioHtmlVisualiser extends AudioComponent {

    /**
     * The set of preferences that control how this visualiser configures itself and
     * how it behaves.
     * @private
     * @type {AudioHtmlVisualiserPreferences}
     */
    preferences;

    /**
     * The Audio Context that the visualiser will use.
     * @private
     * @type {AudioContext}
     */
    audioContext; 

    /**
     * The analyser that the visualiser will use to retrieve frequencies.
     * @private
     * @type {AnalyserNode}
     */
    analyser;

    /**
     * Whether or not this visualiser has initialised its state yet.
     * @private
     * @type {Boolean}
     */
    visualiserInitialised = false;

    /**
     * Create a new visualiser for manipulating HTML elements.
     * @param {AudioHtmlVisualiserPreferences} prefs Optional. The set of preferences that control this vis.
     * @param {String} componentName Optional. Sets the name of the component. Defaults to "AudioHtmlVisualiser".
     */
    constructor(prefs = new AudioHtmlVisualiserPreferences(), componentName = "AudioHtmlVisualiser"){
        super(componentName);
        this.preferences = prefs;

        // Listen for when components are created that we care about.
        this.addEventListener("audioPipelineCreated", (context) => this.context = context);
    }

    /**
     * Find and attach to all of the HTML elements that will be used to perform the visualisation.
     * @protected
     */
    async initialiseElements() {
        // Frequency elements.
        this.attachMultipleElements(this.preferences, "frequencyElements", `[${this.preferences.mutationHtmlAttributeName}]`)
        .then(() => this.loadState());
    }

    /**
     * Connect to all HTML elements and prepare to manipulate them according to a sound source.
     * @protected
     */
    async loadState(){

        // We should only continue if: 
        if(this.visualiserInitialised  // 1. We haven't already been initialised.
            || !this.audioContext      // 2. We have an audio context.
            || !this.preferences.frequencyElements) {  // 3. We have HTML elements.
            return;
        }

        // Create an analyser and connect the audio source to it.
        this.analyser = this.audioContext.createAnalyser();

        // We want the analyser to be a part of the audio pipeline, so we need to publish a
        // message announcing that it has been crated.
        // NOTE: We are giving the segment a weighting of 99, meaning that it should be attached
        // at or near the end of the pipeline. That means that anything upstream that modifies
        // the audio (such as the equalizer) will have an effect on the animation.
        this.raiseEvent("audioPipelineSegmentCreated", this.analyser, this.analyser, 99);

        // Get the array that we will hold our frequency data in. This will be an empty array
        // for now.
        var fbcArray = new Uint8Array(this.analyser.frequencyBinCount);
        
        // Calculate the Nyquist frequency (https://en.wikipedia.org/wiki/Nyquist_frequency).
        var nyquist = this.audioContext.sampleRate * 0.5;

        // Use that to calculate the number of octaves that fit in this range.
        var numOctaves = Math.log(nyquist / 10.0) / Math.LN2;

        // Get the number of sliders to initialise (it's just the number of HTML elements we have).
        var elementCount = this.preferences.frequencyElements.length;

        // Calculate the segment width as a percentage (not taking into account the exponential
        // curve of the frequencies).
        var segmentWidth = 1.0/(elementCount * 2);

        // We need to create a map of the freqency ranges that each bar represents. Because the
        // data array comes to use in a linear distribution, we need to take into account our
        // exponential frequency scale.
        var distributionStarts = [];
        var distributionEnds = [];
        var distributionLengths = [];

        var mutators = [];
        for(var i=0; i<this.preferences.frequencyElements.length; i++){

            // fStart/fEnd is simply a percentage of how far through the frequencies we should be.
            var fStart = segmentWidth * (i * 2);
            var fEnd = segmentWidth * ((i+1) * 2);

            // fLower/fUpper is the actual frequency range that the bar will represent.
            var fLower = nyquist * Math.pow(2.0, numOctaves * (fStart - 1.0));
            var fUpper = nyquist * Math.pow(2.0, numOctaves * (fEnd - 1.0));

            // Calculate the indices into the frequency array we should be looking at for this bar.
            // All we're doing here is calculating how far through our nyquist value we are and
            // using that percentage to get an array index.
            var startSampleIndex = Math.round((fLower / nyquist) * fbcArray.length);
            var endSampleIndex = Math.round((fUpper / nyquist) * fbcArray.length);

            // We need to check whether our calculated indices are less than or equal to the previous
            // ones. Because we're on a logarithmic scale, it's possible for the lower indices that
            // we will calculate to be the same value as the previous one. In this case we simply 
            // increase the index by one from the previous number, ensuring that no two bars have the 
            // same index values.
            if(i !== 0 && distributionStarts[i-1] >= startSampleIndex){
                startSampleIndex = distributionStarts[i-1] + 1;
            }
            if(endSampleIndex <= startSampleIndex){
                endSampleIndex = startSampleIndex + 1;
            }
            if(i !== 0 && distributionEnds[i-1] >= endSampleIndex){
                endSampleIndex = distributionEnds[i-1] + 1;
            }

            distributionStarts.push(startSampleIndex);
            distributionEnds.push(endSampleIndex);
            distributionLengths.push(endSampleIndex - startSampleIndex);

            // Now we need to check for mutators to apply to the object.
            if(this.preferences.frequencyElements[i].getAttribute("mutate")) {
                var elementMutators = [];

                // Find HTML attributes of the correct type.
                const elementMutates = this.preferences.frequencyElements[i].getAttribute("mutate").split("|");
                elementMutates.map((elementMutate) => {

                    // Get the arguments to the mutate function.
                    var mutateParts = elementMutate.split(/[\(\)]/);
                    var argumentParts = mutateParts[1].split(",");

                    // Check for CSS mutators.
                    if(mutateParts[0].toLowerCase() === "css") {
                        // Add a CSS mutator.
                        elementMutators.push(new CssMutator(this.preferences.frequencyElements[i], ...argumentParts));
                    }
                })
                mutators.push(elementMutators);
            } else {
                mutators.push([new CssMutator(this.preferences.frequencyElements[i])]);
            }
        }
        
        // Start processing.
        var currentMagnitude;
        setInterval(() => {

            // First, get the current frequency data.
            this.analyser.getByteFrequencyData(fbcArray);

            // Now, calculate what each bar's magnitude is.
            for(var i=0; i<elementCount; i++) {

                // We're doing this in one command to save time. We need to calculate an average
                // of the range of frequency data for this element.
                currentMagnitude = fbcArray.slice(distributionStarts[i], distributionEnds[i])   // Pick out the range of items
                .reduce((previous, current) => previous + current,0) / distributionLengths[i]   // Average them
                * 100.0 / 256.0;                                                                // Normalise them to a value out of 100.

                // Now pass the percentage value to each of our mutators for this item.
                // this.preferences.frequencyElements[i].style.height = `${currentMagnitude}%`;
                mutators[i].map((mutator) => mutator.mutate(currentMagnitude));
            }
        }, this.preferences.animationFrameLength);

        this.visualiserInitialised = true;
    }

    /**
     * Set the AudioContext that this visualiser should use.
     * @private
     * @param {AudioContext} context The context to set.
     */
    set context(context){
        this.audioContext = context;
        this.loadState();
    }

    /**
     * Gets the set of preferences that control how this visualiser is configured and behaves.
     * @returns {AudioHtmlVisualiserPreferences}
     */
    get preferences() {
        return this.preferences;
    }
}

module.exports = {AudioHtmlVisualiser};