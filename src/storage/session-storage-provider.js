const {StorageProvider} = require("./storage-provider");
const {StorageRetrievalResult} = require("./storage-retrieval-result");

/**
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Storage
 * @augments StorageProvider
 */
class SessionStorageProvider extends StorageProvider {

    /**
     * Construct a new session storage provider.
     */
    constructor(){
        super();
    }

    /**
     * Get the unique name of this provider.
     * @public
     * @method
     */
    static getName = () => "session";

    /**
     * Store a new value (or update an existing one).
     * @public
     * @param {String} name The key to use to store the value.
     * @param {any} value The value to store (can be an object or a simple value).
     * @returns {any} The value that was stored.
     */
    async storeValue(name, value) {
        return new Promise((resolve) => {
            sessionStorage[name] = JSON.stringify(value);
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
    async getValue(name, defaultValue, ...args){
        return new Promise((resolve) => {
            if(sessionStorage[name]
                && localStorage[name] !== "undefined") {
                resolve(new StorageRetrievalResult(
                    JSON.parse(sessionStorage[name]),
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
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
}

module.exports = { SessionStorageProvider };