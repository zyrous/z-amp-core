const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

const JSDOM = require("jsdom");
const dom = new JSDOM.JSDOM();
global.window = dom.window;
global.document = dom.window.document;

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

// System under test.
const { AudioHtmlVisualiser } = require("./audio-html-visualiser");

// Dependencies for mocking.
const { AudioHtmlVisualiserPreferences } = require("./audio-html-visualiser-preferences");
const { AudioComponent } = require("../audio-component");
const { CssMutator } = require("./css-mutator");

describe("Audio HTML Visualiser", function() {
    
    afterEach(() => {
        sandbox.restore();
    });

    it("Constructs correctly with no component name", async() => {
        const component = new AudioHtmlVisualiser();
        expect(component.componentName).to.equal("AudioHtmlVisualiser");
    }),

    it("Constructs correctly with component name", async() => {
        const testPrefs = new AudioHtmlVisualiserPreferences();
        const testName = faker.lorem.word();

        const component = new AudioHtmlVisualiser(testPrefs, testName);

        expect(component.componentName).to.equal(testName);
        expect(component.preferences).to.equal(testPrefs);
    })
});