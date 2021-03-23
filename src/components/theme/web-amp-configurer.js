const {ComponentConfigurer} = require("./component-configurer");
const {AudioPipeline} = require("../audio-pipeline/audio-pipeline");
const {AudioPlayer} = require("../audio-player/audio-player");
const {PlayerPreferences} = require("../audio-player/player-preferences");
const {Equalizer} = require("../equalizer/equalizer");
const {EqualizerPreferences} = require("../equalizer/equalizer-preferences");
const {PlaylistManager} = require("../playlist-manager/playlist-manager");
const {PlaylistPreferences} = require("../playlist-manager/playlist-preferences");
const {AudioHtmlVisualiser} = require("../audio-html-visualiser/audio-html-visualiser");
const {AudioHtmlVisualiserPreferences} = require("../audio-html-visualiser/audio-html-visualiser-preferences");
const {LayoutConfigurer} = require("./layout-configurer");
const {Amp} = require("../amp/amp");

/**
 * Provides a facility that allows the user to configure a WebAmp instance's components
 * for use by a single theme.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.Theme
 */
class WebAmpConfigurer {
    
    /**
     * The set of components that make up the WebAmp instance.
     * @private
     * @type {ComponentConfigurer[]}
     */
    components = [];

    /**
     * The set of layouts that make up the WebAmp instance.
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
     * Configure the entire set of components that make up this WebAmp configuration.
     * @public
     * @returns {AudioComponent[]}
     */
    configureComponents() {
        return this.components.map((configurer) => configurer.configure());
    }

    /**
     * Set the element that the configurer will apply to.
     * @param {String} elementSelector The selector that will be used to find the
     * element to initialise.
     */
    for(elementSelector) {
        this.elementSelector = elementSelector;
        return this;
    }

    /**
     * Configure the entire set of layouts that make up this WebAmp configuration.
     * @public
     * @param {HTMLElement} parentElement The HTML element to use to render content into.
     */
    async configureLayouts(parentElement) {

        if(!parentElement){
            // Nothing to render into.
            throw Error("No parent element to render WebAmp within. Did you provide one to the amp() function?");
        }
        
        return Promise.all(this.layouts.map((configurer) => configurer.configure(parentElement)));
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
     * Add a visualiser for manipulating HTML elements in time to the audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioHtmlVisualiser(){
        const configurer = new ComponentConfigurer(AudioHtmlVisualiser, AudioHtmlVisualiserPreferences, this);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add a pipeline for processing and playing audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioPipeline(){
        const configurer = new ComponentConfigurer(AudioPipeline, null, this);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add an audio player for streaming media from an online source.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioPlayer(){
        const configurer = new ComponentConfigurer(AudioPlayer, PlayerPreferences, this);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add an equalizer for manipulating frequency bands in the audio pipeline.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addEqualizer(){
        const configurer = new ComponentConfigurer(Equalizer, EqualizerPreferences, this);
        this.addComponentConfigurer(configurer);
        return configurer;
    }

    /**
     * Add a manager for multiple media files.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addPlaylistManager(){
        const configurer = new ComponentConfigurer(PlaylistManager, PlaylistPreferences, this);
        this.addComponentConfigurer(configurer);
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

module.exports = { WebAmpConfigurer };