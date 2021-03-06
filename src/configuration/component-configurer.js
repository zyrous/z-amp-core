/**
 * Allows for configuration of a ZAmp component by a theme. This forms part
 * of a collection owned by a ZAmpConfigurer.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Configuration
 */
class ComponentConfigurer {
    
    /**
     * The parent configurer that contains this component configurer.
     * @private
     * @type {any}
     */
    builder;

    /**
     * The type of the component that the configurer will create.
     * @private
     * @type {Type}
     */
    ComponentType;

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
     * Create a new configurer for a specific type of ZAmp component.
     * @param {Type} componentType The type of the component to create.
     * @param {Type} PreferencesType The type of the preferences that will be provided to the 
     * component when it is created.
     * @param {any} builder The configurer that this component configurer belongs to.
     * @param {String} componentName The name to give the component.
     */
    constructor(componentType, PreferencesType, builder, componentName) {

        // Add this object to the parent configurer.
        this.builder = builder;

        this.ComponentType = componentType;

        // Create the preferences for the component.
        if(PreferencesType) {
            this.preferences = new PreferencesType();
        }

        // Save the name to give the component.
        if(componentName){
            this.componentName = componentName;
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
            throw Error(`Component ${this.ComponentType} cannot be used with settings.`);
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
            throw "You must specify a name to give to the component.";
        }
        
        this.componentName = name;
        return this;
    }

    /**
     * Create the component defined by this configurer.
     * @public
     * @param {HtmlElement} rootElement The DOM element that the component will configure
     * itself within.
     * @param {String} channelName The name of the channel to add the component to.
     * @returns {any} The newly constructed component.
     */
    configure(rootElement, channelName) {
        const component = new this.ComponentType(this.preferences, this.componentName);
        component.attachToRootElement(rootElement);
        component.addToChannel(channelName);
        return component;
    }

    /**
     * Add another component to the ZAmp configurer.
     * @public
     */
    and() { return this.builder; }
}

module.exports = { ComponentConfigurer };