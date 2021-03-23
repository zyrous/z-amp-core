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
const {Theme} = require("./theme");

// Dependencies for mocking.
const {ThemeManager} = require("../../theme-manager/theme-manager");
const {WebAmpConfigurer} = require("./web-amp-configurer");

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

describe("Theme", function() {

    afterEach(() => {
        sandbox.restore();
    });

    it("Should allow new themes to be registered", async() => {
        class TestTheme extends Theme {
            constructor() {
                super();
            }
        }

        const registerStub = sandbox.stub(ThemeManager.prototype, "addTheme");
        
        const theme = new TestTheme();
        theme.register();
        expect(registerStub.calledWith(theme)).to.be.true;
    }),

    it("Should create child theme successfully", async() => {
        const testThemeName = faker.lorem.word();
        class TestTheme extends Theme {
            constructor() {
                super();
                this.themeName = testThemeName;
            }
        }
        
        const theme = new TestTheme();
        expect(theme.themeName).to.equal(testThemeName);
    }),

    it("Should create instance from static method", async() => {
        const testThemeName = faker.lorem.word();
        const registerStub = sandbox.stub(ThemeManager.prototype, "addTheme");

        const newTheme = Theme.create(testThemeName);
        
        expect(registerStub.calledOnce).to.be.true;
        expect(newTheme.themeName).to.equal(testThemeName);
    }),

    it("Should create new configurer on build start", async() => {
        class TestTheme extends Theme {

            buildConfiguration() {
                this.startConfiguring();
            }
        }

        const newTheme = new TestTheme();
        expect(newTheme.configurer).to.not.be.null;
    }),

    it("Should allow name to be set manually", async() => {
        const testThemeName = faker.lorem.word();
        const newTheme = new Theme();
        newTheme.themeName = testThemeName;
        expect(newTheme.themeName).to.equal(testThemeName);
    })
});