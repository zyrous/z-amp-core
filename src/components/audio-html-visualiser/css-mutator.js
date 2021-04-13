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
    _htmlElement;

    /**
     * The property that will be mutated on the element. Defaults to "height".
     * @private
     * @type {String}
     */
    _cssProperty = "height";

    /**
     * The unit of measure that will be appended to the CSS value. Defaults to "%".
     * @private
     * @type {String}
     */
    _unitOfMeasure = "%";

    /**
     * The lower bounds of the value to set on the element. Defaults to 0.0.
     * @private
     * @type {Number}
     */
    _lowerValue = 0.0;

    /**
     * The upper bounds of the value to set on the element. Defaults to 100.0.
     * @private
     * @type {Number}
     */
    _upperValue = 100.0;

    /**
     * The difference between the upper and lower values. Defaults to 100.0.
     * @private
     * @type {Number}
     */
    _spread = 100.0;

    /**
     * Construct a new mutator for a CSS property of an HTML element.
     * @param {HTMLElement} htmlElement The HTML element whose CSS property will be adjusted.
     * @param {String} cssProperty The property that will be mutated on the element. Defaults to "height".
     * @param {String} unitOfMeasure The unit of measure that will be appended to the CSS value. Defaults to "%".
     * @param {Number} lowerValue The lower bounds of the value to set on the element. Defaults to 0.0.
     * @param {Number} upperValue The upper bounds of the value to set on the element. Defaults to 100.0.
     */
    constructor(htmlElement, cssProperty = "height", unitOfMeasure = "%", lowerValue = 0.0, upperValue = 100.0){
        this._htmlElement = htmlElement;
        this._cssProperty = cssProperty;
        this._unitOfMeasure = unitOfMeasure;
        this._lowerValue = Number.parseFloat(lowerValue);
        this._upperValue = Number.parseFloat(upperValue);
        this._spread = this._upperValue - this._lowerValue;
    }

    /**
     * Perform the desired mutation on the HTML element.
     * @public
     * @param {Number} percentage The percentage value to use to perform the mutation.
     */
    mutate(percentage) {
        // Calculate the new value.
        // NOTE: Rounding here to avoid floating point errors.
        var newValue = Math.round(((this._spread * (percentage / 100.0) + this._lowerValue) * 100)) / 100;
        this._htmlElement.style[this._cssProperty] = `${newValue}${this._unitOfMeasure}`;
    }
}

module.exports = {CssMutator};