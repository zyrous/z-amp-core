const { AudioComponent } = require("../audio-component");
const { AudioPipelineSegment } = require("./audio-pipeline-segment");

/**
 * @namespace ZAmp.Components.AudioPipeline
 */

/**
 * Provides and manages a processing pipeline for audio.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.AudioPipeline
 * @augments AudioComponent
 */
class AudioPipeline extends AudioComponent {

    /**
     * The HTML media element that the pipeline will connect from.
     * @private
     * @type {HTMLMediaElement}
     */
    mediaElement;

    /**
     * The Audio Context that this pipeline creates.
     * @private
     * @type {AudioContext}
     */
    audioContext;

    /**
     * The segments that make up this audio pipeline.
     * @private
     * @type {AudioPipelineSegment[]}
     */
    pipelineSegments = [];

    /**
     * Whether or not this pipeline has been initialised yet.
     * @private
     */
    pipelineInitialised = false;

    /**
     * Construct a new audio processing pipeline.
     * @param {String} componentName The name of this component. Defaults to "AudioPipeline".
     * "Default".
     */
    constructor(componentName = "AudioPipeline"){
        super(componentName);

        // Listen for the media element being loaded.
        this.addEventListener("mediaElementLoaded", (element) => this.audioElement = element);
        // Listen for new pipeline segments.
        this.addEventListener("audioPipelineSegmentCreated", this.onPipelineSegmentCreated);
        // Listen for document clicks (only for resuming audio).
        document.addEventListener("click", this.onDocumentClick);
    }

    /**
     * Called when the document is clicked.
     * @private
     */
    onDocumentClick = () => {
        if(this.audioContext.state !== "running") {
            // The audio context is not running, so we need to start it up again.
            // NOTE: This has likely been caused by the browser denying auto-play.
            this.audioContext.resume();
        }
    }

    /**
     * Load any previous state for this pipeline and prepare for processing.
     * @protected
     */
    async loadState() {

        // We only need to continue if we haven't already been initialised and we have a media element
        // to use.
        if(this.pipelineInitialised
            || !this.mediaElement) {
            return;
        }

        // Construct a new audio context. This is the context that all pipeline segments must use.
        const audioContext = new AudioContext();
        this.audioContext = audioContext;

        // Generate a new audio source from the context. This will become the first node in our pipeline.
        const audioSource = audioContext.createMediaElementSource(this.mediaElement);

        // Initially we must connect the new audio source directly to the destination so that the pipeline
        // works even without any other segments.
        audioSource.connect(audioContext.destination);

        // We'll initialise our segment array with two segments initially; the audio source and destination.
        this.pipelineSegments.push(new AudioPipelineSegment(audioSource, audioSource, 0));
        this.pipelineSegments.push(new AudioPipelineSegment(audioContext.destination, audioContext.destination, 100));

        // Announce that the pipeline has been created.
        this.raiseEvent("audioPipelineCreated", audioContext);
        this.pipelineInitialised = true;
    }

    /**
     * Called when a new segment is created for an audio pipeline. This function attempts to find the
     * correct place in the pipeline for the new segment and insert it there.
     * @private
     * @param {AudioNode} firstNode The first node in the new segment
     * @param {AudioNode} lastNode The last node in the new segment (may be the same as firstNode)
     * @param {Number} weighting A weighting (0-100) for where the segment should be placed in sequence.
     */
    onPipelineSegmentCreated = (firstNode, lastNode = firstNode, weighting = 50) => {

        var segmentIndex = 0;
        var previousSegment;
        var nextSegment;

        for(var i=0; i<this.pipelineSegments.length; i++){

            // Find the segments on either side of this one.
            previousSegment = this.pipelineSegments[parseInt(i, 10)];
            nextSegment = this.pipelineSegments[parseInt(i, 10)+1];
            
            if(previousSegment && previousSegment.weighting <= weighting
                && nextSegment && nextSegment.weighting >= weighting) {

                // We're inbetween two different weightings, so we've found the right place.
                segmentIndex = parseInt(i, 10)+1;
                break;
            }
        }

        // Because we should be starting with at least two segments (source and destination), if we're
        // unable to find a place in the array there must have been an error.
        if(!previousSegment
            || !nextSegment) {
            throw Error("Could not find position in audio pipeline for weighting: ", weighting);
        }

        // Add the new segment to the array.
        const segment = new AudioPipelineSegment(firstNode, lastNode, weighting);
        this.pipelineSegments.splice(segmentIndex, 0, segment);

        // Plug the segment inbetween the previous and next ones.
        previousSegment.lastNode.disconnect(nextSegment.firstNode);
        previousSegment.lastNode.connect(segment.firstNode);
        segment.lastNode.connect(nextSegment.firstNode);
    }

    /**
     * Sets the audio element that this pipeline will use.
     * @private
     * @param {HTMLMediaElement} element The HTML media element to use for audio.
     */
    set audioElement(element){
        this.mediaElement = element;
        this.loadState();
    }
}

module.exports = { AudioPipeline };