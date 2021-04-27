<a name="ZAmp.Components.AudioPipeline.AudioPipelineSegment"></a>

## AudioPipeline.AudioPipelineSegment
Describes a single segment of an audio pipeline.

**Kind**: static class of [<code>AudioPipeline</code>](#ZAmp.Components.AudioPipeline)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.AudioPipelineSegment](#ZAmp.Components.AudioPipeline.AudioPipelineSegment)
    * [new AudioPipelineSegment(firstNode, lastNode, weighting)](#new_ZAmp.Components.AudioPipeline.AudioPipelineSegment_new)
    * [._firstNode](#ZAmp.Components.AudioPipeline.AudioPipelineSegment+_firstNode) : <code>AudioNode</code>
    * [.firstNode](#ZAmp.Components.AudioPipeline.AudioPipelineSegment+firstNode) : <code>AudioNode</code>
    * [.lastNode](#ZAmp.Components.AudioPipeline.AudioPipelineSegment+lastNode) : <code>AudioNode</code>
    * [.weighting](#ZAmp.Components.AudioPipeline.AudioPipelineSegment+weighting) : <code>Number</code>

<a name="new_ZAmp.Components.AudioPipeline.AudioPipelineSegment_new"></a>

### new AudioPipelineSegment(firstNode, lastNode, weighting)
Construct a new segment for an audio pipeline.


| Param | Type | Description |
| --- | --- | --- |
| firstNode | <code>AudioNode</code> | The first node in the pipeline segment. |
| lastNode | <code>AudioNode</code> | The final node in the pipeline segment (may be the same as firstNode  if the segment has only one node). |
| weighting | <code>Number</code> | The weighting that should be placed on the segment, between 1 and 99.  The higher the weighting, the further down the pipeline the segment will be placed. |

<a name="ZAmp.Components.AudioPipeline.AudioPipelineSegment+_firstNode"></a>

### audioPipelineSegment.\_firstNode : <code>AudioNode</code>
The first node in the pipeline segment.

**Kind**: instance property of [<code>AudioPipelineSegment</code>](#ZAmp.Components.AudioPipeline.AudioPipelineSegment)  
**Access**: public  
<a name="ZAmp.Components.AudioPipeline.AudioPipelineSegment+firstNode"></a>

### audioPipelineSegment.firstNode : <code>AudioNode</code>
Gets the first node in the pipeline segment.

**Kind**: instance property of [<code>AudioPipelineSegment</code>](#ZAmp.Components.AudioPipeline.AudioPipelineSegment)  
**Access**: public  
<a name="ZAmp.Components.AudioPipeline.AudioPipelineSegment+lastNode"></a>

### audioPipelineSegment.lastNode : <code>AudioNode</code>
Gets the final node in the pipeline segment (may be the same as firstNode if the segment has onlyone node).

**Kind**: instance property of [<code>AudioPipelineSegment</code>](#ZAmp.Components.AudioPipeline.AudioPipelineSegment)  
**Access**: public  
<a name="ZAmp.Components.AudioPipeline.AudioPipelineSegment+weighting"></a>

### audioPipelineSegment.weighting : <code>Number</code>
Gets the weighting that should be placed on the segment, between 1 and 99. The higher the weighting,the further down the pipeline the segment will be placed.

**Kind**: instance property of [<code>AudioPipelineSegment</code>](#ZAmp.Components.AudioPipeline.AudioPipelineSegment)  
**Access**: public  
