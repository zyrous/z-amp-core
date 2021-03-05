const crypto = require("crypto");

/**
 * @namespace Domain
 */

/**
 * Represents an audio track that a player can play.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof Domain
 */
class AudioTrack {

    /**
     * The URL that the track will be streamed from.
     * @type {String}
     */
    url;

    /**
     * The title of the track.
     * @type {String}
     */
    title = "Unknown";

    /**
     * The creator of the track.
     * @type {String}
     */
    artist = "Unknown";

    /**
     * The hash of this track.
     * @type {String}
     */
    hash;

    /**
     * Create a new audio track for a player to play.
     * @param {Object} object The object to assign to an AudioTrack object.
     */
    constructor(object){
        object && Object.assign(this, object);
        this.calculateHash();
    }

    /**
     * Returns true if the provided track is considered equal to this one.
     * @param {AudioTrack} track The track to compare this one to.
     */
    equals(track) {
        return track.hash === this.hash;
    }

    /**
     * Calculate the hash code for this audio track.
     * @private
     */
    calculateHash() {
        this.hash = crypto.createHash("md5").update(`${this.url}${this.title}${this.artist}`).digest("hex");
    }
}

module.exports = { AudioTrack };