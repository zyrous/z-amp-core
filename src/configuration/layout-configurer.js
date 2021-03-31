/**
 * Allows for configuration of a layout of a theme. This forms part of
 * a collection owned by a ZAmpConfigurer.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Configuration
 */
class LayoutConfigurer {
    
    /**
     * The parent configurer that contains this component configurer.
     * @private
     * @type {any}
     */
    builder;

    /**
     * The function that, when executed, renders HTML for the layout.
     * @private
     * @type {Function}
     */
    layoutFunction;

    /**
     * The style information that will be applied for this layout.
     * @private
     * @type {String[]}
     */
    styles = [];

    /**
     * Create a new configurer for a layout that forms part of a theme.
     * @param {Function} layoutFunction The function that, when executed, renders HTML for the layout.
     * @param {any} builder The ZAmp configurer that this 
     * layout configurer belongs to.
     */
    constructor(layoutFunction, builder) {

        // Add this object to the parent configurer.
        this.builder = builder;

        this.layoutFunction = layoutFunction;
    }

    /**
     * Add styles to this layout. Styles should be passed in as strings of valid CSS.
     * @public
     * @param {String} styles The styles that will be applied for this layout.
     * @returns {LayoutConfigurer}
     */
    withStyles(styles) {
        this.styles.push(styles);
        return this;
    }

    /**
     * Configure this layout by adding components to the provided parent element. Intended
     * to be called internally.
     * @public
     * @param {HTMLElement} htmlElement The parent element to render within.
     */
    async configure(htmlElement) {
        
        if(!htmlElement){
            throw Error("HTML element not provided to configure layout with");
        }

        // Add the script to the head of the document.
        const headElement = document.getElementsByTagName("head")[0];
        this.styles.map((style) => {
            const styleElement = document.createElement("style");
            styleElement.textContent = style;
            headElement.appendChild(styleElement);
        });

        this.render(htmlElement);
    }

    /**
     * Render the layout according to the template, replacing the content of the
     * HTML element.
     * @public
     * @param {HTMLElement} htmlElement The element to render the content within.
     */
    render(htmlElement) {
        // First, get the raw text that's rendered.
        const htmlText = this.layoutFunction();

        // Now, parse the HTML text into a set of tags.
        const parser = new DOMParser();
        const parsed = parser.parseFromString(htmlText, "text/html");

        // Now, add each child element to the target HTML element.
        for(const tag of parsed.children) {
            htmlElement.appendChild(tag);
        }
    }

    /**
     * Add another component to the ZAmp configurer.
     * @public
     */
    and() { return this.builder; }

    /**
     * Finish configuring the ZAmp configurer.
     * @public
     */
    finish() { return this.builder; }
}

module.exports = { LayoutConfigurer };