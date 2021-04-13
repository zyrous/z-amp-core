const {StorageProvider} = require("../storage/storage-provider");
const {LocalStorageProvider} = require("../storage/local-storage-provider");
const {StorageRetrievalResult} = require("../storage/storage-retrieval-result");

/**
 * @namespace ZAmp.Components
 */

/**
 * Provides a base class for all ZAmp components to inherit from.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components
 * @abstract
 */
class AudioComponent {

    /**
     * The set of all event listeners for this component.
     * @private
     * @type {Map}
     */
    _eventListeners = new Map();

    /**
     * The storage provider for this component.
     * @private
     * @type {StroageProvider}
     */
    _storageProvider = new LocalStorageProvider();

    /**
     * The name of this component.
     * @private
     * @type {String}
     */
    _componentName;

    /**
     * Gets the name of this component.
     * @public
     * @type {String}
     */
    get componentName() { return this._componentName };

    /**
     * The channels that this component belongs to. Always includes "Default".
     * @private
     * @type {String}
     */
    _channel = "Default";

    /**
     * The parent element that the component should attach to.
     * @private
     * @type {HtmlElement}
     */
    _rootElement;
    
    /**
     * Construct a new ZAmp component. Each ZAmp component must call this method within
     * its own constructor.
     * @param {String} componentName The name of this component. Names are used to uniquely identify
     * an *instance* of a component.
     */
    constructor(componentName = "Undefined") {
        this._componentName = componentName;
        this.addEventListener("storageProviderChanged", (provider) => this.setStorageProvider(provider));
    }

    /**
     * Initialise elements on the page to allow the user to control this component. Each
     * ZAmp component is expected to implement this method.
     * @protected
     * @abstract
     * @async
     */
    async initialiseElements() {}

    /**
     * Initialise the set of keys and key combinations that will be used to control this
     * component. Each ZAmp component is expected to implement this method.
     * @protected
     * @abstract
     * @async
     */
    async initialiseKeys() {}

    /**
     * Load any previously saved state into this component, using the storage provider. Each 
     * ZAmp component is expected to implement this method.
     * @protected
     * @abstract
     * @async
     */
    async loadState() {}

    /**
     * Initialise this audio component so that it is ready to be used.
     * @method
     * @public
     * @async
     * @returns {Promise<Array>} The promise that, when resolved, indicates that this component
     * has been initialised.
     */
    async initialise() {
        return new Promise((resolve) => {
            this.initialiseElements()
            .then(() => {
                this.loadState()
                .then(() => {
                    this.initialiseKeys();
                    resolve();
                });
            });
        });
    }

    /**
     * Adds a listener for a specific named event. When the event fires,
     * the callback will be invoked.
     * @public
     * @param {string} eventName The name of the event to listen to.
     * @param {function} callback The function to call.
     */
    addEventListener(eventName, callback) {
        if(!this._eventListeners.has(eventName)) {
            this._eventListeners.set(eventName, []);
        }
        this._eventListeners.get(eventName).push(callback);
    }

    /**
     * Raise an event. All handlers attached to the event will be invoked.
     * In addition, an extra event "eventRaised" will be instantiated.
     * @protected
     * @param {string} eventName The name of the event to raise.
     * @param {...any} args Any arguments to pass to the listening function(s).
     */
    raiseEvent(eventName, ...args){
        // Handle the event.
        this.handleEvent(eventName, this._channel, ...args);
        // Raise the "eventRaised" event. This allows parent objects to receive all
        // events and handle them as required (for example bubbling).
        if(eventName !== "eventRaised") {
            this.raiseEvent("eventRaised", eventName, this._channel, ...args);
        }
    }

    /**
     * Handle an event that has been raised.
     * @public
     * @param {string} eventName The name of the event to handle.
     * @param {string} channel The name of the channel that the event was raised on.
     * @param {...any} args Any arguments to pass to event listeners.
     */
    handleEvent(eventName, channel, ...args) {
        if(this._channel === channel
            && this._eventListeners.has(eventName)) {
            // Call each of the listeners that have previously registered.
            this._eventListeners.get(eventName).map((listener) => listener(...args));
        }
    }

    /**
     * Finds an HTML element in the page given a CSS selector and attaches it to a parent object
     * for future use. Also attaches handlers for events, if required.
     * @protected
     * @param {object} parentObject The object to which the found element will be attached.
     * @param {string} elementName The name to give to the element's object when it is attached.
     * @param {string} selector The CSS selector string to use to find the element.
     * @param {...any} eventListeners The set of listeners to attach to the element.
     * @returns {HTMLElement} The HTML element that was attached to.
     */
    async attachElement(parentObject, elementName, selector, ...eventListeners) {

        return new Promise((resolve) => {
            // Check that the object doesn't already exist on the parent. If it does, it's likely
            // been set directly in preferences already.
            if(!parentObject[elementName]){
                parentObject[elementName] = this.getRootElement().querySelector(selector);
            }
            if(parentObject[elementName]){
                // Add each listener to the element.
                eventListeners.map((listener) => parentObject[elementName].addEventListener(listener.eventName, listener.callback));
            }
            resolve(parentObject[elementName]);
        });
    }

    /**
     * Finds all HTML elements in the page given a CSS selector and attaches them to a parent
     * object for future use. Also attaches each one to handlers for events, if required.
     * @protected
     * @param {any} parentObject The object to which the found element will be attached.
     * @param {string} elementName The name to give to the element's object when it is attached.
     * @param {string} selector The CSS selector string to use to find the element.
     * @param  {...any} eventListeners The set of listeners to attach to each found element.
     * @returns {HTMLElement[]} The array of HTML elements that were attached to.
     */
    async attachMultipleElements(parentObject, elementName, selector, ...eventListeners) {
        
        return new Promise((resolve) => {
            // Check that the object doesn't already exist on the parent. If it does, it's likely
            // been set directly in preferences already.
            if(!parentObject[elementName] 
                || parentObject[elementName].length === 0){
                parentObject[elementName] = Array.from(this.getRootElement().querySelectorAll(selector));
            }
            if(parentObject[elementName]){
                // Add each listener to the elements.
                eventListeners.map((listener) => parentObject[elementName].map((element) => element.addEventListener(listener.eventName, listener.callback)));
            }
            resolve(parentObject[elementName]);
        });
    }

    /**
     * Store a value for retrieval later.
     * @protected
     * @param {String} name The name of the value to save.
     * @param {any} value The value to save. Note that the value need not be only a string.
     * @returns {any} The value that was stored.
     */
    async storeValue(name, value) {
        return new Promise((resolve) => {
            this._storageProvider.storeValue(`${this._channel}-${name}`, value);
            resolve(value);
        });
    }

    /**
     * Retrieve a previously stored value.
     * @protected
     * @param {String} name The name of the value to retrieve.
     * @param {any} defaultValue The value to return if nothing can be found.
     * @param  {...any} args Any additional arguments to return along with the value.
     * @returns {StorageRetrievalResult} The result of retrieving the value.
     */
    async getValue(name, defaultValue, ...args) {
        return new Promise((resolve) => {
            resolve(this._storageProvider.getValue(`${this._channel}-${name}`, defaultValue, args));
        });
    }

    /**
     * Determines whether or not this component belongs to a specific channel.
     * @public
     * @method
     * @param {String} channelName The name of the channel to check for.
     * @returns {Boolean} True if the component belongs to the channel; false otherwise.
     */
    belongsToChannel = (channelName) => {
        return this._channel === channelName;
    }

    /**
     * Add this audio component to a specific channel.
     * @public
     * @method
     * @param {String} channelName The name of the channel to add this component to.
     */
    addToChannel = (channelName) => {
        if(!channelName) {
            throw Error("Cannot add an audio component to an empty channel.");
        }

        this._channel = channelName;
    }

    /**
     * Attach this audio component to a root DOM element.
     * @public
     * @method
     * @param {HtmlElement} rootElement The root element to attach this component to.
     */
    attachToRootElement = (rootElement) => {
        if(!rootElement) {
            throw Error("Cannot attach an audio component to an empty root DOM element.");
        }
        if(this._rootElement) {
            throw Error("This audio component is already attached to a DOM element.");
        }

        this._rootElement = rootElement;
    }

    /**
     * Get the root element that this component is attached to.
     * @private
     * @method
     * @returns {HtmlElement} The root element for this component.
     */
    getRootElement = () => {
        if(!this._rootElement) {
            return document;
        } else {
            return this._rootElement;
        }
    }

    /**
     * Set a new type of storage provider for this component.
     * @public
     * @param {StorageProvider} provider The provider to set.
     */
    setStorageProvider(provider) {

        if(!provider){
            // Can't find it.
            throw Error("Cannot set an empty storage provider");
        }
        
        // Save it.
        this._storageProvider = provider;
    }
}

module.exports = { AudioComponent };