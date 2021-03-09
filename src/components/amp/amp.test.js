const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Dependencies for testing.
const {Amp} = require("./amp");
const ThemeManager = require("../../theme-manager/theme-manager");

describe("Amp Component", function() {

    it("Constructs a new amp successfully", async() => {
        var amp = new Amp();
        expect(amp).to.not.be.null;
    });

});