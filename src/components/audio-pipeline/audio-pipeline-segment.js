/**
 * Describes a single segment of an audio pipeline.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.AudioPipeline
 */
class AudioPipelineSegment {

    /**
     * The first node in the pipeline segment.
     * @public
     * @type {AudioNode}
     */
    firstNode;

    /**
     * The final node in the pipeline segment (may be the same as firstNode if the segment has only
     * one node).
     * @public
     * @type {AudioNode}
     */
    lastNode;

    /**
     * The weighting that should be placed on the segment, between 1 and 99. The higher the weighting,
     * the further down the pipeline the segment will be placed.
     * @public
     * @type {Number}
     */
    weighting;

    /**
     * Construct a new segment for an audio pipeline.
     * @param {AudioNode} firstNode The first node in the pipeline segment.
     * @param {AudioNode} lastNode The final node in the pipeline segment (may be the same as firstNode 
     * if the segment has only one node).
     * @param {Number} weighting The weighting that should be placed on the segment, between 1 and 99. 
     * The higher the weighting, the further down the pipeline the segment will be placed.
     */
    constructor(firstNode, lastNode, weighting) {
        this.firstNode = firstNode;
        this.lastNode = lastNode;
        this.weighting = weighting;
    }
}

module.exports = {AudioPipelineSegment};