const {StorageProvider} = require("./storage-provider");
const {StorageRetrievalResult} = require("./storage-retrieval-result");

/**
 * The null storage provider stores nothing. Instead it responds to each
 * call to retrieve a value with the default that is supplied to it. Use
 * this provider if you want WebAmp interactions to be short-lived, i.e.
 * for the duration of a single page load only.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Storage
 * @augments StorageProvider
 */
class NullStorageProvider extends StorageProvider {

    /**
     * Construct a new null storage provider.
     */
    constructor(){
        super();
    }

    /**
     * Get the unique name of this provider.
     * @public
     * @method
     */
    static getName = () => "null";

    /**
     * Store a new value (or update an existing one).
     * @public
     * @param {String} name The key to use to store the value.
     * @param {any} value The value to store (can be an object or a simple value).
     * @returns {any} The value that was stored.
     */
    storeValue = async() => Promise.resolve();

    /**
     * Retrieve a value based on its name from the storage repository.
     * @public
     * @param {String} name The name of the value to retrieve.
     * @param {any} defaultValue The value to return if one cannot be found.
     * @param {...any} args Any arguments to return along with the value.
     * @returns {StorageRetrievalResult} The result of the retrieval attempt.
     */
    getValue = async(name, defaultValue, ...args) => Promise.resolve({ value: defaultValue, args: args });

    /**
     * Determine whether or not this storage provider is available in the
     * current context.
     * @public
     * @returns {Boolean}
     */
    isAvailable = () => true;
}

module.exports = { NullStorageProvider };