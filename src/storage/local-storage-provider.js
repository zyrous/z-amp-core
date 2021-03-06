const {StorageProvider} = require("./storage-provider");
const {StorageRetrievalResult} = require("./storage-retrieval-result");

/**
 * A provider that uses the browser's local storage to save and retrieve values.
 * Local storage is persistent between sessions, so use this provider type if you
 * want things like play position, EQ settings etc to return to their original
 * values when the user comes back to your site. Not that this also persists
 * across all pages in the same domain, so if you have multiple pages with a
 * player, they will share the same values.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Storage
 * @augments StorageProvider
 */
class LocalStorageProvider extends StorageProvider {

    /**
     * Construct a new local storage provider.
     */
    constructor(){
        super();
    }

    /**
     * Get the unique name of this provider.
     * @method
     * @public
     */
    static getName = () => "local";

    /**
     * Store a new value (or update an existing one).
     * @public
     * @param {String} name The key to use to store the value.
     * @param {any} value The value to store (can be an object or a simple value).
     * @returns {any} The value that was stored.
     */
    async storeValue(name, value) {
        return new Promise((resolve) => {
            localStorage.setItem(name, JSON.stringify(value));
            resolve(value);
        });
    }

    /**
     * Retrieve a value based on its name from the storage repository.
     * @public
     * @param {String} name The name of the value to retrieve.
     * @param {any} defaultValue The value to return if one cannot be found.
     * @param {...any} args Any arguments to return along with the value.
     * @returns {StorageRetrievalResult} The result of the retrieval attempt.
     */
    async getValue(name, defaultValue, args){
        return new Promise((resolve) => {
            if(localStorage[name]
                && localStorage[name] !== "undefined") {
                resolve(new StorageRetrievalResult(
                    JSON.parse(localStorage[name]),
                    args
                ));
            } else {
                resolve(new StorageRetrievalResult(
                    defaultValue,
                    args
                ));
            }
        })
    }

    /**
     * Determine whether or not this storage provider is available in the
     * current context.
     * @public
     * @returns {Boolean}
     */
    isAvailable() {

        // The way we test this is simplistic. We simply try to store and retrieve
        // a value; if that works, we know the provider will function.
        var test = "test";
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
}

module.exports = { LocalStorageProvider };