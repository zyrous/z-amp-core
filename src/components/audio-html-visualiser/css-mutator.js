/**
 * Mutates a specific CSS attribute of a single HTML element,
 * based on a percentage value. If no mutation details are
 * set, the default configuration will cause the HTML element's
 * height to vary from 0 - 100%.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.AudioHtmlVisualiser
 */
class CssMutator {

    /**
     * The HTML element whose CSS property will be adjusted.
     * @private
     * @type {HTMLElement}
     */
    htmlElement;

    /**
     * The property that will be mutated on the element. Defaults to "height".
     * @private
     * @type {String}
     */
    cssProperty = "height";

    /**
     * The unit of measure that will be appended to the CSS value. Defaults to "%".
     * @private
     * @type {String}
     */
    unitOfMeasure = "%";

    /**
     * The lower bounds of the value to set on the element. Defaults to 0.0.
     * @private
     * @type {Number}
     */
    lowerValue = 0.0;

    /**
     * The upper bounds of the value to set on the element. Defaults to 100.0.
     * @private
     * @type {Number}
     */
    upperValue = 100.0;

    /**
     * The difference between the upper and lower values. Defaults to 100.0.
     * @private
     * @type {Number}
     */
    spread = 100.0;

    /**
     * Construct a new mutator for a CSS property of an HTML element.
     * @param {HTMLElement} htmlElement The HTML element whose CSS property will be adjusted.
     * @param {String} cssProperty The property that will be mutated on the element. Defaults to "height".
     * @param {String} unitOfMeasure The unit of measure that will be appended to the CSS value. Defaults to "%".
     * @param {Number} lowerValue The lower bounds of the value to set on the element. Defaults to 0.0.
     * @param {Number} upperValue The upper bounds of the value to set on the element. Defaults to 100.0.
     */
    constructor(htmlElement, cssProperty = this.cssProperty, unitOfMeasure = this.unitOfMeasure, lowerValue = this.lowerValue, upperValue = this.upperValue){
        this.htmlElement = htmlElement;
        this.cssProperty = cssProperty;
        this.unitOfMeasure = unitOfMeasure;
        this.lowerValue = Number.parseFloat(lowerValue);
        this.upperValue = Number.parseFloat(upperValue);
        this.spread = this.upperValue - this.lowerValue;
    }

    /**
     * Perform the desired mutation on the HTML element.
     * @public
     * @param {Number} percentage The percentage value to use to perform the mutation.
     */
    mutate(percentage) {
        // Calculate the new value.
        var newValue = this.spread * (percentage / 100.0) + this.lowerValue;
        this.htmlElement.style[this.cssProperty] = `${newValue}${this.unitOfMeasure}`;
    }
}

module.exports = {CssMutator};