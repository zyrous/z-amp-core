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
    }),
    
    it("Handles pipeline creation correctly", async() => {
        const loadStateStub = sandbox.stub(AudioHtmlVisualiser.prototype, "loadState");
        const testContext = { id: faker.random.uuid() };

        const visualiser = new AudioHtmlVisualiser();
        visualiser.handleEvent("audioPipelineCreated", "Default", testContext);

        expect(visualiser._audioContext).to.equal(testContext);
        expect(loadStateStub.calledOnce).to.be.true;
    }),

    it("Initialises elements correctly", async() => {
        const attachStub = sandbox.stub(AudioHtmlVisualiser.prototype, "attachMultipleElements").resolves();
        const loadStateStub = sandbox.stub(AudioHtmlVisualiser.prototype, "loadState");
        const testAttributeName = faker.lorem.word();

        const component = new AudioHtmlVisualiser();
        component._preferences.mutationHtmlAttributeName = testAttributeName;
        await component.initialiseElements();

        expect(attachStub.calledOnceWith(component._preferences, "frequencyElements", `[${testAttributeName}]`)).to.be.true;
        expect(loadStateStub.calledOnce).to.be.true;
    }),

    it("Fails to load state without prerequisites satisfied", async() => {
        const component = new AudioHtmlVisualiser();
        await component.loadState();
    }),

    it("Loads state correctly when elements exist", async() => {
        const testElements = [document.createElement("div"), document.createElement("div")];
        const testCssProperty = faker.lorem.word();
        const testUnitOfMeasure = faker.lorem.word();
        const testLower = faker.random.number();
        const testUpper = faker.random.number();
        testElements[0].setAttribute("mutate", `css(${testCssProperty},${testUnitOfMeasure},${testLower},${testUpper})`);
        const testAnalyser = {
            frequencyBinCount: faker.random.number(10,100)
        };
        const testContext = {
            createAnalyser: () => testAnalyser,
            sampleRate: faker.random.number(5, 500)
        };
        const startStub = sandbox.stub(AudioHtmlVisualiser.prototype, "startAnimation").returns();
        
        const component = new AudioHtmlVisualiser();
        component._preferences.frequencyElements = testElements;
        component._audioContext = testContext;

        await component.loadState();

        // Test that the right number of iterations happened.
        expect(component._distributionStarts.length).to.equal(testElements.length);
        expect(component._distributionEnds.length).to.equal(testElements.length);
        expect(component._distributionLengths.length).to.equal(testElements.length);
        expect(component._mutators.length).to.equal(testElements.length);

        // Test that the mutation parameters were picked up.
        expect(component._mutators[0][0]._cssProperty).to.equal(testCssProperty);
        expect(component._mutators[0][0]._unitOfMeasure).to.equal(testUnitOfMeasure);
        expect(component._mutators[0][0]._lowerValue).to.equal(testLower);
        expect(component._mutators[0][0]._upperValue).to.equal(testUpper);

        expect(startStub.calledOnce).to.be.true;
    }),

    it("Sets flag correctly on stop", async() => {

        const component = new AudioHtmlVisualiser();
        component.stopAnimation();

        expect(component._cancelAnimation).to.be.true;
    }),

    it("Executes animation correctly", async() => {
        const mutatorCount = faker.random.number(100);
        const mutators = [];
        const testElements = [];
        const testDistStarts = [];
        const testDistEnds = [];
        const testDistLengths = [];
        for(var i=0; i<mutatorCount; i++){
            mutators.push([{
                mutate: sandbox.stub()
            }]);
            testElements.push(document.createElement("div"));

            testDistStarts[i] = i;
            testDistEnds[i] = i + 1;
            testDistLengths[i] = 1;
        }

        const frequencyValues = [];
        const frequencyCount = faker.random.number(255);
        for(var i=0; i<frequencyCount; i++){
            frequencyValues.push(faker.random.number(255));
        }

        const testAnalyser = {
            getByteFrequencyData: sandbox.stub().returns(frequencyValues)
        };

        const component = new AudioHtmlVisualiser();
        component._mutators = mutators;
        component._frequencyValues = frequencyValues;
        component._analyser = testAnalyser;
        component._distributionStarts = testDistStarts;
        component._distributionEnds = testDistEnds;
        component._distributionLengths = testDistLengths;
        component._preferences.frequencyElements = testElements;
        // We want to make sure it stops after one iteration.
        component._cancelAnimation = true;

        component.startAnimation(() => {
            // Now check that each mutator was called with the right value.
            for(var i=0; i<mutatorCount; i++){
                expect(mutators[i][0].mutate.calledWith(frequencyValues[i] * 100.0 / 256.0)).to.be.true;
            }
        });
    })
});