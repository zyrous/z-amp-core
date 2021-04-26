const { expect } = require("chai");

// System under test.
const {SeekPreferences} = require("./seek-preferences");

describe("Seek Preferences", function() {
    it("Initialises with correct defaults", async() => {
        const prefs = new SeekPreferences();
        
        expect(prefs.seekForwardTime).to.equal(20);
        expect(prefs.seekBackwardTime).to.equal(10);
    })
})