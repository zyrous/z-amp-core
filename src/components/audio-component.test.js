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
        var testName = faker.lorem.word();

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
            name: faker.lorem.word()
        };

        var component = new AudioComponent();
        component.handleEvent("storageProviderChanged", "Default", testProvider);

        expect(component.storageProvider).to.equal(testProvider);
    }),

    it("Fails to set storage provider when empty", async() => {
        var component = new AudioComponent();
        expect(() => component.setStorageProvider()).to.throw();
    }),

    it("Stores values correctly with provider", async() => {
        const testValueName = faker.lorem.word();
        const testValue = faker.random.uuid();
        const mockStorageProvider = sandbox.mock(StorageProvider.prototype);
        mockStorageProvider.expects("storeValue")
        .withExactArgs(`Default-${testValueName}`, testValue)
        .resolves(testValue);

        var component = new AudioComponent();
        component.storageProvider = new StorageProvider();
        const returnValue = await component.storeValue(testValueName, testValue);

        expect(returnValue).to.equal(testValue);
        mockStorageProvider.verify();
    }),

    it("Retrieves values correctly from provider", async() => {
        const testValueName = faker.lorem.word();
        const testValue = faker.random.uuid();
        const testDefaultValue = faker.random.uuid();
        const testArgs = { id: faker.random.uuid() };
        const mockStorageProvider = sandbox.mock(StorageProvider.prototype);
        mockStorageProvider.expects("getValue")
        .withExactArgs(`Default-${testValueName}`, testDefaultValue, [testArgs])
        .resolves(testValue);

        var component = new AudioComponent();
        component.storageProvider = new StorageProvider();
        const returnValue = await component.getValue(testValueName, testDefaultValue, testArgs);

        expect(returnValue).to.equal(testValue);
        mockStorageProvider.verify();
    }),

    it("Adds new event handlers successfully for first time", async() => {
        const testCallback = sandbox.stub();
        const testEventName = faker.lorem.word();

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback);

        expect(component.eventListeners.has(testEventName)).to.be.true;
        expect(component.eventListeners.get(testEventName)[0]).to.equal(testCallback);
    }),

    it("Adds new event handlers successfully multiple times", async() => {
        const testCallback1 = sandbox.stub();
        const testCallback2 = sandbox.stub();
        const testEventName = faker.lorem.word();

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback1);
        component.addEventListener(testEventName, testCallback2);

        expect(component.eventListeners.has(testEventName)).to.be.true;
        expect(component.eventListeners.get(testEventName).indexOf(testCallback1)).to.be.greaterThanOrEqual(0);
        expect(component.eventListeners.get(testEventName).indexOf(testCallback2)).to.be.greaterThanOrEqual(0);
    }),

    it("Responds to new event successfully", async() => {
        const testCallback = sandbox.stub();
        const testEventName = faker.lorem.word();
        const testArgs = { id: faker.random.uuid() };

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback);
        component.handleEvent(testEventName, "Default", testArgs);

        expect(testCallback.calledWith(testArgs)).to.be.true;
    }),

    it("Ignores new event for different pipeline", async() => {
        const testCallback = sandbox.stub();
        const testEventName = faker.lorem.word();
        const testArgs = { id: faker.random.uuid() };

        var component = new AudioComponent();
        component.addEventListener(testEventName, testCallback);
        component.handleEvent(testEventName, faker.lorem.word(), testArgs);

        expect(testCallback.calledWith(testArgs)).to.be.false;
    }),

    it("Succeeds when event not handled", async() => {
        var component = new AudioComponent();
        component.handleEvent(faker.lorem.word());
    }),

    it("Attaches DOM element successfully when it exists with no listeners", async() => {
        var testElementName = faker.lorem.word();
        var testElement = document.createElement(testElementName);
        var testSelector = faker.lorem.word();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelector").withArgs(testSelector).returns(testElement);

        var component = new AudioComponent();
        var result = await component.attachElement(testParentObject, testElementName, testSelector);

        expect(result).to.equal(testElement);
        expect(testParentObject[testElementName]).to.equal(testElement);
    }),

    it("Attaches DOM element successfully when it exists multiple times", async() => {
        var testPropertyName = faker.lorem.word();
        var testElementName1 = faker.lorem.word();
        var testElementName2 = faker.lorem.word();
        var testElement1 = document.createElement(testElementName1);
        var testElement2 = document.createElement(testElementName2);
        var testSelector1 = faker.lorem.word();
        var testSelector2 = faker.lorem.word();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelector").withArgs(testSelector1).returns(testElement1);
        mockDocument.expects("querySelector").withArgs(testSelector2).returns(testElement2);

        var component = new AudioComponent();
        var result = await component.attachElement(testParentObject, testPropertyName, testSelector1);
        expect(result).to.equal(testElement1);
        expect(testParentObject[testPropertyName]).to.equal(testElement1);

        // Make sure that next time we try with the same element name, the original property isn't
        // overwritten.
        result = await component.attachElement(testParentObject, testPropertyName, testSelector2);
        expect(result).to.equal(testElement1);
        expect(testParentObject[testPropertyName]).to.equal(testElement1);
    }),

    it("Attaches DOM element successfully when it exists with listeners", async() => {
        var testElementName = faker.lorem.word();
        var testElement = document.createElement(testElementName);
        var testSelector = faker.lorem.word();
        var testParentObject = {};
        var testEventName = faker.lorem.word();
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
        var testElementName = faker.lorem.word();
        var testSelector = faker.lorem.word();
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
        var testElementName = faker.lorem.word();
        var testElements = [document.createElement(testElementName), document.createElement(testElementName)];
        var testSelector = faker.lorem.word();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelectorAll").withArgs(testSelector).returns(testElements);

        var component = new AudioComponent();
        var result = await component.attachMultipleElements(testParentObject, testElementName, testSelector);

        expect(result.indexOf(testElements[0])).to.be.gte(0);
        expect(result.indexOf(testElements[1])).to.be.gte(0);
        mockDocument.verify();
    });

    it("Attaches multiple DOM elements successfully multiple when they exist", async() => {
        var testPropertyName = faker.lorem.word();
        var testElementName1 = faker.lorem.word();
        var testElementName2 = faker.lorem.word();
        var testElements1 = [document.createElement(testElementName1), document.createElement(testElementName1)];
        var testElements2 = [document.createElement(testElementName2), document.createElement(testElementName2)];
        var testSelector1 = faker.lorem.word();
        var testSelector2 = faker.lorem.word();
        var testParentObject = {};
        var mockDocument = sandbox.mock(document);
        mockDocument.expects("querySelectorAll").withArgs(testSelector1).returns(testElements1);
        mockDocument.expects("querySelectorAll").withArgs(testSelector2).returns(testElements2);

        var component = new AudioComponent();
        var result = await component.attachMultipleElements(testParentObject, testPropertyName, testSelector1);

        expect(testParentObject[testPropertyName].indexOf(testElements1[0])).to.be.greaterThanOrEqual(0);
        expect(testParentObject[testPropertyName].indexOf(testElements1[1])).to.be.greaterThanOrEqual(0);
        expect(result.indexOf(testElements1[0])).to.be.gte(0);
        expect(result.indexOf(testElements1[1])).to.be.gte(0);

        result = await component.attachMultipleElements(testParentObject, testPropertyName, testSelector2);
        expect(testParentObject[testPropertyName].indexOf(testElements1[0])).to.be.greaterThanOrEqual(0);
        expect(testParentObject[testPropertyName].indexOf(testElements1[1])).to.be.greaterThanOrEqual(0);
        expect(result.indexOf(testElements1[0])).to.be.gte(0);
        expect(result.indexOf(testElements1[1])).to.be.gte(0);
    }),

    it("Adds to channel successfully when not null", async() => {
        const testChannel = faker.lorem.word();

        var component = new AudioComponent();
        component.addToChannel(testChannel);

        expect(component.channel).to.equal(testChannel);
    }),

    it("Overrides channel when supplied for second time", async() => {
        const testChannel = faker.lorem.word();

        var component = new AudioComponent();
        component.addToChannel(faker.lorem.word());
        component.addToChannel(testChannel);

        expect(component.channel).to.equal(testChannel);
    }),

    it("Fails to add to channel when channel is empty", async() => {
        var component = new AudioComponent();
        expect(() => component.addToChannel()).to.throw();
    }),

    it("Tests for channel correctly when not null", async() => {
        const testChannel = faker.lorem.word();

        var component = new AudioComponent();
        component.channel = testChannel;

        expect(component.belongsToChannel(testChannel)).to.be.true;
        expect(component.belongsToChannel(faker.lorem.word())).to.be.false;
    }),

    it("Attaches to root element when non-null", async() => {
        const testRootElement = { id: faker.random.uuid() };

        var component = new AudioComponent();
        component.attachToRootElement(testRootElement);

        expect(component.rootElement).to.equal(testRootElement);
    }),

    it("Fails to attach to root element when null", async() => {
        var component = new AudioComponent();
        expect(() => component.attachToRootElement()).to.throw();
    }),

    it("Fails to attach to root element when already attached", async() => {
        var testRootElement = { id: faker.random.uuid() };

        var component = new AudioComponent();
        component.attachToRootElement(testRootElement);

        expect(() => component.attachToRootElement({ id: faker.random.uuid() })).to.throw();
    })
});