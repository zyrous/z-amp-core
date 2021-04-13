const { AudioComponent } = require("../audio-component");
const { ThemeManager } = require("../../theme-manager/theme-manager");
const { ZAmpConfigurer } = require("../../configuration/z-amp-configurer")

/**
 * @namespace ZAmp.Components.Theme
 */

/**
 * Provides a base class for custom ZAmp themes.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.Theme
 * @augments AudioComponent
 */
class Theme extends AudioComponent {

    /**
     * The manager that this theme will register with.
     * @private
     * @type {ThemeManager}
     */
    _themeManager = new ThemeManager();
    
    /**
     * The configurer that will be used to create the components and layouts
     * needed by this theme.
     * @private
     * @type {ZAmpConfigurer}
     */
    _configurer;

    /**
     * The configurer that will be used to create the components and layouts
     * needed by this theme.
     * @public
     * @type {ZAmpConfigurer}
     */
    get configurer() { return this._configurer; }

    /**
     * The name of this theme.
     * @private
     * @type {String}
     */
    _name;

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
     * before the theme is available for use within ZAmp.
     * @public
     */
    register() {
        this._themeManager.addTheme(this);
    }

    /**
     * Build the configuration that will provide the components and layouts for
     * this theme. This must be implemented in derived classes.
     * @abstract
     * @protected
     * @returns {ZAmpConfigurer}
     */
    buildConfiguration() {}

    /**
     * Begin configuring the ZAmp configuration for this theme.
     * @protected
     * @returns {ZAmpConfigurer}
     */
    startConfiguring() {
        this._configurer = new ZAmpConfigurer(this._themeName);
        return this._configurer;
    }

    /**
     * Create, register and return a new instance of a Theme.
     * @param {String} themeName Optional. The name to give to the new theme. 
     * Defaults to a random UUID.
     * @public
     * @returns {Theme}
     */
    static create(themeName = "Theme") {
        const newTheme = new Theme();
        newTheme.themeName = themeName;
        newTheme.register();
        return newTheme;
    }

    /**
     * Sets the name of this theme. Can be called from derived classes.
     * @protected
     * @param {String} themeName The name to give to the theme.
     */
    set themeName(themeName) {
        this._name = themeName;
    }

    /**
     * Gets the name of this theme.
     * @public
     * @returns {String}
     */
    get themeName() { return this._name; }
}

module.exports = { Theme };