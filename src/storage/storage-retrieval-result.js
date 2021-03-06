/**
 * The result of an attempt to retrieve a value from a storage provider.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Storage
 */
class StorageRetrievalResult {

    /**
     * The value that was retrieved.
     * @public
     * @type {any}
     */
    value;

    /**
     * Any additional arguments.
     * @public
     * @type {any[]}
     */
    args;

    /**
     * Create a new storage retrieval result.
     * @param {any} value The value that was retrieved.
     * @param {any[]} args Any additional arguments.
     */
    constructor(value, args) {
        this.value = value;
        this.args = args;
    }
}

module.exports = { StorageRetrievalResult };