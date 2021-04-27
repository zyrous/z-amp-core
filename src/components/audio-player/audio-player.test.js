const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Dependencies for mocking.
const { PlayerPreferences } = require("./player-preferences");
const { AudioComponent } = require("../audio-component");
const { AudioTrack } = require("../../domain/audio-track");

// System under test.
const { AudioPlayer } = require("./audio-player");

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

// Browser simulation.
const JSDOM = require("jsdom");
const simulant = require("jsdom-simulant");

var dom = new JSDOM.JSDOM();
global.window = dom.window;
global.document = dom.window.document;

class DOMException {}
global.DOMException = DOMException;

describe("Audio Player", function() {
    afterEach(() => {
        sandbox.restore();
    });

    function initialiseHtml(html) {
        var dom = new JSDOM.JSDOM(html);
        global.window = dom.window;
        global.document = dom.window.document;
    }

    it("Constructs correctly without overrides", async() => {
        const player = new AudioPlayer();

        expect(player.componentName).to.equal("AudioPlayer");
        expect(player.preferences).to.not.be.undefined;
        expect(player._eventListeners.get("trackChanged")).to.not.be.undefined;
        expect(window.onpagehide).to.not.be.undefined;
        expect(document.onvisibilitychange).to.not.be.undefined;
    }),

    it("Constructs correctly with overrides", async() => {
        const componentName = faker.lorem.word();
        const prefs = { id: faker.random.uuid() };

        const player = new AudioPlayer(prefs, componentName);
        expect(player.componentName).to.equal(componentName);
        expect(player.preferences).to.equal(prefs);
    }),

    it("Loads state correctly when values don't exist", async() => {
        const player = new AudioPlayer();

        // Make sure the stub just returns what it's provided with.
        sandbox.stub(AudioComponent.prototype, "getValue")
        .callsFake(function(name, defaultValue) { 
            return Promise.resolve({value:defaultValue});
        });

        // Make sure storing values doesn't cause an error.
        sandbox.stub(AudioComponent.prototype, "storeValue");

        // Make sure fading doesn't cause an error.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        await player.loadState();

        expect(player.track).to.be.null;
        expect(player.volume).to.equal(player.preferences.defaultVolume);
        expect(player.isMuted).to.be.false;
        expect(player.position).to.equal(0);
        expect(player.isPaused).to.be.true;
    }),

    it("Loads state correctly when values do exist", async() => {
        
        const player = new AudioPlayer();

        const getValueStub = sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        const storeValueStub = sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        const testTrack = new AudioTrack();
        getValueStub.withArgs("currentTrack").resolves({value:testTrack});
        const testVolume = faker.random.number({max:100});
        getValueStub.withArgs("volume").resolves({value:testVolume});
        const testMuted = faker.random.boolean();
        getValueStub.withArgs("isMuted").resolves({value:testMuted});
        const testPosition = faker.random.number({max:100});
        getValueStub.withArgs("playerPosition").resolves({value:testPosition});
        const testPaused = faker.random.boolean();
        getValueStub.withArgs("isPaused").resolves({value:true});
        
        // Make sure fading doesn't cause an error.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        await player.loadState();

        expect(getValueStub.calledWith("currentTrack", null)).to.be.true;
        expect(player.track).to.equal(testTrack);
        expect(getValueStub.calledWith("volume")).to.be.true;
        expect(player.volume).to.equal(testVolume);
        expect(getValueStub.calledWith("isMuted")).to.be.true;
        expect(player.isMuted).to.equal(testMuted);
        expect(getValueStub.calledWith("playerPosition")).to.be.true;
        expect(player.position).to.equal(testPosition);
        expect(getValueStub.calledWith("isPaused")).to.be.true;
        expect(player.isPaused).to.be.true;
    }),

    it("Raises paused even on state load when paused is true", async() => {
        const getValueStub = sandbox.stub(AudioComponent.prototype, "getValue").resolves({value:null});
        getValueStub.withArgs("isPaused").resolves({value:true});
        sandbox.stub(AudioComponent.prototype, "storeValue");
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        const eventHandler = sandbox.stub();

        const player = new AudioPlayer();
        player.addEventListener("audioPaused", eventHandler);

        await player.loadState();

        expect(player.isPaused).to.be.true;
        expect(eventHandler.calledOnce).to.be.true;
    }),

    it("Plays immediately on state load when required", async() => {
        // Return false for paused.
        const getValueStub = sandbox.stub(AudioComponent.prototype, "getValue").resolves({value:null});
        getValueStub.withArgs("isPaused").resolves({value:false});
        sandbox.stub(AudioComponent.prototype, "storeValue");
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        const playStub = sandbox.stub(AudioPlayer.prototype, "play").resolves();

        const player = new AudioPlayer();
        await player.loadState();

        expect(player.isPaused).to.be.false;
        expect(playStub.calledOnce);
    }),

    it("Attaches to correct keys when preference set", async() => {
        const testNavigator = {
            mediaSession: {
                setActionHandler: sandbox.stub()
            }
        };
        global.navigator = testNavigator;

        const player = new AudioPlayer();
        player.preferences.mediaKeys = true;
        await player.initialiseKeys();

        expect(testNavigator.mediaSession.setActionHandler.calledOnceWith("play", player.onPlay));
        expect(testNavigator.mediaSession.setActionHandler.calledOnceWith("pause", player.onPause));
    }),

    it("Doesn't attach to correct keys when preference not set", async() => {
        const testNavigator = {
            mediaSession: {
                setActionHandler: sandbox.stub()
            }
        };
        global.navigator = testNavigator;

        const player = new AudioPlayer();
        player.preferences.mediaKeys = false;
        await player.initialiseKeys();

        expect(testNavigator.mediaSession.setActionHandler.calledOnceWith("play", player.onPlay)).to.be.false;
        expect(testNavigator.mediaSession.setActionHandler.calledOnceWith("pause", player.onPause)).to.be.false;
    }),

    it("Initialises correctly when no audio element exists", async() => {
        const player = new AudioPlayer();
        const loadedHandler = sandbox.stub();
        player.addEventListener("mediaElementLoaded", loadedHandler);
        player.attachToRootElement(document.body);

        await player.initialiseElements();

        expect(loadedHandler.calledOnceWith(player.preferences.audioElement));
        expect(player.preferences.audioElement.preload).to.equal("auto");
        expect(player.preferences.audioElement.crossOrigin).to.equal("anonymous");
    }),

    it("Initialises correctly when audio element exists", async() => {
        initialiseHtml(`<!DOCTYPE html><audio id="test-audio" audio-element></audio>`);

        const player = new AudioPlayer();
        await player.initialiseElements();
        expect(player.preferences.audioElement).to.equal(document.getElementById("test-audio"));
    }),

    it("Initialises play controls correctly when they exist", async() => {
        initialiseHtml(`
        <input type="button" id="test-play-button" audio-button-play></input>
        <input type="button" id="test-pause-button" audio-button-pause></input>
        <input type="button" id="test-play-pause-button" audio-button-play-pause></input>
        `);

        const player = new AudioPlayer();
        player.attachToRootElement(document.body);
        await player.initialiseElements();

        expect(player.preferences.playElement).to.equal(document.getElementById("test-play-button"));
        expect(player.preferences.pauseElement).to.equal(document.getElementById("test-pause-button"));
        expect(player.preferences.playPauseElement).to.equal(document.getElementById("test-play-pause-button"));
    }),

    it("Initialises position controls correctly when they exist", async() => {
        initialiseHtml(`
        <input type="button" id="test-seek-forward" audio-button-seek-forward></input>
        <input type="button" id="test-seek-backward" audio-button-seek-backward></input>
        <input type="range" id="test-position-range" audio-button-position-range></input>
        `);

        const player = new AudioPlayer();
        player.attachToRootElement(document.body);
        await player.initialiseElements();

        expect(player.preferences.seekForwardElement).to.equal(document.getElementById("test-seek-forward"));
        expect(player.preferences.seekBackwardElement).to.equal(document.getElementById("test-seek-backward"));
        expect(player.preferences.positionRangeElement).to.equal(document.getElementById("test-position-range"));
        expect(document.getElementById("test-position-range").min).to.equal("0");
        expect(document.getElementById("test-position-range").max).to.equal("100");
        expect(document.getElementById("test-position-range").value).to.equal("50");
    }),

    it("Initialises volume controls correctly when they exist", async() => {
        initialiseHtml(`
        <input type="button" id="test-mute" audio-button-volume-mute>
        <input type="button" id="test-volume-up" audio-button-volume-up>
        <input type="button" id="test-volume-down" audio-button-volume-down>
        <input type="range" id="test-volume-range" audio-button-volume-range>
        `);

        const player = new AudioPlayer();
        player.attachToRootElement(document.body);
        await player.initialiseElements();

        expect(player.preferences.muteElement).to.equal(document.getElementById("test-mute"));
        expect(player.preferences.volumeUpElement).to.equal(document.getElementById("test-volume-up"));
        expect(player.preferences.volumeDownElement).to.equal(document.getElementById("test-volume-down"));
        expect(player.preferences.volumeRangeElement).to.equal(document.getElementById("test-volume-range"));
        expect(player.preferences.volumeRangeElement.min).to.equal("0");
        expect(player.preferences.volumeRangeElement.max).to.equal("100");        
    }),

    it("Initialises track information controls correctly when they exist", async() => {
        initialiseHtml(`
        <label id="test-position" audio-label-track-position></label>
        <label id="test-duration" audio-label-track-duration></label>
        `);

        const player = new AudioPlayer();
        player.attachToRootElement(document.body);
        await player.initialiseElements();

        expect(player.preferences.trackPositionLabelElement).to.equal(document.getElementById("test-position"));
        expect(player.preferences.trackPositionLabelElement.innerHTML).to.be.empty;
        expect(player.preferences.trackDurationLabelElement).to.equal(document.getElementById("test-duration"));
        expect(player.preferences.trackDurationLabelElement.innerHTML).to.be.empty;
    }),

    it("Fails to play track when empty track supplied", async() => {
        const testEventHandler = sandbox.stub();
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();

        const player = new AudioPlayer();
        player._rootElement = document.body;
        player.addEventListener("noTrackSelected", testEventHandler);
        await player.play();

        expect(testEventHandler.calledOnce).to.be.true;
    }),

    it("Raises event on play when not currently playing when autoplay is blocked", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().throws(new DOMException())
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        await player.play(testTrack);

        expect(blockedHandler.calledOnce).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Throws error on play when not currently playing when audio playing fails", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().throws(new Error())
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        expect(player.play(testTrack)).to.eventually.throw();

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Correctly plays track when not currently playing with valid track", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().resolves()
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        await player.play(testTrack);

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.calledOnce).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Raises event on play when currently playing when autoplay is blocked", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().throws(new DOMException())
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        player._track = {};
        await player.play(testTrack);

        expect(blockedHandler.calledOnce).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Throws error on play when currently playing when audio playing fails", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().throws(new Error())
        };

        const player = new AudioPlayer();
        player._track = {};
        player.preferences.audioElement = testAudioElement;
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);

        expect(player.play(testTrack)).to.eventually.throw();

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
    }),

    it("Correctly plays track when currently playing with valid track", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            play: sandbox.stub().resolves()
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        player._track = {};
        await player.play(testTrack);

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Raises event on play same track when currently paused when autoplay is blocked", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            paused: true,
            play: sandbox.stub().throws(new DOMException())
        };

        const player = new AudioPlayer();
        player._track = testTrack;
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        await player.play(testTrack);

        expect(blockedHandler.calledOnce).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Throws error on play same track when currently paused when audio playing fails", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            paused: true,
            play: sandbox.stub().throws(new Error())
        };

        const player = new AudioPlayer();
        player._track = testTrack;
        player.preferences.audioElement = testAudioElement;
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);

        expect(player.play(testTrack)).to.eventually.throw();

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.notCalled).to.be.true;
    }),

    it("Correctly plays same track when currently paused with valid track", async() => {
        // Make sure we don't get tripped up by persistence.
        sandbox.stub(AudioComponent.prototype, "getValue").resolves();
        sandbox.stub(AudioComponent.prototype, "storeValue").resolves();
        // Make sure fading works.
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        // Test track to play.
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.lorem.sentence()
        });
        // Handlers to test if blocked and playing events are raised.
        const blockedHandler = sandbox.stub();
        const playingHandler = sandbox.stub();
        // Mock audio element.
        const testAudioElement = {
            src: "",
            paused: true,
            play: sandbox.stub().resolves()
        };

        const player = new AudioPlayer();
        
        player.addEventListener("autoPlayBlocked", blockedHandler);
        player.addEventListener("audioPlaying", playingHandler);
        player.preferences.audioElement = testAudioElement;

        player._track = testTrack;
        await player.play(testTrack);

        expect(blockedHandler.notCalled).to.be.true;
        expect(playingHandler.calledOnce).to.be.true;
        expect(testAudioElement.src).to.equal(testTrack.url);
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Handles pause correctly when already paused", async() => {
        const player = new AudioPlayer();
        player.preferences.audioElement = {
            paused: true
        };

        await player.pause();

        expect(player.isPaused).to.be.true;
    }),

    it("Pauses correctly when not already paused", async() => {
        const pausedStub = sandbox.stub();
        const pauseStub = sandbox.stub();
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        const player = new AudioPlayer();
        player.preferences.audioElement = {
            paused: false,
            pause: pauseStub
        };
        player.addEventListener("audioPaused", pausedStub);

        await player.pause();

        expect(player.isPaused).to.be.true;
        expect(pauseStub.calledOnce).to.be.true;
        expect(pausedStub.calledOnce).to.be.true;
    }),

    it("Sets volume correctly without range element", async() => {
        const fadeStub = sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        const testVolume = faker.random.number({max:100});
        const volumeChangedStub = sandbox.stub();

        const player = new AudioPlayer();
        player.addEventListener("volumeChanged", volumeChangedStub);
        player.volume = testVolume;

        expect(player.volume).to.equal(testVolume);
        expect(volumeChangedStub.calledOnce).to.be.true;
        expect(fadeStub.calledOnceWith(testVolume));
    }),

    it("Sets volume correctly with range element", async() => {
        sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        const testVolume = faker.random.number({max:100});
        const testRangeElement = {
            value: faker.random.number()
        };

        const player = new AudioPlayer();
        player.preferences.volumeRangeElement = testRangeElement;
        player.volume = testVolume;

        expect(player.preferences.volumeRangeElement.value).to.equal(testVolume);
    }),

    it("Mutes correctly with no mute element", async() => {
        const storeStub = sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const fadeStub = sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        const player = new AudioPlayer();
        player.isMuted = true;

        expect(storeStub.calledOnceWith("isMuted", true)).to.be.true;
        expect(fadeStub.calledOnceWith(0, 0)).to.be.true;
    }),

    it("Unmutes correctly with no mute element", async() => {
        const storeStub = sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const fadeStub = sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();

        const player = new AudioPlayer();
        player.isMuted = false;

        expect(storeStub.calledOnceWith("isMuted", false)).to.be.true;
        expect(fadeStub.calledOnceWith(player._volume, 0)).to.be.true;
    }),

    it("Mutes correctly with mute element", async() => {
        const testMuteButton = document.createElement("button");

        const player = new AudioPlayer();
        player._preferences.muteElement = testMuteButton;
        player.isMuted = true;

        expect(testMuteButton.classList.contains(player.preferences.mutedClass)).to.be.true;
    }),

    it("Unmutes correctly with mute element", async() => {
        const testMuteButton = document.createElement("button");

        const player = new AudioPlayer();
        player._preferences.muteElement = testMuteButton;
        player.isMuted = false;

        expect(testMuteButton.classList.contains(player.preferences.unmutedClass)).to.be.true;
    }),

    it("Toggles muted class correctly with mute element", async() => {
        
        const testMuteButton = document.createElement("button");

        const player = new AudioPlayer();
        player._preferences.muteElement = testMuteButton;

        player.isMuted = true;

        expect(testMuteButton.classList.contains(player.preferences.mutedClass)).to.be.true;

        player.isMuted = false;

        expect(testMuteButton.classList.contains(player.preferences.mutedClass)).to.be.false;
        expect(testMuteButton.classList.contains(player.preferences.unmutedClass)).to.be.true;
    }),

    it("Sets position correctly with no elements", async() => {
        const positionChangedStub = sandbox.stub();
        const storeStub = sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const testPosition = faker.random.number();

        const player = new AudioPlayer();
        player.addEventListener("positionChanged", positionChangedStub);
        player.position = testPosition;

        expect(player._position).to.equal(testPosition);
        expect(storeStub.calledOnceWith("playerPosition", testPosition)).to.be.true;
        expect(positionChangedStub.calledOnceWith(testPosition)).to.be.true;
    }),

    it("Sets position correctly with elements", async() => {
        sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const testPosition = faker.random.number({max:100});
        const formatTimeStub = sandbox.stub(AudioPlayer.prototype, "formatTimeString").callsFake((position) => position);

        const positionRangeElement = document.createElement("input");
        const positionLabelElement = document.createElement("label");
        const durationLabelElement = document.createElement("label");
        const testAudioElement = {
            currentTime: faker.random.number(),
            duration: faker.random.number()
        };

        const player = new AudioPlayer();
        player.preferences.positionRangeElement = positionRangeElement;
        player.preferences.trackPositionLabelElement = positionLabelElement;
        player.preferences.trackDurationLabelElement = durationLabelElement;
        player.preferences.audioElement = testAudioElement;
        player.position = testPosition;

        expect(positionRangeElement.value).to.equal(testPosition.toString());
        expect(formatTimeStub.calledOnceWith(testAudioElement.currentTime));
        expect(positionLabelElement.textContent).to.equal(testAudioElement.currentTime.toString());
        expect(formatTimeStub.calledOnceWith(testAudioElement.duration));
        expect(durationLabelElement.textContent).to.equal(testAudioElement.duration.toString());
    }),

    it("Sets paused correctly with no elements", async() => {
        const storeStub = sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const testValue = faker.random.boolean();

        const player = new AudioPlayer();
        player.isPaused = testValue;

        expect(player._isPaused).to.equal(testValue);
        expect(storeStub.calledOnceWith("isPaused", testValue)).to.be.true;
    }),

    it("Sets paused correctly with elements", async() => {
        sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const testElement = document.createElement("button");

        const player = new AudioPlayer();
        player.preferences.playPauseElement = testElement;
        player.isPaused = true;

        expect(testElement.classList.contains(player.preferences.pausedClass)).to.be.true;
    }),
    
    it("Sets unpaused correctly with elements", async() => {
        sandbox.stub(AudioComponent.prototype, "storeValue").returns();
        const testElement = document.createElement("button");

        const player = new AudioPlayer();
        player.preferences.playPauseElement = testElement;
        player.isPaused = false;

        expect(testElement.classList.contains(player.preferences.playingClass)).to.be.true;
    }),

    it("Sets hidden properly when not pausing on hide", async() => {
        const visibilityChangedStub = sandbox.stub();
        
        const player = new AudioPlayer();
        player._preferences.pauseOnHide = false;
        player.addEventListener("visibilityChanged", visibilityChangedStub);
        player.isHidden = true;

        expect(visibilityChangedStub.calledOnceWith(true)).to.be.true;
    }),

    it("Sets hidden properly when pausing on hide", async() => {
        const fadeStub = sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        const testAudioElement = {
            pause: sandbox.stub()
        };

        const player = new AudioPlayer();
        player._preferences.pauseOnHide = true;
        player._preferences.audioElement = testAudioElement;
        player._isPaused = false;
        player.isHidden = true;

        expect(fadeStub.calledOnceWith(0)).to.be.true;
        expect(testAudioElement.pause.calledOnce).to.be.true;
    }),

    it("Sets visible properly when not pausing on hide", async() => {
        const visibilityChangedStub = sandbox.stub();
        
        const player = new AudioPlayer();
        player._preferences.pauseOnHide = false;
        player.addEventListener("visibilityChanged", visibilityChangedStub);
        player.isHidden = false;

        expect(visibilityChangedStub.calledOnceWith(false)).to.be.true;
    }),

    it("Sets hidden properly when not pausing on hide", async() => {
        const fadeStub = sandbox.stub(AudioPlayer.prototype, "fadeAudioTo").resolves();
        const testAudioElement = {
            play: sandbox.stub()
        };

        const player = new AudioPlayer();
        player._preferences.pauseOnHide = true;
        player._preferences.audioElement = testAudioElement;
        player._isPaused = false;
        player.isHidden = false;

        expect(fadeStub.calledOnceWith(player.volume)).to.be.true;
        expect(testAudioElement.play.calledOnce).to.be.true;
    }),

    it("Fades up to correct volume with default duration", async() => {
        const testAudioElement = {
            volume: 0
        };
        const testNewVolume = faker.random.number({max:100,min:1});

        const player = new AudioPlayer();
        player.preferences.audioElement = testAudioElement;

        await player.fadeAudioTo(testNewVolume);

        expect(testAudioElement.volume).to.equal(testNewVolume / 100);
    }),

    it("Fades up to correct volume with non-default duration", async() => {
        const testAudioElement = {
            volume: 0
        };
        const testNewVolume = faker.random.number({max:100,min:1});

        const player = new AudioPlayer();
        player.preferences.audioElement = testAudioElement;

        await player.fadeAudioTo(testNewVolume, faker.random.number({max:500,min:1}));

        expect(testAudioElement.volume).to.equal(testNewVolume / 100);
    }),

    it("Fades up to correct volume with no fading", async() => {
        const testAudioElement = {
            volume: 0
        };
        const testNewVolume = faker.random.number({max:100,min:1});

        const player = new AudioPlayer();
        player.preferences.audioElement = testAudioElement;
        player.preferences.fadePreferences.fade = false;

        await player.fadeAudioTo(testNewVolume);

        expect(testAudioElement.volume).to.equal(testNewVolume / 100);
    }),

    it("Fades down to correct volume with default duration", async() => {
        const testAudioElement = {
            volume: faker.random.number({max:100,min:50})
        };
        const testNewVolume = faker.random.number({max:49,min:1});

        const player = new AudioPlayer();
        player.preferences.audioElement = testAudioElement;
        player.preferences.fadePreferences.fade = false;

        await player.fadeAudioTo(testNewVolume);

        expect(testAudioElement.volume).to.equal(testNewVolume / 100);
    }),

    it("Formats time correctly with incorrect argument", async() => {
        const player = new AudioPlayer();
        expect(player.formatTimeString("test")).to.equal("");
    }),

    it("Formats time string correctly with correct argument", async() => {
        const testSeconds = faker.random.number();
        const expectedDate = new Date(testSeconds * 1000).toISOString().substr(11,8);

        const player = new AudioPlayer();
        expect(player.formatTimeString(testSeconds)).to.equal(expectedDate);
    }),

    it("Handles play event correctly", async() => {
        const playStub = sandbox.stub(AudioPlayer.prototype, "play");

        const player = new AudioPlayer();
        player.onPlay();

        expect(playStub.calledOnce).to.be.true;
    }),

    it("Handles pause event correctly", async() => {
        const pauseStub = sandbox.stub(AudioPlayer.prototype, "pause");

        const player = new AudioPlayer();
        player.onPause();

        expect(pauseStub.calledOnce).to.be.true;
    }),

    it("Handles play toggle event correctly", async() => {
        const pauseStub = sandbox.stub(AudioPlayer.prototype, "pause");
        const playStub = sandbox.stub(AudioPlayer.prototype, "play");

        const player = new AudioPlayer();
        player._isPaused = true;
        player.onPlayToggled();
        expect(playStub.calledOnce).to.be.true;

        player._isPaused = false;
        player.onPlayToggled();
        expect(pauseStub.calledOnce).to.be.true;
    }),

    it("Handles mute toggle event correctly", async() => {
        sandbox.stub(AudioPlayer.prototype, "isMuted");
        const mutedHandler = sandbox.stub();
        const unMutedHandler = sandbox.stub();

        const player = new AudioPlayer();
        player.addEventListener("volumeMuted", mutedHandler);
        player.addEventListener("volumeUnmuted", unMutedHandler);

        player._isMuted = true;
        player.onMute();
        expect(unMutedHandler.calledOnceWith(player._volume)).to.be.true;

        player._isMuted = false;
        player.onMute();
        expect(mutedHandler.calledOnce).to.be.true;
    }),

    it("Handles track loaded event correctly with same track", async() => {
        const testTrack = {
            id: faker.random.uuid()
        };

        const player = new AudioPlayer();
        player._loadedTrack = testTrack;
        player._track = testTrack;
        player.onTrackLoaded();
    }),

    it("Handles track loaded event correctly with different track", async() => {
        const testLoadedTrack = { id: faker.random.uuid() };
        const testTrack = { id: faker.random.uuid() };

        const testAudioElement = {
            currentTime: 0,
            duration: faker.random.number()
        };
        const testPosition = faker.random.number();

        const player = new AudioPlayer();
        player._loadedTrack = testLoadedTrack;
        player._track = testTrack;
        player._position = testPosition;
        player.preferences.audioElement = testAudioElement;
        player.onTrackLoaded();

        expect(player._loadedTrack).to.equal(testTrack);
        expect(testAudioElement.currentTime).to.equal(testPosition/100 * testAudioElement.duration);
    }),

    it("Handles track ended event correctly", async() => {
        const testTrack = { id: faker.random.uuid() };
        const testHandler = sandbox.stub();

        const player = new AudioPlayer();
        player.addEventListener("trackEnded", testHandler);
        player._track = testTrack;
        player.onTrackEnded();

        expect(testHandler.calledOnceWith(testTrack)).to.be.true;
    }),

    it("Handles volume down event correctly", async() => {
        const testVolume = faker.random.number({max:100});

        const player = new AudioPlayer();
        player._volume = testVolume;
        player.onVolumeDown();

        expect(player.volume).to.equal(Math.max(testVolume - 10, 0));
    }),

    it("Handles volume up event correctly", async() => {
        const testVolume = faker.random.number({max:100});

        const player = new AudioPlayer();
        player._volume = testVolume;
        player.onVolumeUp();

        expect(player.volume).to.equal(Math.min(testVolume + 10, 100));
    }),

    it("Handles volume selected event correctly", async() => {
        const rangeElement = {
            value: faker.random.number()
        };

        const player = new AudioPlayer();
        player.preferences.volumeRangeElement = rangeElement;
        player.onVolumeSelected();

        expect(player.volume).to.equal(rangeElement.value);
    }),

    it("Handles position selected event correctly", async() => {
        const rangeElement = {
            value: faker.random.number({max:100})
        };
        const audioElement = {
            duration: faker.random.number(),
            currentTime: 0
        };
        const expectedPosition = audioElement.duration / 100 * rangeElement.value;
        const positionSelectedStub = sandbox.stub();

        const player = new AudioPlayer();
        player.addEventListener("positionSelected", positionSelectedStub);
        player.preferences.positionRangeElement = rangeElement;
        player.preferences.audioElement = audioElement;
        player.onPositionSelected();

        expect(audioElement.currentTime).to.equal(expectedPosition);
        expect(positionSelectedStub.calledOnceWith(expectedPosition));
    }),

    it("Seeks forward correctly out of range of track end", async() => {
        const player = new AudioPlayer();

        const audioElement = {
            duration: faker.random.number({min: player.preferences.seekPreferences.seekForwardTime}),
            currentTime: faker.random.number({max: player.preferences.seekPreferences.seekForwardTime})
        };
        const expectedPosition = audioElement.currentTime + player.preferences.seekPreferences.seekForwardTime;
        const seekHandler = sandbox.stub();

        player.preferences.audioElement = audioElement;
        player.addEventListener("seekForward", seekHandler);
        player.onSeekForward();

        expect(audioElement.currentTime).to.equal(expectedPosition);
        expect(seekHandler.calledOnceWith(expectedPosition));
    }),

    it("Seeks forward correctly in range of track end", async() => {
        const player = new AudioPlayer();
        const testDuration = faker.random.number({min: player.preferences.seekPreferences.seekForwardTime});

        const audioElement = {
            duration: testDuration,
            currentTime: testDuration - faker.random.number({max: player.preferences.seekPreferences.seekForwardTime})
        };
        const seekHandler = sandbox.stub();

        player.preferences.audioElement = audioElement;
        player.addEventListener("seekForward", seekHandler);
        player.onSeekForward();

        expect(audioElement.currentTime).to.equal(testDuration);
        expect(seekHandler.calledOnceWith(testDuration));
    }),

    it("Seeks backward correctly out of range of track start", async() => {
        const player = new AudioPlayer();

        const audioElement = {
            currentTime: faker.random.number({min: player.preferences.seekPreferences.seekBackwardTime})
        };
        const expectedPosition = audioElement.currentTime - player.preferences.seekPreferences.seekBackwardTime;
        const seekHandler = sandbox.stub();

        player.preferences.audioElement = audioElement;
        player.addEventListener("seekBackward", seekHandler);
        player.onSeekBackward();

        expect(audioElement.currentTime).to.equal(expectedPosition);
        expect(seekHandler.calledOnceWith(expectedPosition));
    }),

    it("Seeks backward correctly in range of track start", async() => {
        const player = new AudioPlayer();

        const audioElement = {
            currentTime: faker.random.number({max: player.preferences.seekPreferences.seekBackwardTime})
        };
        const seekHandler = sandbox.stub();

        player.preferences.audioElement = audioElement;
        player.addEventListener("seekBackward", seekHandler);
        player.onSeekBackward();

        expect(audioElement.currentTime).to.equal(0);
        expect(seekHandler.calledOnceWith(0));
    }),

    it("Handles position changed event correctly", async() => {
        const audioElement = {
            duration: faker.random.number({min:1000}),
            currentTime: faker.random.number({max:1000})
        };

        const player = new AudioPlayer();
        player.preferences.audioElement = audioElement;
        player.onPositionChanged();

        if(audioElement.currentTime === 0) {
            expect(player.position).to.equal(0);
        } else {
            expect(player.position).to.equal(100 / audioElement.duration * audioElement.currentTime);
        }
    }),

    it("Handles document click correctly when not paused", async() => {
        const audioElement = {
            paused: false
        };
        const playStub = sandbox.stub(AudioPlayer.prototype, "play").returns();
        const player = new AudioPlayer();
        player._isPaused = true;
        player.preferences.audioElement = audioElement;

        player.onDocumentClick();

        expect(playStub.notCalled).to.be.true;
    }),

    it("Handles document click correctly when should be playing", async() => {
        const audioElement = {
            paused: true
        };
        const playStub = sandbox.stub(AudioPlayer.prototype, "play").returns();
        const player = new AudioPlayer();
        player._isPaused = false;
        player.preferences.audioElement = audioElement;

        player.onDocumentClick();

        expect(playStub.calledOnce).to.be.true;
    })
});