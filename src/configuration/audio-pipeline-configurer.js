const {ComponentConfigurer} = require("./component-configurer");
const {AudioPipeline} = require("../components/audio-pipeline/audio-pipeline");
const {AudioPlayer} = require("../components/audio-player/audio-player");
const {PlayerPreferences} = require("../components/audio-player/player-preferences");
const {Equalizer} = require("../components/equalizer/equalizer");
const {EqualizerPreferences} = require("../components/equalizer/equalizer-preferences");
const {PlaylistManager} = require("../components/playlist-manager/playlist-manager");
const {PlaylistPreferences} = require("../components/playlist-manager/playlist-preferences");
const {AudioHtmlVisualiser} = require("../components/audio-html-visualiser/audio-html-visualiser");
const {AudioHtmlVisualiserPreferences} = require("../components/audio-html-visualiser/audio-html-visualiser-preferences");
const {LayoutConfigurer} = require("./layout-configurer");
const {Amp} = require("../components/amp/amp");

/**
 * Provides a facility that allows the user to configure a ZAmp instance's components
 * for use by a single theme.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Configuration
 */
class AudioPipelineConfigurer {
    
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
     * The HTML selector that will be used to identify the parent
     * element to initialise within.
     * @public
     * @type {String}
     */
    parentSelector;

    /**
     * The HTML selector that will be used to identify the element
     * to initialise.
     * @private
     * @type {String}
     */
    elementSelector;

    /**
     * The name of the pipeline that will be configured.
     * @private
     * @type {String}
     */
    pipelineName;

    /**
     * The name to give the Audio Pipeline component.
     * @private
     * @type {String}
     */
    componentName;

    /**
     * The builder that is adding this pipeline to itself.
     * @private
     * @type {String}
     */
    builder;

    /**
     * @param {any} builder The builder that is adding this audio pipeline to itself.
     * @param {String} pipelineName Optional. The name of the pipeline that will be
     * configured. Defaults to "Default".
     * @param {String} parentSelector Optional. The selector that will be used to find
     * the element to initialise.
     */
    constructor(builder, pipelineName, parentSelector) {
        this.builder = builder;
        this.parentSelector = parentSelector;
        this.pipelineName = pipelineName;
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
     * @param {HTMLElement} rootElement The HTML element to use to attach to DOM elements.
     * @returns {AudioComponent[]}
     */
    configureComponents(rootElement) {
        
        if(!rootElement){
            // Nothing to render into.
            throw Error("No parent element to render ZAmp within. Did you provide one to the amp() function?");
        }

        var htmlElement = rootElement;

        if(this.elementSelector) {
            // Get the child element.
            htmlElement = rootElement.querySelector(this.elementSelector);
        }

        // First create the audio pipeline.
        const audioComponent = new AudioPipeline(this.componentName);
        // We're going to use the name of the pipeline as the channel for communication.
        audioComponent.addToChannel(this.pipelineName);
        // NOTE: We don't need to attach the audio pipeline to a root element because it
        // doesn't need to interact with the DOM.

        // Now create the components for the pipeline.
        var components = this.components.map((configurer) => configurer.configure(htmlElement, this.pipelineName));
        components = components.concat(audioComponent);

        // Return all components.
        return components;
    }

    /**
     * Set the element that the configurer will apply to. Overrides any selector set
     * by the parent.
     * @param {String} elementSelector The selector that will be used to find the
     * element to initialise.
     * @returns {AudioPipelineConfigurer}
     */
    for(elementSelector) {
        this.elementSelector = elementSelector;
        return this;
    }

    /**
     * Configure the entire set of layouts that make up this ZAmp configuration.
     * @public
     * @param {HTMLElement} rootElement The HTML element to use to render content into.
     * @returns {Promise[]}
     */
    async configureLayouts(rootElement) {

        if(!rootElement){
            // Nothing to render into.
            throw Error("No parent element to render ZAmp within. Did you provide one to the amp() function?");
        }

        var htmlElement = rootElement;

        if(this.elementSelector) {
            // Get the child element.
            htmlElement = rootElement.querySelector(this.elementSelector);
        }
        
        return Promise.all(this.layouts.map((configurer) => configurer.configure(htmlElement)));
    }
    
    /**
     * Add a visualiser for manipulating HTML elements in time to the audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    withAudioHtmlVisualiser(visualiserName){
        const configurer = new ComponentConfigurer(AudioHtmlVisualiser, AudioHtmlVisualiserPreferences, this, visualiserName);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add an audio player for streaming media from an online source.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    withAudioPlayer(playerName){
        const configurer = new ComponentConfigurer(AudioPlayer, PlayerPreferences, this, playerName);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add an equalizer for manipulating frequency bands in the audio pipeline.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    withEqualizer(equalizerName){
        const configurer = new ComponentConfigurer(Equalizer, EqualizerPreferences, this, equalizerName);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add a manager for multiple media files.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    withPlaylistManager(playlistManagerName){
        const configurer = new ComponentConfigurer(PlaylistManager, PlaylistPreferences, this, playlistManagerName);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add a new layout for this configuration.
     * @method
     * @public
     * @param {String} fileName The path to the file that contains the layout template.
     */
    withLayout(fileName){
        const configurer = new LayoutConfigurer(fileName, this);
        this.addLayoutConfigurer(configurer);
        return configurer;
    }

    /**
     * Specify the name to use for the pipeline.
     * @public
     * @param {String} name The name to set on the pipeline.
     * @returns {AudioPipelineConfigurer}
     */
    withName(name){
        if(!name){
            // Need a name.
            throw "You must specify a name to give to the pipeline component.";
        }
        
        this.componentName = name;
        return this;
    }

    /**
     * Complete configuration of the audio pipeline and continue configuration.
     * @returns The builder that this audio pipeline is for.
     */
    then() {
        return this.builder;
    }
}

module.exports = { AudioPipelineConfigurer };