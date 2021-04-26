const { expect } = require("chai");
const faker = require("faker");

// System under test.
const {PlayerPreferences} = require("./player-preferences");

describe("Player Preferences", function() {
    it("Initialises with correct defaults", async() => {
        const prefs = new PlayerPreferences();

        expect(prefs.autoPlay).to.be.false;
        expect(prefs.pauseOnHide).to.be.true;
        expect(prefs.defaultVolume).to.equal(70);
        expect(prefs.mediaKeys).to.be.true;

        expect(prefs.audioElement).to.be.undefined;
        expect(prefs.playElement).to.be.undefined;
        expect(prefs.pauseElement).to.be.undefined;
        expect(prefs.playPauseElement).to.be.undefined;

        expect(prefs.playingClass).to.equal("playing");
        expect(prefs.pausedClass).to.equal("paused");

        expect(prefs.positionRangeElement).to.be.undefined;
        expect(prefs.seekForwardElement).to.be.undefined;
        expect(prefs.seekBackwardElement).to.be.undefined;
        expect(prefs.muteElement).to.be.undefined;

        expect(prefs.mutedClass).to.equal("muted");
        expect(prefs.unmutedClass).to.equal("un-muted");

        expect(prefs.volumeUpElement).to.be.undefined;
        expect(prefs.volumeDownElement).to.be.undefined;
        expect(prefs.volumeRangeElement).to.be.undefined;
        expect(prefs.trackPositionLabelElement).to.be.undefined;
        expect(prefs.trackDurationLabelElement).to.be.undefined;

        expect(prefs.fadePreferences).to.not.be.undefined;
        expect(prefs.seekPreferences).to.not.be.undefined;
    })
});