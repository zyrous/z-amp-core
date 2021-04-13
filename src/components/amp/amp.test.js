const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Dependencies for testing.
const {Amp} = require("./amp");
const {ThemeManager} = require("../../theme-manager/theme-manager");
const {AudioComponent} = require("../audio-component");
const {StorageProviderFactory} = require("../../storage/storage-provider-factory");
global.console = {
    log: () => {}
}

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

describe("Amp", function() {

    afterEach(() => {
        sandbox.restore();
    });

    it("Constructs a new amp successfully", async() => {
        var amp = new Amp();

        expect(amp).to.not.be.null;
        expect(amp.componentName).to.equal("Amp");
        expect(amp._eventListeners.get("eventRaised")).to.exist;
    }),

    it("Constructs amp from static method", async() => {
        const testSelector = faker.lorem.word();
        const testThemeName = faker.lorem.word();
        const testAmp = new Amp();
        const initialiseStub = sandbox.stub(Amp.prototype, "initialise").returns(testAmp);

        const amp = await Amp.amp(testSelector, testThemeName);

        expect(amp).to.equal(testAmp);
        expect(initialiseStub.calledWith(testSelector, testThemeName)).to.be.true;
    }),

    it("Sets storage provider by name", async() => {
        const testStorageProvider = { id: faker.random.uuid() };
        const createProviderStub = sandbox.stub(StorageProviderFactory.prototype, "createProvider")
        .returns(testStorageProvider);
        const testProviderName = faker.lorem.word();

        var testAmp = new Amp();
        testAmp.setStorageProvider(testProviderName);

        expect(createProviderStub.calledWith(testProviderName)).to.be.true;
        expect(testAmp.storageProvider).to.equal(testStorageProvider);
    }),

    it("Fails to set storage provider when not found", async() => {
        const createProviderStub = sandbox.stub(StorageProviderFactory.prototype, "createProvider")
        .returns(undefined);
        const testProviderName = faker.lorem.word();

        var testAmp = new Amp();
        expect(() => testAmp.setStorageProvider(testProviderName)).to.throw();
    })

    it("Adds new component correctly", async() => {
        const testComponent = sandbox.createStubInstance(AudioComponent);

        const testAmp = new Amp();
        testAmp.addComponent(testComponent);

        expect(testAmp._components.length).to.equal(1);
        expect(testAmp._components[0]).to.equal(testComponent);
        expect(testComponent.addEventListener.calledWith("eventRaised")).to.be.true;
        expect(testComponent.initialise.calledOnce).to.be.true;
    }),

    it("Fails to find component with incorrect name", async() => {
        const amp = new Amp();
        expect(() => amp.findComponent(faker.lorem.word())).to.throw();
    }),

    it("Finds component with correct name", async() => {
        const testComponentName = faker.lorem.word();
        const testComponent = new AudioComponent(testComponentName);
        
        const testAmp = new Amp();
        testAmp.addComponent(testComponent);
        const component = testAmp.findComponent(testComponentName);

        expect(component).to.equal(testComponent);
    }),

    it("Receives events raised by child components correctly", async() => {
        const testEvent = faker.lorem.word();
        const testChildCallback = sandbox.stub();
        const testAmpCallback = sandbox.stub();

        const testChild = new AudioComponent();
        testChild.addEventListener(testEvent, testChildCallback);
        const testArg = {
            id: faker.random.uuid()
        };

        const amp = new Amp();
        amp.addEventListener(testEvent, testAmpCallback);
        amp.addComponent(testChild);
        testChild.raiseEvent(testEvent, testArg);

        expect(testAmpCallback.args[0][0]).to.equal(testArg);
        expect(testChildCallback.args[0][0]).to.equal(testArg);
    }),

    it("Passes raised events to children", async() => {
        const testEvent = faker.lorem.word();
        const testChildCallback = sandbox.stub();
        const testArg = {
            id: faker.random.uuid()
        };
        const testChild = new AudioComponent();
        testChild.addEventListener(testEvent, testChildCallback);

        const amp = new Amp();
        amp.addComponent(testChild);
        amp.raiseEvent("eventRaised", testEvent, "Default", testArg);

        expect(testChildCallback.args[0][0]).to.equal(testArg);
    }),

    it("Finds audio player correctly", async() => {
        const componentName = "AudioPlayer";
        const component = new AudioComponent(componentName);

        const amp = new Amp();
        amp.addComponent(component);

        const result = amp.player();

        expect(result).to.equal(component);
    }),

    it("Finds playlist manager correctly", async() => {
        const componentName = "PlaylistManager";
        const component = new AudioComponent(componentName);

        const amp = new Amp();
        amp.addComponent(component);

        const result = amp.playlist();

        expect(result).to.equal(component);
    }),

    it("Finds equalizer correctly", async() => {
        const componentName = "Equalizer";
        const component = new AudioComponent(componentName);

        const amp = new Amp();
        amp.addComponent(component);

        const result = amp.equalizer();

        expect(result).to.equal(component);
    }),

    it("Finds theme correctly", async() => {
        const componentName = "Theme";
        const component = new AudioComponent(componentName);

        const amp = new Amp();
        amp.addComponent(component);

        const result = amp.theme();

        expect(result).to.equal(component);
    }),

    it("Finds theme manager correctly", async() => {
        const componentName = "ThemeManager";
        const component = new AudioComponent(componentName);

        const amp = new Amp();
        amp.addComponent(component);

        const result = amp.themeManager();

        expect(result).to.equal(component);
    }),

    it("Fails to initialise without a theme", async() => {
        const testThemeName = faker.lorem.word();
        const getThemeStub = sandbox.stub(ThemeManager.prototype, "getTheme").returns(undefined);

        const amp = new Amp();
        expect(amp.initialise("body", testThemeName)).to.eventually.throw();
        expect(getThemeStub.calledOnce).to.be.true;
        expect(getThemeStub.args[0][0]).to.equal(testThemeName);
    }),

    it("Initialises layouts and components correctly when a theme exists",async() => {
        const testTheme = new AudioComponent();
        testTheme.configurer = {
            configureLayouts: sandbox.stub(),
            configureComponents: sandbox.stub()
        };

        testTheme.configurer.configureLayouts.resolves([]);
        testTheme.configurer.configureComponents.returns([]);

        const testThemeName = faker.lorem.word();
        const testSelectorName = faker.lorem.word();

        const getThemeStub = sandbox.stub(ThemeManager.prototype, "getTheme").returns(testTheme);

        const amp = new Amp();
        amp.initialise(testSelectorName, testThemeName);
    })

});