const { AudioComponent } = require("../audio-component");
const { ThemeManager } = require("../../theme-manager/theme-manager");
const { WebAmpConfigurer } = require("./web-amp-configurer");
const { v4: uuidv4 } = require("uuid");

/**
 * @namespace WebAmp.Components.Theme
 */

/**
 * Provides a base class for custom WebAmp themes.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.Theme
 * @augments AudioComponent
 */
class Theme extends AudioComponent {

    /**
     * The manager that this theme will register with.
     * @private
     * @type {ThemeManager}
     */
    themeManager = new ThemeManager();
    
    /**
     * The configurer that will be used to create the components and layouts
     * needed by this theme.
     * @private
     * @type {WebAmpConfigurer}
     */
    configurer;

    /**
     * The name of this theme.
     * @private
     * @type {String}
     */
    themeName;

    /**
     * Construct a new theme.
     * @param {String} componentName Optional. The name of the component. Defaults
     * to "Theme".
     */
    constructor(componentName = "Theme") {
        super(componentName);

        // Immediately build the configuration.
        this.buildConfiguration();
    }

    /**
     * Register this theme with the theme manager. This method must be called
     * before the theme is available for use within WebAmp.
     * @public
     */
    register() {
        this.themeManager.addTheme(this);
    }

    /**
     * Build the configuration that will provide the components and layouts for
     * this theme. This must be implemented in derived classes.
     * @abstract
     * @protected
     * @returns {WebAmpConfigurer}
     */
    buildConfiguration() {}

    /**
     * Begin configuring the WebAmp configuration for this theme.
     * @protected
     * @returns {WebAmpConfigurer}
     */
    startConfiguring() {
        this.configurer = new WebAmpConfigurer(this.themeName);
        return this.configurer;
    }

    /**
     * Create, register and return a new instance of a Theme.
     * @param {String} themeName Optional. The name to give to the new theme. 
     * Defaults to a random UUID.
     * @returns {Theme}
     */
    static create(themeName = uuidv4()) {
        const newTheme = new Theme();
        newTheme.themeName = themeName;
        newTheme.register();
        return newTheme;
    }

    /**
     * Sets the name of this theme. Can be called from derived classes.
     * @param {String} themeName The name to give to the theme.
     */
    set themeName(themeName) {
        this.themeName = themeName;
    }

    /**
     * Gets the name of this theme. Should be implemented in derived classes.
     * @public
     * @returns {String}
     */
    get themeName() { return themeName; }
}

module.exports = { Theme };