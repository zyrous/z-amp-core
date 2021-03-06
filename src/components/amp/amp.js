const { AudioComponent } = require("../audio-component");
const { ThemeManager } = require("../../theme-manager/theme-manager");
const { v4: uuidv4 } = require("uuid");

/**
 * @namespace WebAmp.Components.Amp
 */

/**
 * Provides a running instance of WebAmp. This is the primary entry point of
 * the library. Developers using this framework should interact with WebAmp
 * exclusively through this interface.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.Amp
 * @augments AudioComponent
 */
class Amp extends AudioComponent {

    /**
     * The unique identifier of this amp.
     */
    ampId = uuidv4();

    /**
     * The set of components that make up this Amp.
     * @private
     * @type {AudioComponent[]}
     */
    components = [];

    /**
     * The manager that will provide access to themes to use.
     * @private
     */
    themeManager = new ThemeManager();
    
    /**
     * The static version of initialisation of WebAmp. Call this method to create a new
     * running instance of WebAmp with a theme applied.
     * @example
     * // Attach to the body of the DOM using the default theme.
     * Amp.amp()
     *   .then(() => console.log("Ready to play!"))
     * @param {String} selector The CSS selector that tells WebAmp where to find the parent
     * HTML element that it will fit inside.
     * @param {String} themeName The name of the theme that WebAmp will use.
     * @returns {Promise<Amp>}
     */
    static amp(selector = "body", themeName){
        var amp = new Amp();
        return amp.initialise(selector, themeName);
    }

    /**
     * Create a new Amp. This can be used instead of the static Amp.amp() method, but
     * you'll need to call initialise() afterwards.
     */
    constructor() {
        super("Amp");

        // Make sure that we listen to all events that are raised, so that we can pass
        // them to our child components.
        this.addEventListener("eventRaised", (eventName, ...args) => {
            this.components.map((c) => c.handleEvent(eventName, ...args));
        });
    }

    /**
     * Add a new component to this Amp. Although you can call this method yourself for a custom
     * component (for example, one that is not handled by the theme you're using), this is
     * intended to be called internally.
     * @public
     * @param {AudioComponent} component The component to add to this Amp. 
     */
    addComponent(component) {
        this.components.push(component);

        // Listen to all events that are raised by the component.
        component.addEventListener("eventRaised", (eventName, ...args) => {

            // Give the Amp a chance to handle the event.
            this.handleEvent(eventName, ...args);

            // Pass the event to each one of our components.
            this.components.map((c) => c.handleEvent(eventName, ...args));
        });

        // Finally, initialise the component.
        return component.initialise();
    }

    /**
     * Initialise an Amp. This method applies the theme (generating HTML content) then configures
     * and initialises each registered component.
     * @example
     * // Attach to a div with ID "player", using the minimal theme.
     * const amp = new Amp();
     * amp.initialse("#player", "minimal")
     *   .then(() => console.log("Amp good to go!"));
     * @public
     * @param {String} selector The CSS selector that defines the HTML element that WebAmp will
     * render itself within.
     * @param {String} themeName The name of the theme to apply.
     * @returns {Promise<Amp>} The newly initialised Amp.
     */
    async initialise(selector = "body", themeName){
        
        // Get the selected theme.
        var theme = this.themeManager.getTheme(themeName);

        if(!theme){
            // We can't initialise without a theme.
            throw Error(`Cannot find theme with name: ${themeName}`);
        }

        // Get the parent element and configure the theme within it.
        const parentElement = document.querySelector(selector);
        return theme.configurer.configureLayouts(parentElement)
        .then(() => {
            
            // Configure all of the components and then add them.
            var initPromises = theme.configurer.configureComponents().map((component) => this.addComponent(component));
            
            // Add the theme as a component so that it can respond to events.
            initPromises.push(this.addComponent(theme));

            // Return all of the promises; when these resolve, WebAmp has been initialised.
            return Promise.all(initPromises)
            .then(() => {
                console.log(`=======================================================
||   __________            _____                     ||
||   \\____    /           /  _  \\   _____ ______     ||
||     /     /   ______  /  /_\\  \\ /     \\\\____ \\    ||
||    /     /_  /_____/ /    |    \\  Y Y  \\  |_> >   ||
||   /_______ \\         \\____|__  /__|_|  /   __/    ||
||           \\/                 \\/      \\/|__|       ||
||                                                   ||
=====================Ready to rock!=====================`);
                return this;
            });
        });
    }

    /**
     * Retrieve a component by its unique name.
     * @public
     * @param {String} componentName The name of the component to retrieve.
     * @returns {AudioComponent} The component with the specified name (if available).
     */
    findComponent(componentName) {
        const component = this.components.find((component) => component.componentName === componentName);

        if(!component){
            throw Error(`No component found with name '${componentName}. Did you (or your theme) forget to register it?`);
        }

        return component;
    }

    /**
     * Retrieve the player component (if available).
     * @public
     * @returns {AudioComponent} The audio player.
     */
    get player() { return this.findComponent("AudioPlayer"); }

    /**
     * Retrieve the playlist component (if available).
     * @public
     * @returns {AudioComponent} The playlist.
     */
    get playlist() { return this.findComponent("PlaylistManager"); }
    
    /**
     * Retrieve the equalizer component (if available).
     * @public
     * @returns {AudioComponent} The equalizer.
     */
    get equalizer() { return this.findComponent("Equalizer"); }

    /**
     * Retrieve the theme.
     * @public
     * @returns {AudioComponent} The active theme.
     */
    get theme() { return this.findComponent("Theme"); }

    /**
     * Retrieve the theme manager.
     * @public
     * @returns {ThemeManager} The theme manager.
     */
    get themeManager() { return this.findComponent("ThemeManager"); }
}

module.exports = { Amp };