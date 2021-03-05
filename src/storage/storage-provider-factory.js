const {LocalStorageProvider} = require("./local-storage-provider");
const {SessionStorageProvider} = require("./session-storage-provider");
const {NullStorageProvider} = require("./null-storage-provider");

/**
 * Uses the factory pattern to provide access to different types of storage provider.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Storage
 */
class StorageProviderFactory {

    /**
     * The various types of storage provider that the factory can produce.
     * @private
     * @type {StorageProvider}
     */
    providerTypes = [LocalStorageProvider,SessionStorageProvider,NullStorageProvider];

    /**
     * The default type of storage provider to use if one is not available.
     * @private
     * @type {Type}
     */
    defaultProvider = NullStorageProvider;

    /**
     * Create a new storage provider, given its unique name.
     * @public
     * @param {String} providerName The unique string that identifies a provider to retrieve.
     * @returns {StorageProvider} The new storage provider.
     */
    createProvider(providerName) {
        // Get the first one with the specified name.
        const providerType = this.providerTypes.find((type) => type.getName() === providerName);

        if(providerType){
            // Create the provider.
            const provider = new providerType();
            if(provider.isAvailable()) {
                return provider;
            } else {
                // Provider can't be used in this context.
                return new this.defaultProvider();
            }
        } else {
            // No match.
            throw Error(`Cannot find storage provider with name: ${providerName}`);
        }
    }
};

module.exports = { StorageProviderFactory };