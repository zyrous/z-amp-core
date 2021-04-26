const { PlayerPreferences } = require("./player-preferences");
const { AudioComponent } = require("../audio-component");
const { AudioTrack } = require("../../domain/audio-track");

/**
 * @namespace ZAmp.Components.AudioPlayer
 */

/**
 * A component that allows for playback of audio by the user. The following functions are provided for:
 *  - Play/Pause
 *  - Volume Up/Down/Select
 *  - Seek Forward/Back/Select
 * These functions are bound to both HTML elements with the correct attributes and, where applicable,
 * the media keys of the host OS.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.Components.AudioPlayer
 * @augments AudioComponent
 */
class AudioPlayer extends AudioComponent {

    /**
     * The track that is currently playing.
     * @private
     * @type {AudioTrack}
     */
    _track;

    /**
     * Gets the currently playing track.
     * @public
     * @type {AudioTrack}
     */
    get track() { return this._track; }

    /**
     * Set the currently playing track.
     * @private
     * @param {AudioTrack} track    The track that is currently playing.
     */
    set track(track){
        this._track = track;
        this.storeValue("currentTrack", track);
    }

    /**
     * The track that has been loaded. This is different to the current track when the active
     * track is being changed.
     * @private
     * @type {AudioTrack}
     */
    _loadedTrack;

    /**
     * The current volume level that the player is set to (out of 100).
     * @private
     * @type {Number}
     */
    _volume;

    /**
     * Gets the current volume level that the player is set to (out of 100).
     * @public
     * @type {Number}
     */
    get volume() { return this._volume; }

    /**
     * Sets the volume level. Value should be between 0 and 100.
     * @public
     * @param {Number} level   The volume level to set.
     */
    set volume(level) {
        this._volume = level;
        this.storeValue("volume", level);
        this.fadeAudioTo(level);
        if(this._preferences.volumeRangeElement) {
            this._preferences.volumeRangeElement.value = level;
        }

        this.raiseEvent("volumeChanged", level);
    }

    /**
     * Whether the player is currently muted.
     * @private
     * @type {Boolean}
     */
    _isMuted;

    /**
     * Gets whether the player is currently muted.
     * @public
     * @type {Boolean}
     */
    get isMuted() { return this._isMuted; }

    /**
     * Set whether the player is currently muted.
     * @private
     * @param {Boolean} muted   Whether or not the player should be muted.
     */
    set isMuted(muted) {
        this._isMuted = muted;
        this.storeValue("isMuted", muted);

        if(muted){
            this.fadeAudioTo(0, 0);
        } else {
            this.fadeAudioTo(this._volume, 0);
        }
        
        if(this._preferences.muteElement) {
            
            // Switch classes on the toggle element.
            if(muted){
                this._preferences.muteElement.classList.remove(this._preferences.unmutedClass);
                this._preferences.muteElement.classList.add(this._preferences.mutedClass);
            } else {
                this._preferences.muteElement.classList.remove(this._preferences.mutedClass);
                this._preferences.muteElement.classList.add(this._preferences.unmutedClass);
            }
        }
    }

    /**
     * The current track position (as a percentage, not seconds) of the current track.
     * @private
     * @type {Number}
     */
    _position;

    /**
     * Gets the current position (as a percentage, not seconds) of the current track.
     * @public
     * @type {Number}
     */
    get position() { return this._position; }

    /**
     * Sets the current position of the player through the current track. Value is a percentage rather
     * than a number of seconds and should be between 0 and 100.
     * @private
     * @param {Number} position The percentage progress to move to in the track.
     */
    set position(position){
        this._position = position;
        this.storeValue("playerPosition", position);
        if(this._preferences.positionRangeElement){
            this._preferences.positionRangeElement.value = this._position;
        }

        // Set the track position.
        if(this._preferences.trackPositionLabelElement){
            this._preferences.trackPositionLabelElement.textContent = this.formatTimeString(this.audioElement.currentTime);
        }

        // Set the track duration.
        if(this._preferences.trackDurationLabelElement) {
            this._preferences.trackDurationLabelElement.textContent = this.formatTimeString(this.audioElement.duration);
        }
        this.raiseEvent("positionChanged", position);
    }

    /**
     * The preferences that dictate how the player will behave to the user.
     * @private
     * @type {PlayerPreferences}
     */
    _preferences;

    /**
     * Get the preferences that control this player.
     * @public
     * @returns {PlayerPreferences} The current set of preferences for the player.
     */
    get preferences() {
        return this._preferences;
    }

    /**
     * Gets the MediaElementAudioSourceNode that the player will use.
     * @private
     * @returns {MediaElementAudioSourceNode} The source node that this player draws a stream from.
     */
    get audioElement() {
        return this._preferences.audioElement;
    }

    /**
     * Whether the player is currently paused.
     * @private
     * @type {Boolean}
     */
    _isPaused;

    /**
     * Gets whether the player is currently paused.
     * @public
     * @type {Boolean}
     */
    get isPaused() { return this._isPaused; }

    /**
     * Set whether the player is currently paused.
     * @private
     * @param {Boolean} paused  Whether or not the player should be paused.
     */
    set isPaused(paused) {

        this._isPaused = paused;
        this.storeValue("isPaused", paused);
        if(this._preferences.playPauseElement) {
            
            // Switch classes on the toggle element.
            if(this._isPaused){
                this._preferences.playPauseElement.classList.remove(this._preferences.playingClass);
                this._preferences.playPauseElement.classList.add(this._preferences.pausedClass);
            } else {
                this._preferences.playPauseElement.classList.remove(this._preferences.pausedClass);
                this._preferences.playPauseElement.classList.add(this._preferences.playingClass);
            }
        }
    }

    /**
     * Set whether the player is currently hidden.
     * @private
     * @param {Boolean} isHidden    Whether the player is hidden.
     */
    set isHidden(isHidden) {
        if(isHidden){
            // If we're now hidden and our preference is to pause on hide (and we're not already
            // paused), fade out and pause.
            if(this._preferences.pauseOnHide && !this._isPaused) {
                this.fadeAudioTo(0);
                this._preferences.audioElement.pause();
            }
        } else {
            // If we're now visible and we prefer to pause on hide (and we weren't paused before),
            // we need to play and fade in now.
            if(this._preferences.pauseOnHide && !this._isPaused) {
                const newVolume = this._isMuted ? 0 : this._volume;
                this._preferences.audioElement.play();
                this.fadeAudioTo(newVolume);
            }
        }

        this.raiseEvent("visibilityChanged", isHidden);
    }
    
    /**
     * Construct a new component for playing audio tracks.
     * @param {PlayerPreferences} prefs The settings that will control how the audio player is
     * configured and behaves.
     * @param {String} componentName The name of this component. Defaults to "AudioPlayer".
     */
    constructor(prefs = new PlayerPreferences(), componentName = "AudioPlayer"){
        super(componentName);
        this._preferences = prefs;

        // Listen to track changes.
        this.addEventListener("trackChanged", (track) => this.play(track));
        // Listen to clicks anywhere on the DOM.
        document.addEventListener("click", this.onDocumentClick);

        // Listen for changes in visibility of the current tab.
        window.onpagehide = () => this.onVisibilityChanged();
        document.onvisibilitychange = () => this.onVisibilityChanged();
    }

    /**
     * Retrieve any existing (saved) state for the audio player from our storage mechanism.
     * @protected
     */
    async loadState() {
        // Currently playing track.
        this.getValue("currentTrack", null).then((results) => this.track = results.value);
        // Current audio volume.
        this.getValue("volume", this._preferences.defaultVolume).then((results) => this.volume = results.value);
        // Whether the player is muted.
        this.getValue("isMuted", false).then((results) => this.isMuted = results.value);
        // The track position.
        this.getValue("playerPosition", 0).then((results) => this.position = results.value);
        // Whether the player is paused.
        this.getValue("isPaused", true).then((results) => {

            this.isPaused = results.value;

            // We need to start playing immediately if:
            if(this.isPaused === false // 1. We are in an un-paused state, or 
            || (this.isPaused === undefined && this._preferences.autoPlay)) {  // 2. We don't have a value set and we are autoplaying.
                this.play();
            } else {
                this.raiseEvent("audioPaused");
            }
        });
    }

    /**
     * Initialise the keys that the player will respond to.
     * @protected
     */
    async initialiseKeys() {
        if(this._preferences.mediaKeys) {
            navigator.mediaSession.setActionHandler("play", this.onPlay);
            navigator.mediaSession.setActionHandler("pause", this.onPause);

            // TODO: figure out how to get media keys for volume working.
        }
    }

    /**
     * Initialise the HTML elements that the player will bind to.
     * @protected
     */
    async initialiseElements() {
        return Promise.all([
            super.initialiseElements(),

            // Audio element (mandatory).
            this.attachElement(this._preferences, "audioElement", "[audio-element]")
            .then((element) => {
                if(!element) {
                    // Create a new audio element. We'll attach it to the parent of
                    // the player.
                    element = document.createElement("audio");
                    this.rootElement.appendChild(element);
                    this._preferences.audioElement = element;
                }

                // Make sure we preload content and that we can handle CORS content.
                element.preload = "auto";
                element.crossOrigin = "anonymous";

                this.raiseEvent("mediaElementLoaded", element);
                
                // Listen for when tracks end.
                this._preferences.audioElement.addEventListener("ended", this.onTrackEnded);
                // Listen for when track position changes.
                this._preferences.audioElement.addEventListener("timeupdate", this.onPositionChanged);
                // Listen for when we determine that we can play through the whole audio without stopping.
                this._preferences.audioElement.addEventListener("canplaythrough", this.onTrackLoaded);
            }),

            // Play controls.
            this.attachElement(this._preferences, "playElement", "[audio-button-play]", {
                eventName: "click",
                callback: this.onPlay
            }),
            this.attachElement(this._preferences, "pauseElement", "[audio-button-pause]", {
                eventName: "click",
                callback: this.onPause
            }),
            this.attachElement(this._preferences, "playPauseElement", "[audio-button-play-pause]", {
                eventName: "click",
                callback: this.onPlayToggled
            }),

            // Track position controls.
            this.attachElement(this._preferences, "seekForwardElement", "[audio-button-seek-forward]", {
                eventName: "click",
                callback: this.onSeekForward
            }),
            this.attachElement(this._preferences, "seekBackwardElement", "[audio-button-seek-backward]", {
                eventName: "click",
                callback: this.onSeekBackward
            }),
            this.attachElement(this._preferences, "positionRangeElement", "[audio-button-position-range]", {
                eventName: "change",
                callback: this.onPositionSelected
            }).then((element) => {
                if(element) {
                    element.min = 0;
                    element.max = 100;
                    element.value = this._position;
                }
            }),

            // Volume controls.
            this.attachElement(this._preferences, "muteElement", "[audio-button-volume-mute]", {
                eventName: "click",
                callback: this.onMute
            }),
            this.attachElement(this._preferences, "volumeUpElement", "[audio-button-volume-up]", {
                eventName: "click",
                callback: this.onVolumeUp
            }),
            this.attachElement(this._preferences, "volumeDownElement", "[audio-button-volume-down]", {
                eventName: "click",
                callback: this.onVolumeDown
            }),
            this.attachElement(this._preferences, "volumeRangeElement", "[audio-button-volume-range]", {
                eventName: "change",
                callback: this.onVolumeSelected
            }).then((element) => {
                if(element){
                    element.min = 0;
                    element.max = 100;
                }
            }),

            // Track information.
            this.attachElement(this._preferences, "trackPositionLabelElement", "[audio-label-track-position]")
            .then((element) => {
                if(element){
                    element.innerHTML = null;
                }
            }),
            this.attachElement(this._preferences, "trackDurationLabelElement", "[audio-label-track-duration]")
            .then((element) => {
                if(element){
                    element.innerHTML = null;
                }
            })
        ]);
    }

    /**
     * Initiate the playing of a specific track. This function uses the provided URL to stream
     * audio, replacing the current track if necessary.
     * @public
     * @method
     * @param {AudioTrack} track The track to play (optional). Defaults to the current track.
     */
    async play(track = this._track) {

        // We only need to do something here if:
        if(track !== this.track // 1. The provided track has changed, or
            || !this.track) {   // 2. We don't have a current track.

            if(!track) {
                this.raiseEvent("noTrackSelected");
                return;
            }

            // Calculate whether we're actually playing now or not (do we have a track?).
            const currentlyPlaying = this._track ? true: false;
            this.track = track;

            // Figure out what the volume should be.
            var newVolume = this.isMuted ? 0 : this.volume;

            if(currentlyPlaying === true) {
                try {
                    // We're already playing, so fade out, change the track and fade back in.
                    await this.fadeAudioTo(0);
                    this.audioElement.src = this.track.url;
                    this.audioElement.play();
                    await this.fadeAudioTo(newVolume);
                } catch(error) {
                    if(error instanceof DOMException) {
                        // We got a DOM exception, meaning that the browser has blocked this action.
                        this.raiseEvent("autoPlayBlocked");
                    } else {
                        return Promise.reject(error);
                    }
                }
            } else {
                try {
                    // We're not playing, so start the track, raise an event and fade in.
                    this.audioElement.src = this.track.url;
                    this.audioElement.play();
                    this.raiseEvent("audioPlaying", this.audioElement.currentTime);
                    await this.fadeAudioTo(newVolume);
                } catch(error) {
                    if(error instanceof DOMException) {
                        // We got a DOM exception, meaning that the browser has blocked this action.
                        this.raiseEvent("autoPlayBlocked");
                    } else {
                        return Promise.reject(error);
                    }
                }
            }
        }
        else if (this.audioElement.paused) {
            try {
                // We're in a paused state, so change the track, set the volume to zero,
                // raise an event and fade in.
                if(!this.audioElement.src) {
                    this.audioElement.src = track.url;                
                }
                newVolume = this.isMuted ? 0 : this.volume;
                this.audioElement.volume = 0;
                this.audioElement.play();
                this.raiseEvent("audioPlaying", track);
                await this.fadeAudioTo(newVolume);
            } catch(error) {
                if(error instanceof DOMException) {
                    // We got a DOM exception, meaning that the browser has blocked this action.
                    this.raiseEvent("autoPlayBlocked");
                } else {
                    return Promise.reject(error);
                }
            }
        }

        // Whatever's happened, we're not paused anymore.
        this.isPaused = false;
    }

    /**
     * Pause whichever track is playing right now.
     * @public
     */
    pause() {
        this.isPaused = true;
        if (!this.audioElement.paused) {

            // We weren't already paused before, so fade out, pause the track and raise an event.
            this.fadeAudioTo(0);
            this.audioElement.pause();
            this.raiseEvent("audioPaused", this.audioElement.currentTime);
        }
    }
    
    /**
     * Adjust the volume to a desired level. This function returns a Promise that resolves when
     * the desired level has been reached.
     * @private
     * @method
     * @param {Number} newVolume The volume level (0 to 100) to fade to.
     * @param {Number} duration The duration, in milliseconds, to fade over.
     */
    fading = false;
    timer = null;
    async fadeAudioTo(newVolume, duration) {

        if(this.fading) {
            // We're already performing a fade operation, so cancel the timer.
            clearInterval(this.timer);
        }

        this.fading = true;

        // If we don't have a duration, just use the default.
        if(!duration) {
            duration = this._preferences.fadePreferences.duration;
        }

        // NOTE: The fade works by adjusting the volume in step increments, rather than continuously
        // over time. We need to figure out how many steps and how long each step should last based
        // on the duration.

        return new Promise((resolve) => {

            // Figure out the difference between the current volume and where we want to be.
            const audioDelta = this.audioElement.volume * 100 - newVolume;

            // Figure out how many steps to use and how much we should change by on each step.
            var stepSize, stepDuration;
            if(this._preferences.fadePreferences.fade === true) {
                stepDuration = this._preferences.fadePreferences.duration / this._preferences.fadePreferences.stepCount;
                stepSize = audioDelta / this._preferences.fadePreferences.stepCount / 100;
            } else {
                stepDuration = 0;
                stepSize = audioDelta;
            }

            // Start firing the logic to adjust volume.
            this.timer = setInterval(() => {
                if(this.audioElement.volume !== newVolume / 100) {

                    // Change the volume by one step (up or down).
                    if(audioDelta < 0) {
                        this.audioElement.volume = Math.min(this.audioElement.volume - stepSize, (newVolume / 100));
                    } else {
                        this.audioElement.volume = Math.max(this.audioElement.volume - stepSize, (newVolume / 100));
                    }

                } else {
                    // We're at the correct value or we're cancelling, so stop the function and return.
                    clearInterval(this.timer);
                    this.fading = false;
                    resolve();
                }
            }, stepDuration);
        });
    }

    /**
     * Format a Number representing a set amount of seconds into hours/minutes/seconds for display.
     * @private
     * @param {Number} seconds The number of seconds to format into a human-readable string.
     */
    formatTimeString(seconds) {
        if(isNaN(seconds)) {
            return "";
        } else {
            return new Date(seconds * 1000).toISOString().substr(11, 8);
        }
    }

    /**
     * Called when the user wishes to begin playback.
     * @private
     */
    onPlay() {
        this.play();
    }

    /**
     * Called when the user wishes to pause playback.
     * @private
     */
    onPause() {
        this.pause();
    }

    /**
     * Called when the user wants to toggle playback.
     * @private
     */
    onPlayToggled() {
        if(!this.isPaused) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Called when the user wishes to mute the volume.
     * @private
     */
    onMute() {
        if(this._isMuted) {
            this.isMuted = false;
            this.raiseEvent("volumeUnmuted", this._volume);
        } else {
            this.isMuted = true;
            this.raiseEvent("volumeMuted");
        }
    }

    /**
     * Called when a new track is loaded.
     * @private
     */
    onTrackLoaded() {
        if(this._loadedTrack !== this._track) {
            // Save the new track.
            this._loadedTrack = this._track;
            // Refresh the current position of the track.
            this.audioElement.currentTime = (this._position / 100) * this.audioElement.duration;
        }
    }

    /**
     * Called when a track has finished playing.
     * @private
     */
    onTrackEnded() {
        this.raiseEvent("trackEnded", this._track);
    }

    /**
     * Called when the user wishes to decrease the volume.
     * @private
     */
    onVolumeDown() {
        this.volume = Math.max(this._volume - 10, 0);
    }

    /**
     * Called when a user wishes to increase the volume.
     * @private
     */
    onVolumeUp() {
        this.volume = Math.min(this._volume + 10, 100);
    }

    /**
     * Called when a user wishes to change the volume to a specific value.
     * @private
     */
    onVolumeSelected() {
        this.volume = this._preferences.volumeRangeElement.value;
    }

    /**
     * Called when the user wishes to change the playing position to a specific value.
     * @private
     */
    onPositionSelected() {
        // Get the position (percentage).
        var rangePosition = this._preferences.positionRangeElement.value;
        // Get the position (seconds).
        var audioPosition = rangePosition === 0 ? 0 : this.audioElement.duration / 100 * rangePosition;

        // Set values.
        this.audioElement.currentTime = audioPosition;
        this.position = rangePosition;

        // Raise event.
        this.raiseEvent("positionSelected", audioPosition);
    }

    /**
     * Called when the user wishes to seek forward on their audio track.
     * @private
     */
    onSeekForward() {
        var audioPosition = Math.min(this.audioElement.duration, this.audioElement.currentTime + this._preferences.seekPreferences.seekForwardTime); 
        var rangePosition = audioPosition / this.audioElement.duration * 100;
        this.audioElement.currentTime = audioPosition;
        this.position = rangePosition;
        this.raiseEvent("seekForward", audioPosition);
    }

    /**
     * Called when the user wishes to seek backward on their audio track.
     * @private
     */
    onSeekBackward() {
        var audioPosition = Math.max(0, this.audioElement.currentTime - this._preferences.seekPreferences.seekBackwardTime);
        var rangePosition = audioPosition === 0 ? 0 : audioPosition / this.audioElement.duration * 100;
        this.audioElement.currentTime = audioPosition;
        this.position = rangePosition;
        this.raiseEvent("seekBackward", audioPosition);
    }

    /**
     * Called when the position on the audio track changes (including from regular playing).
     * @private
     */
    onPositionChanged() {
        var newPosition = this.audioElement.currentTime === 0 ? 0 : 100 /  this.audioElement.duration * this.audioElement.currentTime;
        this.position = newPosition;
    }

    /**
     * Called when the DOM is clicked.
     * @private
     */
    onDocumentClick() {
        // NOTE: This check is to deal with HTML audio policies of browsers. If the user has clicked
        // the document it must have become activated, which means we're allowed to play audio. Check
        // to see if we should be playing (i.e. this._isPaused is false) but the audio element is paused.
        // If that's true, we need to play.
        if(this.audioElement.paused && (this.isPaused === false)) {
            this.play();
        }
    }

    /**
     * Called when the tab that the player is on changes visibility (either visible or hidden).
     * @private
     */
    onVisibilityChanged() {
        this.isHidden = document.hidden;
    }
}

module.exports = { AudioPlayer };