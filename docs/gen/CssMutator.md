<a name="ZAmp.Components.AudioHtmlVisualiser.CssMutator"></a>

## AudioHtmlVisualiser.CssMutator
Mutates a specific CSS attribute of a single HTML element,based on a percentage value. If no mutation details areset, the default configuration will cause the HTML element'sheight to vary from 0 - 100%.

**Kind**: static class of [<code>AudioHtmlVisualiser</code>](#ZAmp.Components.AudioHtmlVisualiser)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.CssMutator](#ZAmp.Components.AudioHtmlVisualiser.CssMutator)
    * [new CssMutator(htmlElement, cssProperty, unitOfMeasure, lowerValue, upperValue)](#new_ZAmp.Components.AudioHtmlVisualiser.CssMutator_new)
    * [.mutate(percentage)](#ZAmp.Components.AudioHtmlVisualiser.CssMutator+mutate)

<a name="new_ZAmp.Components.AudioHtmlVisualiser.CssMutator_new"></a>

### new CssMutator(htmlElement, cssProperty, unitOfMeasure, lowerValue, upperValue)
Construct a new mutator for a CSS property of an HTML element.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| htmlElement | <code>HTMLElement</code> |  | The HTML element whose CSS property will be adjusted. |
| cssProperty | <code>String</code> | <code>height</code> | The property that will be mutated on the element. Defaults to "height". |
| unitOfMeasure | <code>String</code> | <code>%</code> | The unit of measure that will be appended to the CSS value. Defaults to "%". |
| lowerValue | <code>Number</code> | <code>0</code> | The lower bounds of the value to set on the element. Defaults to 0.0. |
| upperValue | <code>Number</code> | <code>100</code> | The upper bounds of the value to set on the element. Defaults to 100.0. |

<a name="ZAmp.Components.AudioHtmlVisualiser.CssMutator+mutate"></a>

### cssMutator.mutate(percentage)
Perform the desired mutation on the HTML element.

**Kind**: instance method of [<code>CssMutator</code>](#ZAmp.Components.AudioHtmlVisualiser.CssMutator)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>Number</code> | The percentage value to use to perform the mutation. |

