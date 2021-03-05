const { WebAmpConfigurer } = require("./web-amp-configurer");

/**
 * Allows for configuration of a WebAmp component by a theme. This forms part
 * of a collection owned by a WebAmpConfigurer.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.Theme
 */
class ComponentConfigurer {
    
    /**
     * The parent configurer that contains this component configurer.
     * @private
     * @type {WebAmpConfigurer}
     */
    webAmpConfigurer;

    /**
     * The type of the component that the configurer will create.
     * @private
     * @type {Type}
     */
    componentType;

    /**
     * The name of the component that this configurer will create. If not provided, the default
     * for the component will be used.
     * @private
     * @type {String}
     */
    componentName;

    /**
     * The preferences that will be provided to the component type when it is initialised.
     * @public
     * @type {Type}
     */
    preferences;

    /**
     * Create a new configurer for a specific type of WebAmp component.
     * @param {Type} componentType The type of the component to create.
     * @param {Type} preferencesType The type of the preferences that will be provided to the 
     * component when it is created.
     * @param {WebAmpConfigurer} webAmpConfigurer The configurer that this component configurer
     * belongs to.
     */
    constructor(componentType, preferencesType, webAmpConfigurer) {

        // Add this object to the parent configurer.
        this.webAmpConfigurer = webAmpConfigurer;
        this.webAmpConfigurer.addComponentConfigurer(this);

        this.componentType = componentType;

        // Create the preferences for the component.
        if(preferencesType) {
            this.preferences = new preferencesType();
        }
    }

    /**
     * Specify the setting overrides for this component.
     * @public
     * @param {any} settings The settings to override for the component.
     * @returns {ComponentConfigurer}
     */
    withSettings(settings) {
        if(!this.preferences) {
            // No type for a preferences object was provided.
            throw Error(`Component ${this.componentType} cannot be used with settings.`);
        }

        // Merge the preferences we already have with the ones we're being provided.
        this.preferences = {...this.preferences, ...settings};
        return this;
    }

    /**
     * Specify the name to use for the component.
     * @public
     * @param {String} name The name to set on the component.
     * @returns {ComponentConfigurer}
     */
    withName(name){
        if(!name){
            // Need a name.
            throw error("You must specify a name to give to the component.");
        }
        
        this.componentName = name;
        return this;
    }

    /**
     * Create the component defined by this configurer.
     * @public
     * @returns {any} The newly constructed component.
     */
    configure() {
        return new this.componentType(this.preferences, this.componentName);
    }

    /**
     * Add another component to the WebAmp configurer.
     * @public
     */
    and() { return this.webAmpConfigurer; }

    /**
     * Finish configuring the WebAmp configurer.
     * @public
     */
    finish() { return this.webAmpConfigurer; }
};

module.exports = { ComponentConfigurer };