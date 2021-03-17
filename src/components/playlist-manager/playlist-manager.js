const { PlaylistPreferences } = require("./playlist-preferences");
const { AudioComponent } = require("../audio-component");
const { AudioTrack } = require("../../domain/audio-track");

/**
 * @namespace WebAmp.Components.PlaylistManager
 */

/**
 * Provides an audio component that manages a list of tracks that a user can choose from.
 * Supports playing components by providing tracks to play when none are available or when
 * one completes.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.Components.PlaylistManager
 * @augments AudioComponent
 */
class PlaylistManager extends AudioComponent {

    /**
     * The zero-based index number of the currently selected/playing track.
     * @private
     * @type {Number}
     */
    currentTrackIndex;

    /**
     * Whether or not a track is required but unfulfilled right now.
     * @private
     * @type {Boolean}
     */
    trackRequired = false;

    /**
     * The set of preferences that dictate how this playlist will configure itself and behave.
     * @private
     * @type {PlaylistPreferences}
     */
    preferences;

    /**
     * Construct a new playlist component.
     * @param {PlaylistPreferences} preferences The preferences that will be used to initialise
     * this playlist.
     * @param {String} componentName Optional. The name of the component. Defaults to "PlaylistManager".
     */
    constructor(preferences = new PlaylistPreferences(), componentName = "PlaylistManager") {
        super(componentName);
        this.preferences = preferences;

        // Listen for when tracks end.
        this.addEventListener("trackEnded", this.onNextTrack);
        // Listen for when no tracks are selected (but one is required).
        this.addEventListener("noTrackSelected", this.onTrackRequired);
        // Listen for when tracks are paused.
        this.addEventListener("audioPaused", this.onAudioPaused);
        // Listen for when tracks start playing.
        this.addEventListener("audioPlaying", this.onAudioPlaying);
        // Listen for when autoplay is blocked.
        this.addEventListener("autoPlayBlocked", this.onAutoPlayBlocked);
    }

    /**
     * Load any previously saved state to initialise this playlist with.
     * @protected
     */
    async loadState() {
        await Promise.all([
        this.getValue("tracks", this.preferences.tracks).then((results) => {
            if(results.value) {
                this.tracks = results.value.map((result) => new AudioTrack(result));
                this.raiseEvent("playlistLoaded", this.tracks);
            }
        }).then(() => {
            this.getValue("trackIndex", -1).then((results) => {
                if(this.preferences.tracks.length !== 0) {
                    if(results.value >= this.preferences.tracks.length || results.value < 0) {
                        results.value = this.preferences.tracks.length - 1;
                    }
                    if(this.currentTrackIndex !== results.value) {
                        this.trackIndex = results.value;
                    }
                }
            });
        }),
        this.getValue("loop", this.preferences.loop).then((results) => this.loop = results.value),
        this.getValue("shuffle", this.preferences.shuffle).then((results) => this.shuffle = results.value)
        ]);
    }

    /**
     * Initialise key combinations that this playlist will respond to.
     * @protected
     */
    async initialiseKeys() {
        navigator.mediaSession.setActionHandler("nexttrack", this.onNextTrack);
        navigator.mediaSession.setActionHandler("previoustrack", this.onPreviousTrack);
    }
    
    /**
     * Initialise the graphical UI elements that the user will use to control the playlist.
     * @protected
     */
    async initialiseElements() {
        super.initialiseElements();

        // Track selection controls.
        this.attachElement(this.preferences, "nextTrackElement", "[audio-button-next]", {
            eventName: "click", 
            callback: this.onNextTrack
        });
        this.attachElement(this.preferences, "previousTrackElement", "[audio-button-previous]",{
            eventName: "click",
            callback: this.onPreviousTrack
        });

        // Track order controls.
        this.attachElement(this.preferences, "shuffleElement", "[audio-button-shuffle]", {
            eventName: "click",
            callback: this.onShuffleToggled
        });
        this.attachElement(this.preferences, "loopElement", "[audio-button-loop]", {
            eventName: "click",
            callback: this.onLoopToggled
        });
        
        // Track information controls.
        this.attachElement(this.preferences, "trackNumberLabelElement", "[audio-label-track-number]")
        .then((element) => {
            if(element){
                element.innerHTML = null;
            }
        });
        this.attachElement(this.preferences, "trackNameLabelElement", "[audio-label-track-name]")
        .then((element) => {
            if(element){
                element.innerHTML = null;
            }
        });
        this.attachElement(this.preferences, "artistNameLabelElement", "[audio-label-artist-name]")
        .then((element) => {
            if(element){
                element.innerHTML = null;
            }
        });
        this.attachElement(this.preferences, "trackUrlLabelElement", "[audio-label-track-url]")
        .then((element) => {
            if(element){
                element.innerHTML = null;
            }
        });
        this.attachElement(this.preferences, "pausedInformationElement", "[audio-information-paused]")
        .then((element) => {
            if(element) {
                element.classList.add("not-applicable");
            }
        });
        this.attachElement(this.preferences, "playingInformationElement", "[audio-information-playing]")
        .then((element) => {
            if(element) {
                element.classList.add("not-applicable");
            }
        });

        // Playlist item list.
        this.attachElement(this.preferences, "playlistItemListElement", "[audio-playlist-item-list]");

        // Playlist item template.
        this.attachElement(this.preferences, "playlistItemContainerTemplate", "[audio-playlist-item-template]")
        .then((element) => {
            if(element) {
                element.parentNode.removeChild(element);
            }
        });
    }

    /**
     * Change the currently playing track.
     * @method
     * @public
     * @param {AudioTrack} track The track to change to.
     */
    changeTrack = (track) => {
        var existingTrack = this.preferences.tracks.find((t) => t.equals(new AudioTrack(track)));
        const newTrackIndex = this.preferences.tracks.indexOf(existingTrack);

        if(newTrackIndex !== this.currentTrackIndex) {
            this.trackIndex = newTrackIndex;
            this.raiseEvent("trackChanged", track);
        }
    }

    /**
     * Add a new track to the playlist.
     * @method
     * @public
     * @param {AudioTrack} track The track to add to the playlist.
     * @param {boolean} force Whether to force the addition of the track, even if it exists. Defaults to false.
     */
    addTrack = (track, force = false) => {
        const newTrack = new AudioTrack(track);

        // We need to add the track if
        if(force   // 1. We're forcing it (we don't care), or
        || !this.preferences.tracks.find((t) => t.equals(newTrack))) {    //2. The track isn't in the list.
            this.preferences.tracks.push(newTrack);
            this.addPlaylistElement(track);
            this.storeValue("tracks", this.preferences.tracks);
    
            this.raiseEvent("trackAdded",newTrack);
            this.raiseEvent("playlistUpdated", this.preferences.tracks);
    
            if(this.trackRequired) {
                this.changeTrack(track);
                this.trackRequired = false;
            }
        }
    }

    /**
     * Add an element to the playlist's set of HTML elements. This method is intended
     * for internal use.
     * @private
     * @param {AudioTrack} track The track to add a playlist item for.
     */
    addPlaylistElement(track) {

        if(this.preferences.playlistItemContainerTemplate && this.preferences.playlistItemListElement) {

            // Make a copy of our template node.
            var newNode = this.preferences.playlistItemContainerTemplate.cloneNode(true);

            // Set information for the item.
            if(newNode.querySelector("[audio-playlist-item-artist]")) {
                newNode.querySelector("[audio-playlist-item-artist]").textContent = track.artist;
            }
            if(newNode.querySelector("[audio-playlist-item-title]")) {
                newNode.querySelector("[audio-playlist-item-title]").textContent = track.title;
            }
            if(this.preferences.playlistItemContainerElements.length === this.currentTrackIndex) {
                newNode.classList.add(this.preferences.playlistItemContainerPlayingClass);
            }

            // Listen to clicks so that we can change the track.
            newNode.addEventListener("click", () => this.changeTrack(track));

            // Add the element to the DOM and our array.
            this.preferences.playlistItemListElement.appendChild(newNode);
            this.preferences.playlistItemContainerElements.push(newNode);
        }
    }

    /**
     * Remove an element from the playlist's set of HTML elements. This method is intended
     * for internal use.
     * @private
     * @param {AudioTrack} track The track to remove a playlist item for.
     */
    removePlaylistElement(track) {

        if(this.preferences.playlistItemListElement) {
            const itemToRemove = this.preferences.playlistItemListElement.children[this.preferences.tracks.indexOf(track)];

            if(itemToRemove) {

                // Remove from DOM.
                itemToRemove.parent.removeChild(itemToRemove);

                // Remove from our set of elements.
                this.preferences.playlistItemContainerElements.splice(this.preferences.playlistItemContainerElements.indexOf(itemToRemove), 1);
            }
        }
    }

    /**
     * Remove a track from the playlist.
     * @public
     * @param {Number} trackIndex The zero-based index of the track to remove from the playlist.
     */
    removeTrack(trackIndex) {

        // Get the track.
        const removedTrack = this.preferences.tracks[trackIndex];

        // Remove the element from the DOM.
        this.removePlaylistElement(removedTrack);

        // Remove from our track list.
        this.preferences.tracks.splice(trackIndex,1);

        // Save the new value and publish events.
        this.storeValue("tracks", this.preferences.tracks);
        this.raiseEvent("trackRemoved", removedTrack);
        this.raiseEvent("playlistUpdated", this.preferences.tracks);
    }

    /**
     * Clear this playlist.
     * @method
     * @public
     */
    clear = () => {

        // First, remove the elements.
        if(this.preferences.playlistItemContainerElements) {
            this.preferences.playlistItemContainerElements.map((element) => {
                this.preferences.playlistItemListElement.removeChild(element);
            });
            this.preferences.playlistItemContainerElements.splice(0, this.preferences.playlistItemContainerElements.length);
        }

        // Now reset our array.
        this.tracks = [];

        // Store the value and raise events.
        this.storeValue("tracks", this.preferences.tracks);
        this.raiseEvent("playlistCleared");
        this.raiseEvent("playlistUpdated", this.preferences.tracks);
    }

    /**
     * Change the current value for shuffle mode.
     * @public
     * @param {Boolean} value Whether shuffle should be on or off.
     */
    setShuffle(value) {
        this.shuffle = value;
    }

    /**
     * Change the current value for loop mode.
     * @public
     * @param {Boolean} value Whether loop should be on or off.
     */
    setLoop(value) {
        this.loop = value;
    }

    /**
     * Called when a new track is required.
     * @private
     */
    onTrackRequired =  () => {
        if(this.preferences.tracks && this.preferences.tracks.length === 0) {
            // Track required but we don't have one!
            this.trackRequired = true;
        } else {
            this.changeTrack(this.preferences.tracks[0]);
        }
    }

    /**
     * Called when the next track is required to be played.
     * @private
     */
    onNextTrack = () => {
        const previousTrack = this.currentTrackIndex;

        // Determine the next track based on our shuffle settings.
        var nextTrack;
        if(this.preferences.shuffle) {
            nextTrack = Math.floor(Math.random() * Math.floor(this.preferences.tracks.length));
        } else {
            nextTrack = (this.currentTrackIndex + 1) % this.preferences.tracks.length;
        }
        if(nextTrack === 0 && !this.preferences.shuffle) {
            this.raiseEvent("playlistFinished");
        }
        if(nextTrack !== 0 || this.preferences.loop || this.preferences.shuffle) {
            this.changeTrack(this.preferences.tracks[nextTrack]);
            this.raiseEvent("nextTrackSelected", previousTrack, nextTrack);
        }
    }

    /**
     * Called when the previous track is required to be played.
     * @private
     */
    onPreviousTrack = () => {
        const previousTrack = this.currentTrackIndex;
        const nextTrack = this.currentTrackIndex === 0 ? this.preferences.tracks.length - 1 : this.currentTrackIndex - 1;
        this.changeTrack(this.preferences.tracks[nextTrack]);
        this.raiseEvent("previousTrackSelected", previousTrack, nextTrack);
    }

    /**
     * Called when the shuffle function must be toggled.
     * @private
     */
    onShuffleToggled = () => {
        this.shuffle = !this.preferences.shuffle;
    }

    /**
     * Called when the loop function must be toggled.
     * @private
     */
    onLoopToggled = () => {
        this.loop = !this.preferences.loop;
    }

    /**
     * Called when audio is paused. Ensures that the information elements on the page have
     * the correct classes applied.
     * @private
     */
    onAudioPaused = () => {
        if(this.preferences.pausedInformationElement) {
            // Audio is paused, so the paused information element is now applicable.
            this.preferences.pausedInformationElement.classList.add(this.preferences.informationApplicableClass);
            this.preferences.pausedInformationElement.classList.remove(this.preferences.informationNotApplicableClass);

            if(this.preferences.playingInformationElement) {
                // Playing information is no longer applicable.
                this.preferences.playingInformationElement.classList.add(this.preferences.informationNotApplicableClass);
                this.preferences.playingInformationElement.classList.remove(this.preferences.informationApplicableClass);
            }
        }
    }

    /**
     * Called when audio is playing. Ensures that the information elements on the page have
     * the correct classes applied.
     * @private
     */
    onAudioPlaying = () => {
        if(this.preferences.playingInformationElement) {          
            // Audio is playing, so the playing information is now applicable.  
            this.preferences.playingInformationElement.classList.add(this.preferences.informationApplicableClass);
            this.preferences.playingInformationElement.classList.remove(this.preferences.informationNotApplicableClass);

            if(this.preferences.pausedInformationElement) {
                // Paused information is now applicable.
                this.preferences.pausedInformationElement.classList.add(this.preferences.informationNotApplicableClass);
                this.preferences.pausedInformationElement.classList.remove(this.preferences.informationApplicableClass);
            }
        }
    }

    /**
     * Called when playing audio automatically is blocked by the browser. Ensures that information
     * elements have the correct classes applied.
     * @private
     */
    onAutoPlayBlocked = () => this.onAudioPaused();

    /**
     * Sets a new value for whether shuffle mode should be on or off.
     * @private
     * @param {Boolean} value   Whether to set shuffle on or off.
     */
    set shuffle(value) {
        this.preferences.shuffle = value;
        this.storeValue("shuffle", value);

        // Switch classes on the shuffle toggle element.
        if(this.preferences.shuffleElement) {
            if(value){
                this.preferences.shuffleElement.classList.remove(this.preferences.shuffleFalseClass);
                this.preferences.shuffleElement.classList.add(this.preferences.shuffleTrueClass);
            } else {
                this.preferences.shuffleElement.classList.remove(this.preferences.shuffleTrueClass);
                this.preferences.shuffleElement.classList.add(this.preferences.shuffleFalseClass);
            }
        }

        this.raiseEvent("shuffleChanged", value);
    }

    /**
     * Sets a new value for whether loop mode should be on or off.
     * @private
     * @param {Boolean} value   Whether to set loop on or off.
     */
    set loop(value) {
        this.preferences.loop = value;
        this.storeValue("loop", value);

        // Switch classes on the loop toggle element.
        if(this.preferences.loopElement) {
            if(value){
                this.preferences.loopElement.classList.remove(this.preferences.loopFalseClass);
                this.preferences.loopElement.classList.add(this.preferences.loopTrueClass);
            } else {
                this.preferences.loopElement.classList.remove(this.preferences.loopTrueClass);
                this.preferences.loopElement.classList.add(this.preferences.loopFalseClass);
            }
        }

        this.raiseEvent("loopChanged", value);
    }

    /**
     * Set the tracks that this playlist should manage. This method is intended
     * for internal use.
     * @private
     * @param {AudioTrack[]} tracks The set of tracks for this playlist.
     */
    set tracks(tracks) {
        this.preferences.tracks = tracks;

        // Add elements for each track.
        for(const track of tracks) {
            this.addPlaylistElement(track);
        }
    }

    /**
     * Sets a new value for the currently playing/selected track index.
     * @private
     * @param {Number} index The new track index value.
     */
    set trackIndex(index) {
        if(this.preferences.tracks.length === 0) {
            throw Error("Cannot set track index; no tracks have been added to the playlist yet.");
        }
        else if(index < 0) {
            throw Error("Track index set incorrectly. Track index must be zero or greater.");
        }

        if(index >= this.preferences.tracks.length) {
            // The previous index is greater than the number of tracks we have. Set it to
            // the last one.
            index = this.preferences.tracks.length - 1;
        }
        const track = this.preferences.tracks[parseInt(index, 10)];
        
        // Set all of the information elements.
        if(this.preferences.trackNumberLabelElement) {
            this.preferences.trackNumberLabelElement.textContent = index + 1;
        }
        if(this.preferences.trackNameLabelElement) {
            this.preferences.trackNameLabelElement.textContent = track.title;
        }
        if(this.preferences.artistNameLabelElement) {
            this.preferences.artistNameLabelElement.textContent = track.artist;
        }
        if(this.preferences.trackUrlLabelElement) {
            this.preferences.trackUrlLabelElement.textContent = track.url;
        }

        // Set the class of the playlist items.
        if(this.preferences.playlistItemContainerElements[parseInt(this.currentTrackIndex, 10)]) {
            this.preferences.playlistItemContainerElements[parseInt(this.currentTrackIndex, 10)].classList.remove(this.preferences.playlistItemContainerPlayingClass);
        }
        if(this.preferences.playlistItemContainerElements[parseInt(index, 10)]) {
            this.preferences.playlistItemContainerElements[parseInt(index, 10)].classList.add(this.preferences.playlistItemContainerPlayingClass);
        }

        this.currentTrackIndex = index;

        // Set the class of the right element.
        this.storeValue("trackIndex", index);

        // Raise the event.
        this.raiseEvent("trackIndexChanged", index);
    }
    
    /**
     * Gets the current set of preferences for this playlist element.
     * @public
     * @returns {PlaylistPreferences}
     */
    get preferences() {
        return this.preferences;
    }

    /**
     * Gets the set of tracks that this playlist element is tracking.
     * @public
     * @returns {AudioTrack[]}
     */
    get tracks() {
        return this.preferences.tracks;
    }
}

module.exports = { PlaylistManager };