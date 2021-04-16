
// System under test.
const { expect } = require("chai");
const faker = require("faker");
const {AudioPipelineSegment} = require("./audio-pipeline-segment");

describe("Audio Pipeline Segment", function() {

    it("Constructs a new object with undefined values", async() => {
        const segment = new AudioPipelineSegment();
        expect(segment.firstNode).to.be.undefined;
        expect(segment.lastNode).to.be.undefined;
        expect(segment.weighting).to.be.undefined;
    }),

    it("Constructs a new object with existing values", async() => {
        const testFirstNode = { id: faker.random.uuid() };
        const testLastNode = { id: faker.random.uuid() };
        const testWeighting = faker.random.number();

        const segment = new AudioPipelineSegment(testFirstNode, testLastNode, testWeighting);

        expect(segment.firstNode).to.equal(testFirstNode);
        expect(segment.lastNode).to.equal(testLastNode);
        expect(segment.weighting).to.equal(testWeighting);
    })
});