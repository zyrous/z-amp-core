const {ComponentConfigurer} = require("./component-configurer");
const {LayoutConfigurer} = require("./layout-configurer");
const {AudioPipelineConfigurer} = require("./audio-pipeline-configurer");
const {Amp} = require("../components/amp/amp");

/**
 * @namespace ZAmp.Configuration
 */

/**
 * Provides a facility that allows the user to configure a ZAmp instance's components
 * for use by a single theme.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Configuration
 */
class ZAmpConfigurer {
    
    /**
     * The set of pipelines that will be added to the configuration.
     * @private
     * @type {AudioPipelineConfigurer[]}
     */
    pipelines = [];

    /**
     * The set of components that make up the ZAmp instance.
     * @private
     * @type {ComponentConfigurer[]}
     */
    components = [];

    /**
     * The set of layouts that make up the ZAmp instance.
     * @private
     * @type {LayoutConfigurer[]}
     */
    layouts = [];

    /**
     * The HTML selector that will be used to identify the element
     * to initialise.
     * @private
     * @type {String}
     */
    elementSelector;

    /**
     * The name of the theme that the configurer is for.
     * @private
     * @type {String}
     */
    themeName;

    /**
     * 
     * @param {String} themeName Optional. The name of the theme that the configurer
     * is for. If left empty, calling apply() will result in an error if more than
     * one theme is available.
     */
    constructor(themeName) {
        this.themeName = themeName;
    }

    /**
     * Add a component configurer to this set of configurers. Intended for use by child
     * components.
     * @public
     * @param {ComponentConfigurer} configurer The component configurer to add.
     */
    addComponentConfigurer(configurer){
        this.components.push(configurer);
    }

    /**
     * Add a layout configurer to this set of configurers. Intended for use by child
     * components.
     * @public
     * @param {LayoutConfigurer} configurer The layout configurer to add.
     */
    addLayoutConfigurer(configurer){
        this.layouts.push(configurer);
    }

    /**
     * Configure the entire set of components that make up this ZAmp configuration.
     * @public
     * @param {String} elementSelector The HTML element to use to attach to.
     * @returns {AudioComponent[]}
     */
    configureComponents(elementSelector) {
        
        if(!elementSelector){
            // Nothing to render into.
            throw Error("No parent element to render ZAmp within. Did you provide one to the amp() function?");
        }
        
        const rootElement = document.querySelector(elementSelector);

        if(!rootElement) {
            // Can't find the element.
            throw Error(`Cannot find HTML element with selector: ${elementSelector}`);
        }

        // Configure all elements that are not part of a pipeline. These will all be a part of
        // the "Default" channel.
        var components = this.components.map((configurer) => configurer.configure(rootElement));

        // Go through each pipeline. Note that they are done in order, rather than in parallel,
        // so that they can be initialised in the same order they were configured.
        for(const pipeline of this.pipelines) {
            components = components.concat(pipeline.configureComponents(rootElement));
        }

        return components;
    }

    /**
     * Set the element that the configurer will apply to.
     * @param {String} elementSelector The selector that will be used to find the
     * element to initialise.
     */
    for(elementSelector) {
        this.elementSelector = elementSelector;
        this.pipelines.map((pipeline) => pipeline.parentSelector = elementSelector);
        return this;
    }

    /**
     * Configure the entire set of layouts that make up this ZAmp configuration.
     * @public
     * @param {String} elementSelector The HTML element to use to render content into.
     */
    async configureLayouts(elementSelector) {

        if(!elementSelector){
            // Nothing to render into.
            throw Error("No parent element to render ZAmp within. Did you provide one to the amp() function?");
        }

        const htmlElement = document.querySelector(elementSelector);

        if(!htmlElement) {
            // Can't find the element.
            throw Error(`Cannot find HTML element with selector: ${elementSelector}`);
        }

        var promises = this.layouts.map((configurer) => configurer.configure(htmlElement));
        for(const pipeline of this.pipelines) {
            promises = promises.concat(pipeline.configureLayouts(htmlElement));
        }
        
        return Promise.all(promises);
    }

    /**
     * Apply this configuration and initialise the element.
     * @returns {Promise<Amp>} The newly initialised Amp.
     */
    async apply() {
        // Amp the component.
        return Amp.amp(this.elementSelector, this.themeName);
    }

    /**
     * Add a pipeline for processing and playing audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioPipeline(pipelineName = "Default"){
        const configurer = new AudioPipelineConfigurer(this, pipelineName, this.elementSelector);
        this.pipelines.push(configurer);
        return configurer;
    }

    /**
     * Add a new layout for this configuration.
     * @method
     * @public
     * @param {String} fileName The path to the file that contains the layout template.
     */
    addLayout(fileName){
        const configurer = new LayoutConfigurer(fileName, this);
        this.addLayoutConfigurer(configurer);
        return configurer;
    }
}

module.exports = { ZAmpConfigurer };