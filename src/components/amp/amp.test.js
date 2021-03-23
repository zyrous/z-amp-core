const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Dependencies for testing.
const {Amp} = require("./amp");
const {ThemeManager} = require("../../theme-manager/theme-manager");
const { AudioComponent } = require("../audio-component");
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
        expect(amp.eventListeners.get("eventRaised")).to.exist;
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

    it("Adds new component correctly", async() => {
        const testComponent = sandbox.createStubInstance(AudioComponent);

        const testAmp = new Amp();
        testAmp.addComponent(testComponent);

        expect(testAmp.components.length).to.equal(1);
        expect(testAmp.components[0]).to.equal(testComponent);
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
    })

});