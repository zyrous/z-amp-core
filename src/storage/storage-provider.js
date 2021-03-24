const {StorageRetrievalResult} = require("./storage-retrieval-result");

/**
 * Classes in the Storage namespace provide the means of storing and retrieving
 * values to support the execution of logic in different components.
 * @namespace ZAmp.Storage
 */

/**
 * Provides a base (abstract) class for different types of providers that
 * offer storage capability to audio components.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Storage
 * @abstract
 */
class StorageProvider {

    /**
     * Gets the name of this type of storage provider.
     * @public
     * @abstract
     * @method
     * @returns {String}
     */
    static getName() {}

    /**
     * Store a name-value pair of information.
     * @public
     * @abstract
     * @param {String} name The name of the value to store.
     * @param {any} value The string value to store. Note that any type
     * of object is accepted, not only strings.
     */
    async storeValue(name, value) {}

    /**
     * Retrieve a value based on its name from the storage repository.
     * @public
     * @abstract
     * @param {String} name The name of the value to retrieve.
     * @param {any} defaultValue The value to return if one cannot be found.
     * @param {...any} args Any arguments to return along with the value.
     * @returns {StorageRetrievalResult} The result of the retrieval attempt.
     */
    async getValue(name, defaultValue, ...args) {}

    /**
     * Determine whether or not this storage provider is available in the
     * current context.
     * @public
     * @abstract
     * @returns {Boolean}
     */
    isAvailable() {}
}

module.exports = { StorageProvider };