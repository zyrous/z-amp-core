const {StorageProvider} = require("../storage/storage-provider");
const {LocalStorageProvider} = require("../storage/local-storage-provider");
const {StorageProviderFactory} = require("../storage/storage-provider-factory");
const {StorageRetrievalResult} = require("../storage/storage-retrieval-result");

/**
 * @namespace WebAmp.Components
 */

/**
 * Provides a base class for all WebAmp components to inherit from.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components
 * @abstract
 */
class AudioComponent {

    /**
     * The set of all event listeners for this component.
     * @private
     * @type {Map}
     */
    eventListeners = new Map();

    /**
     * The storage provider for this component.
     * @private
     * @type {StroageProvider}
     */
    storageProvider = new LocalStorageProvider();

    /**
     * The name of this component.
     * @public
     * @type {String}
     */
    componentName;
    
    /**
     * Construct a new WebAmp component. Each WebAmp component must call this method within
     * its own constructor.
     * @param {String} componentName The name of this component. Names are used to uniquely identify
     * an *instance* of a component.
     */
    constructor(componentName = "Undefined") {
        this.componentName = componentName;
        this.addEventListener("storageProviderChanged", this.onStorageProviderChanged);
    }

    /**
     * Initialise elements on the page to allow the user to control this component. Each
     * WebAmp component is expected to implement this method.
     * @protected
     * @abstract
     * @async
     */
    async initialiseElements() {}

    /**
     * Initialise the set of keys and key combinations that will be used to control this
     * component. Each WebAmp component is expected to implement this method.
     * @protected
     * @abstract
     * @async
     */
    async initialiseKeys() {}

    /**
     * Load any previously saved state into this component, using the storage provider. Each 
     * WebAmp component is expected to implement this method.
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
            })
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
        if(!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName).push(callback);
    }

    /**
     * Raise an event. All handlers attached to the event will be invoked.
     * In addition, an extra event "eventRaised" will be instantiated.
     * @protected
     * @param {string} eventName The name of the event to raise.
     * @param  {...any} args Any arguments to pass to the listening function(s).
     */
    raiseEvent(eventName, ...args){
        // Handle the event.
        this.handleEvent(eventName, ...args);
        // Raise the "eventRaised" event. This allows parent objects to receive all
        // events and handle them as required (for example bubbling).
        if(eventName !== "eventRaised") {
            this.raiseEvent("eventRaised", eventName, ...args);
        }
    }

    /**
     * Handle an event that has been raised.
     * @public
     * @param {string} eventName The name of the event to handle.
     * @param  {...any} args Any arguments to pass to event listeners.
     */
    handleEvent(eventName, ...args) {
        if(this.eventListeners.has(eventName)) {
            // Call each of the listeners that have previously registered.
            this.eventListeners.get(eventName).map((listener) => listener(...args));
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
                parentObject[elementName] = document.querySelector(selector);
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
            if(!parentObject[elementName]){
                parentObject[elementName] = Array.from(document.querySelectorAll(selector));
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
            this.storageProvider.storeValue(name, value);
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
            resolve(this.storageProvider.getValue(name, defaultValue, args));
        });
    }

    /**
     * Set a new type of storage provider for this component.
     * @public
     * @param {String} providerName The name of the storage provider to set.
     */
    async setStorageProvider(providerName) {
        // Get the provider.
        const provider = new StorageProviderFactory().createProvider(providerName);
        // Raise an event so all other components set the same provider.
        this.raiseEvent("storageProviderChanged", provider);
    }
    
    /**
     * Called when a new storage provider is selected for WebAmp.
     * @private
     * @param {StorageProvider} storageProvider The storage provider that was selected.
     */
    onStorageProviderChanged = (storageProvider) => {
        this.storageProvider = storageProvider;
    }
}

module.exports = { AudioComponent };