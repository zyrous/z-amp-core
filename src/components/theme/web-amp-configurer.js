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
     * Begin creation of a WebAmp configuration.
     * @public
     */
    static createConfigurer() {
        return new WebAmpConfigurer();
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
     * Add a visualiser for manipulating HTML elements in time to the audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioHtmlVisualiser = () => new ComponentConfigurer(AudioHtmlVisualiser, AudioHtmlVisualiserPreferences, this);

    /**
     * Add a pipeline for processing and playing audio.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioPipeline = () => new ComponentConfigurer(AudioPipeline, null, this);

    /**
     * Add an audio player for streaming media from an online source.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addAudioPlayer = () => new ComponentConfigurer(AudioPlayer, PlayerPreferences, this);

    /**
     * Add an equalizer for manipulating frequency bands in the audio pipeline.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addEqualizer = () => new ComponentConfigurer(Equalizer, EqualizerPreferences, this);

    /**
     * Add a manager for multiple media files.
     * @method
     * @public
     * @returns {ComponentConfigurer}
     */
    addPlaylistManager = () => new ComponentConfigurer(PlaylistManager, PlaylistPreferences, this);

    /**
     * Add a new layout for this configuration.
     * @method
     * @public
     * @param {String} fileName The path to the file that contains the layout template.
     */
    addLayout = (fileName) => new LayoutConfigurer(fileName, this);
}

module.exports = { WebAmpConfigurer };