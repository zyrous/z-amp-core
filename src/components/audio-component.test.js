const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

const JSDOM = require("jsdom");
const dom = new JSDOM.JSDOM();
global.window = dom.window;
global.document = dom.window.document;

// The class under test.
const {AudioComponent} = require("./audio-component");

// Dependencies for mocking.
const {StorageProvider} = require("../storage/storage-provider");
const {StorageProviderFactory} = require("../storage/storage-provider-factory");

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

describe("Audio Component", function() {

    afterEach(() => {
        sandbox.restore();
    });

    it("Constructs correctly with no component name", async() => {
        var component = new AudioComponent();
        expect(component.componentName).to.equal("Undefined");
    }),

    it("Constructs correctly with custom name", async() => {
        var testName = faker.hacker.noun();

        var component = new AudioComponent(testName);
        expect(component.componentName).to.equal(testName);
    }),

    it("Initialises by calling all sub-functions", async() => {
        const elementsStub = sandbox.stub(AudioComponent.prototype, "initialiseElements").resolves();
        const keysStub = sandbox.stub(AudioComponent.prototype, "initialiseKeys").resolves();
        const stateStub = sandbox.stub(AudioComponent.prototype, "loadState").resolves();

        var component = new AudioComponent();
        await component.initialise();

        expect(elementsStub.calledOnce).to.be.true;
        expect(keysStub.calledOnce).to.be.true;
        expect(stateStub.calledOnce).to.be.true;
    }),

    it("Resets storage provider when change received", async() => {
        var testProvider = {
            name: faker.hacker.noun()
        };

        var component = new AudioComponent();
        component.handleEvent("storageProviderChanged", testProvider);

        expect(component.storageProvider).to.equal(testProvider);
    }),

    it("Sets storage provider by name", async() => {
        const testStorageProvider = { id: faker.random.uuid() };
        const createProviderStub = sandbox.stub(StorageProviderFactory.prototype, "createProvider")
        .returns(testStorageProvider);
        const testProviderName = faker.hacker.noun();

        var component = new AudioComponent();
        component.setStorageProvider(testProviderName);

        expect(createProviderStub.calledWith(testProviderName)).to.be.true;
        expect(component.storageProvider).to.equal(testStorageProvider);
    }),

    it("Stores values correctly with provider", async() => {
        const testValueName = faker.hacker.noun();
        const testValue = faker.random.uuid();
        const mockStorageProvider = sandbox.mock(StorageProvider.prototype);
        mockStorageProvider.expects("storeValue")
        .withExactArgs(testValueName, testValue)
        .resolves(testValue);

        var component = new AudioComponent();
        component.storageProvider = new StorageProvider();
        const returnValue = await component.storeValue(testValueName, testValue);

        expect(returnValue).to.equal(testValue);
        mockStorageProvider.verify();
    }),

    it("Retrieves values correctly from provider", async() => {
        const testValueName = faker.hacker.noun();
        const testValue = faker.random.uuid();
        const testDefaultValue = faker.random.uuid();
        const testArgs = { id: faker.random.uuid() };
        const mockStorageProvider = sandbox.mock(StorageProvider.prototype);
        mockStorageProvider.expects("getValue")
        .withExactArgs(testValueName, testDefaultValue, [testArgs])
        .resolves(testValue);

        var component = new AudioComponent();
        component.storageProvider = new StorageProvider();
        const returnValue = await component.getValue(testValueName, testDefaultValue, testArgs);

        expect(returnValue).to.equal(testValue);
        mockStorageProvider.verify();
    }),

    it("Adds new event handlers successfully", async() => {
        const testCallback = sandbox.stub();
        const testEventName = faker.hacker.noun();

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback);

        expect(component.eventListeners.has(testEventName)).to.be.true;
        expect(component.eventListeners.get(testEventName)[0]).to.equal(testCallback);
    }),

    it("Responds to new event successfully", async() => {
        const testCallback = sandbox.stub();
        const testEventName = faker.hacker.noun();
        const testArgs = { id: faker.random.uuid() };

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback);
        component.handleEvent(testEventName, testArgs);

        expect(testCallback.calledWith(testArgs)).to.be.true;
    }),

    it("Succeeds when event not handled", async() => {
        var component = new AudioComponent();
        component.handleEvent(faker.hacker.noun());
    }),

    it("Attaches DOM element successfully when it exists with no listeners", async() => {
        var testElementName = faker.hacker.noun();
        var testElement = document.createElement(testElementName);
        var testSelector = faker.hacker.noun();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelector").withArgs(testSelector).returns(testElement);

        var component = new AudioComponent();
        var result = await component.attachElement(testParentObject, testElementName, testSelector);

        expect(result).to.equal(testElement);
        expect(testParentObject[testElementName]).to.equal(testElement);
    }),

    it("Attaches DOM element successfully when it exists with listeners", async() => {
        var testElementName = faker.hacker.noun();
        var testElement = document.createElement(testElementName);
        var testSelector = faker.hacker.noun();
        var testParentObject = {};
        var testEventName = faker.hacker.noun();
        var testCallback = sandbox.stub();
        var testListener = {
            eventName: testEventName,
            callback: testCallback
        };
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelector").withArgs(testSelector).returns(testElement);

        var component = new AudioComponent();
        var result = await component.attachElement(testParentObject, testElementName, testSelector, testListener);

        expect(result).to.equal(testElement);
        expect(testParentObject[testElementName]).to.equal(testElement);
        mockDocument.verify();
    }),

    it("Attaches DOM element successfully when it doesn't exist", async() => {
        var testElementName = faker.hacker.noun();
        var testSelector = faker.hacker.noun();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelector").withArgs(testSelector).returns(null);

        var component = new AudioComponent();
        var result = await component.attachElement(testParentObject, testElementName, testSelector);

        expect(result).to.equal(null);
        expect(testParentObject[testElementName]).to.equal(null);
        mockDocument.verify();
    }),

    it("Attaches multiple DOM elements successfully when they exist", async() => {
        var testElementName = faker.hacker.noun();
        var testElements = [document.createElement(testElementName), document.createElement(testElementName)];
        var testSelector = faker.hacker.noun();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelectorAll").withArgs(testSelector).returns(testElements);

        var component = new AudioComponent();
        var result = await component.attachMultipleElements(testParentObject, testElementName, testSelector);

        expect(result.indexOf(testElements[0])).to.be.gte(0);
        expect(result.indexOf(testElements[1])).to.be.gte(0);
        mockDocument.verify();
    });
});