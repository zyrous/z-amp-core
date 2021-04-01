const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");

// Class under test.
const {CssMutator} = require("./css-mutator");

describe("CSS Mutator", function() {
    it("Should be initialised with correct defaults", async() => {
        const testElement = { elementId: faker.random.uuid() };

        const mutator = new CssMutator(testElement);
        
        expect(mutator.htmlElement).to.equal(testElement);
        expect(mutator.cssProperty).to.equal("height");
        expect(mutator.unitOfMeasure).to.equal("%");
        expect(mutator.lowerValue).to.equal(0.0);
        expect(mutator.upperValue).to.equal(100.0);
        expect(mutator.spread).to.equal(100.0);
    }),

    it("Should be initialised with overrides correctly", async() => {
        const testElement = { elementId: faker.random.uuid() };
        const testCssProperty = faker.lorem.word();
        const testUnitOfMeasure = faker.lorem.word();
        const testLowerValue = faker.random.number();
        const testUpperValue = faker.random.number();

        const mutator = new CssMutator(testElement, testCssProperty, testUnitOfMeasure, testLowerValue, testUpperValue);

        expect(mutator.htmlElement).to.equal(testElement);
        expect(mutator.cssProperty).to.equal(testCssProperty);
        expect(mutator.unitOfMeasure).to.equal(testUnitOfMeasure);
        expect(mutator.lowerValue).to.equal(testLowerValue);
        expect(mutator.upperValue).to.equal(testUpperValue);
        expect(mutator.spread).to.equal(testUpperValue - testLowerValue);
    }),

    it("Mutates default property with non-zero percentage", async() => {
        const testElement = { elementId: faker.random.uuid(), style: [] };
        const testPercentage = faker.random.number({ min: 0, max: 100 });

        const mutator = new CssMutator(testElement);

        mutator.mutate(testPercentage);
        expect(testElement.style["height"]).to.equal(`${testPercentage}%`);
    }),

    it("Mutates non-default property with non-zero percentage", async() => {
        const testElement = { elementId: faker.random.uuid(), style: [] };
        const testPercentage = faker.random.number({ min: 0, max: 100 });
        const testUpperValue = faker.random.number({ min: 0, max: 100 });
        const testLowerValue = testUpperValue - faker.random.number({ min: 0, max: 100 });
        const testCssProperty = faker.lorem.word();
        const testUnitOfMeasure = faker.lorem.word();

        const mutator = new CssMutator(testElement, testCssProperty, testUnitOfMeasure, testLowerValue, testUpperValue);

        mutator.mutate(testPercentage);
        const expectedValue = Math.round((((testUpperValue - testLowerValue) * (testPercentage / 100.0) + testLowerValue) * 100)) / 100;
        expect(testElement.style[testCssProperty]).to.equal(`${expectedValue}${testUnitOfMeasure}`);
    })
});