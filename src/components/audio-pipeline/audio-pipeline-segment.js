/**
 * Describes a single segment of an audio pipeline.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.AudioPipeline
 */
class AudioPipelineSegment {

    /**
     * The first node in the pipeline segment.
     * @public
     * @type {AudioNode}
     */
    _firstNode;

    /**
     * Gets the first node in the pipeline segment.
     * @public
     * @type {AudioNode}
     */
    get firstNode() { return this._firstNode; }

    /**
     * The final node in the pipeline segment (may be the same as firstNode if the segment has only
     * one node).
     * @private
     * @type {AudioNode}
     */
    _lastNode;

    /**
     * Gets the final node in the pipeline segment (may be the same as firstNode if the segment has only
     * one node).
     * @public
     * @type {AudioNode}
     */
    get lastNode() { return this._lastNode; }

    /**
     * The weighting that should be placed on the segment, between 1 and 99. The higher the weighting,
     * the further down the pipeline the segment will be placed.
     * @private
     * @type {Number}
     */
    _weighting;

    /**
     * Gets the weighting that should be placed on the segment, between 1 and 99. The higher the weighting,
     * the further down the pipeline the segment will be placed.
     * @public
     * @type {Number}
     */
    get weighting() { return this._weighting; }

    /**
     * Construct a new segment for an audio pipeline.
     * @param {AudioNode} firstNode The first node in the pipeline segment.
     * @param {AudioNode} lastNode The final node in the pipeline segment (may be the same as firstNode 
     * if the segment has only one node).
     * @param {Number} weighting The weighting that should be placed on the segment, between 1 and 99. 
     * The higher the weighting, the further down the pipeline the segment will be placed.
     */
    constructor(firstNode, lastNode, weighting) {
        this._firstNode = firstNode;
        this._lastNode = lastNode;
        this._weighting = weighting;
    }
}

module.exports = {AudioPipelineSegment};