const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const {AudioHtmlVisualiserPreferences} = require("./audio-html-visualiser-preferences");

describe("Audio HTML Visualiser Preferences", function() {
    it("Should be initialised with correct defaults", async() => {
        const preferences = new AudioHtmlVisualiserPreferences();

        expect(preferences.animationFrameLength).to.equal(17);
        expect(preferences.mutationHtmlAttributeName).to.equal("audio-vis-eq-frequency");
        expect(preferences.frequencyElements.length).to.equal(0);
    }),

    it("Should be initialised correctly with overrides", async() => {
        const testFrameLength = faker.random.number();
        const testHtmlAttributeName = faker.lorem.word();
        const testElements = [faker.lorem.word(), faker.lorem.word()];
        
        const preferences = new AudioHtmlVisualiserPreferences();

        preferences.animationFrameLength = testFrameLength;
        preferences.mutationHtmlAttributeName = testHtmlAttributeName;
        preferences.frequencyElements = testElements;

        expect(preferences.animationFrameLength).to.equal(testFrameLength);
        expect(preferences.mutationHtmlAttributeName).to.equal(testHtmlAttributeName);
        expect(preferences.frequencyElements).to.equal(testElements);
    })
});