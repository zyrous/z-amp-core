const { expect } = require("chai");
const faker = require("faker");

// System under test.
const {FadePreferences} = require("./fade-preferences");

describe("Fade Preferences", function() {
    it("Initialises with correct defaults", async() => {
        const prefs = new FadePreferences();
        
        expect(prefs.fade).to.be.true;
        expect(prefs.duration).to.equal(300);
        expect(prefs.stepCount).to.equal(10);
    }),

    it("Persists custom prefrences correctly", async() => {
        const testDuration = faker.random.number();
        const testStepCount = faker.random.number();
        const testFade = faker.random.boolean();

        const prefs = new FadePreferences();
        prefs.fade = testFade;
        prefs.duration = testDuration;
        prefs.stepCount = testStepCount;

        expect(prefs.fade).to.equal(testFade);
        expect(prefs.duration).to.equal(testDuration);
        expect(prefs.stepCount).to.equal(testStepCount);
    })
});