const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Dependencies for mocking.
const { AudioComponent } = require("../audio-component");
const { AudioPipelineSegment } = require("./audio-pipeline-segment");

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

// System under test.
const { AudioPipeline } = require("./audio-pipeline");

const JSDOM = require("jsdom");
const simulant = require("jsdom-simulant");

var dom = new JSDOM.JSDOM();
global.window = dom.window;
global.document = dom.window.document;

describe("Audio Pipeline", function() {

    afterEach(() => {
        sandbox.restore();
    });

    function initialiseHtml(html) {
        var dom = new JSDOM.JSDOM(html);
        global.window = dom.window;
        global.document = dom.window.document;
    }

    it("Constructs pipeline correctly without component name", async() => {
        const pipeline = new AudioPipeline();

        expect(pipeline.componentName).to.equal("AudioPipeline");
        expect(pipeline._eventListeners.has("mediaElementLoaded")).to.be.true;
        expect(pipeline._eventListeners.has("audioPipelineSegmentCreated")).to.be.true;
    }),
    
    it("Resumes audio on document click", async() => {
        initialiseHtml(`<!DOCTYPE html><p>Hello world</p>`);

        const testContext = {
            state: "paused",
            resume: sandbox.stub().returns()
        };

        const pipeline = new AudioPipeline();
        pipeline._audioContext = testContext;

        simulant.fire(document, "click");

        expect(testContext.resume.calledOnce).to.be.true;
    }),
    
    it("Resumes audio on document child click", async() => {
        initialiseHtml(`<!DOCTYPE html><p>Hello world</p>`);

        const testContext = {
            state: "paused",
            resume: sandbox.stub()
        };

        const pipeline = new AudioPipeline();
        pipeline._audioContext = testContext;

        simulant.fire(document.getElementsByTagName("p")[0], "click");

        expect(testContext.resume.calledOnce).to.be.true;
    }),

    it("Doesn't resume audio that is already running", async() => {
        initialiseHtml(`<!DOCTYPE html><p>Hello world</p>`);

        const testContext = {
            state: "running",
            resume: sandbox.stub()
        };

        const pipeline = new AudioPipeline();
        pipeline._audioContext = testContext;

        simulant.fire(document.getElementsByTagName("p")[0], "click");

        expect(testContext.resume.calledOnce).to.be.false;
    }),

    it("Sets audio element and loads state correctly", async() => {
        const loadStateStub = sandbox.stub(AudioPipeline.prototype, "loadState");
        const testElement = { id: faker.random.uuid() };

        const pipeline = new AudioPipeline();
        pipeline.audioElement = testElement;

        expect(pipeline._audioElement).to.equal(testElement);
        expect(loadStateStub.calledOnce).to.be.true;
    }),

    it("Fails to load state without audio element", async() => {
        const pipeline = new AudioPipeline();
        await pipeline.loadState();
        expect(pipeline._pipelineInitialised).to.be.false;
    }),

    it("Loads state correctly with existing audio element", async() => {
        initialiseHtml(`<!DOCTYPE html><audio></audio>`);
        const audioElement = document.getElementsByTagName("audio")[0];

        const testAudioSource = {
            connect: sandbox.stub()
        };

        const testAudioContext = {
            destination: {
                id: faker.random.uuid()
            },
            createMediaElementSource: sandbox.stub().returns(testAudioSource)
        };

        const eventCallback = sandbox.stub();

        global.AudioContext = sandbox.stub().returns(testAudioContext);

        const pipeline = new AudioPipeline();
        pipeline._audioElement = audioElement;

        pipeline.addEventListener("audioPipelineCreated", eventCallback);

        await pipeline.loadState();

        expect(pipeline._pipelineInitialised).to.be.true;
        expect(testAudioContext.createMediaElementSource.calledOnceWith(audioElement)).to.be.true;
        expect(testAudioSource.connect.calledOnceWith(testAudioContext.destination)).to.be.true;
        expect(pipeline._pipelineSegments.length).to.equal(2);
        expect(pipeline._pipelineSegments[0]._firstNode).to.equal(testAudioSource);
        expect(pipeline._pipelineSegments[0]._lastNode).to.equal(testAudioSource);
        expect(pipeline._pipelineSegments[1]._firstNode).to.equal(testAudioContext.destination);
        expect(pipeline._pipelineSegments[1]._lastNode).to.equal(testAudioContext.destination);
        expect(eventCallback.calledOnceWith(testAudioContext)).to.be.true;
    }),

    it("Fails to insert new segment without existing segments", async() => {
        const pipeline = new AudioPipeline();
        expect(() => pipeline.onPipelineSegmentCreated({ id: faker.random.uuid() })).to.throw();
    }),

    it("Inserts new pipeline segment correctly with single node", async() => {
        const testFirstNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testLastNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testNewNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };

        const testFirstSegment = new AudioPipelineSegment(testFirstNode, testFirstNode, 0);
        const testLastSegment = new AudioPipelineSegment(testLastNode, testLastNode, 100);

        const pipeline = new AudioPipeline();
        pipeline._pipelineSegments = [testFirstSegment, testLastSegment];

        pipeline.onPipelineSegmentCreated(testNewNode);

        expect(pipeline._pipelineSegments.length).to.equal(3);
        expect(pipeline._pipelineSegments[1].firstNode).to.equal(testNewNode);
        expect(pipeline._pipelineSegments[1].lastNode).to.equal(testNewNode);
        expect(pipeline._pipelineSegments[1].weighting).to.equal(50);
        expect(testFirstNode.disconnect.calledOnceWith(testLastNode)).to.be.true;
        expect(testFirstNode.connect.calledOnceWith(testNewNode)).to.be.true;
        expect(testNewNode.connect.calledOnceWith(testLastNode)).to.be.true;
    }),

    it("Inserts new pipeline segment correctly with multiple node", async() => {
        const testFirstNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testLastNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testNewFirstNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testNewLastNode = {
            connect: sandbox.stub(),
            disconnect: sandbox.stub()
        };
        const testWeighting = faker.random.number({min:1,max:99});

        const testFirstSegment = new AudioPipelineSegment(testFirstNode, testFirstNode, 0);
        const testLastSegment = new AudioPipelineSegment(testLastNode, testLastNode, 100);

        const pipeline = new AudioPipeline();
        pipeline._pipelineSegments = [testFirstSegment, testLastSegment];

        pipeline.onPipelineSegmentCreated(testNewFirstNode, testNewLastNode, testWeighting);

        expect(pipeline._pipelineSegments.length).to.equal(3);
        expect(pipeline._pipelineSegments[1].firstNode).to.equal(testNewFirstNode);
        expect(pipeline._pipelineSegments[1].lastNode).to.equal(testNewLastNode);
        expect(pipeline._pipelineSegments[1].weighting).to.equal(testWeighting);
        expect(testFirstNode.disconnect.calledOnceWith(testLastNode)).to.be.true;
        expect(testFirstNode.connect.calledOnceWith(testNewFirstNode)).to.be.true;
        expect(testNewLastNode.connect.calledOnceWith(testLastNode)).to.be.true;
    });
});