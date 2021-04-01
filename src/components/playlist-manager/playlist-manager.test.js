const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// Sandbox for mocks.
const sandbox = sinon.createSandbox();

// Dependencies for testing.
const {AudioTrack} = require("../../domain/audio-track");
const {LocalStorageProvider} = require("../../storage/local-storage-provider");

// The system under test.
const {PlaylistManager} = require("./playlist-manager");

var storeStub, getStub;

describe("Playlist Manager", function() {

    beforeEach(() => {
        storeStub = sandbox.stub(LocalStorageProvider.prototype, "storeValue");
        getStub = sandbox.stub(LocalStorageProvider.prototype, "getValue");
    }),

    afterEach(() => {
        sandbox.restore();
    }),

    it("Should add individual tracks correctly", async() => {
        const testTrackUrl = faker.internet.url();
        const testArtist = faker.name.findName();
        const testTitle = faker.lorem.sentence();

        const trackAddedStub = sandbox.stub();
        const playlistUpdatedStub = sandbox.stub();
        
        const manager = new PlaylistManager();
        manager.addEventListener("trackAdded", trackAddedStub);
        manager.addEventListener("playlistUpdated", playlistUpdatedStub);
        manager.addTrack({
            url: testTrackUrl,
            artist: testArtist,
            title: testTitle
        });

        expect(manager.tracks[0].url).to.equal(testTrackUrl);
        expect(manager.tracks[0].artist).to.equal(testArtist);
        expect(manager.tracks[0].title).to.equal(testTitle);

        expect(storeStub.calledOnceWith("Default-tracks")).to.be.true;
        expect(storeStub.args[0][1][0].url).to.equal(testTrackUrl);
        expect(storeStub.args[0][1][0].artist).to.equal(testArtist);
        expect(storeStub.args[0][1][0].title).to.equal(testTitle);

        expect(trackAddedStub.calledOnce).to.be.true;
        expect(trackAddedStub.args[0][0].url).to.equal(testTrackUrl);
        expect(trackAddedStub.args[0][0].artist).to.equal(testArtist);
        expect(trackAddedStub.args[0][0].title).to.equal(testTitle);
        
        expect(playlistUpdatedStub.calledOnce).to.be.true;
        expect(playlistUpdatedStub.args[0][0].length).to.equal(1);
    }),

    it("Should change track when adding if one is required", async() => {
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        });

        const trackChangedStub = sandbox.stub();

        const manager = new PlaylistManager();
        manager.addEventListener("trackChanged", trackChangedStub);
        manager.trackRequired = true;
        manager.addTrack(testTrack);

        expect(manager.trackRequired).to.be.false;
        expect(trackChangedStub.calledOnceWithExactly(testTrack));
    }),

    it("Should fail to re-add tracks without forcing", async() => {
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        });

        const manager = new PlaylistManager();
        manager.addTrack(testTrack);

        expect(manager.tracks.length).to.equal(1);
        expect(manager.tracks[0].equals(testTrack)).to.be.true;

        manager.addTrack(testTrack);

        expect(manager.tracks.length).to.equal(1);
        expect(manager.tracks[0].equals(testTrack)).to.be.true;
    }),

    it("Should re-add tracks with forcing", async() => {
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        });

        const manager = new PlaylistManager();
        manager.addTrack(testTrack);

        expect(manager.tracks.length).to.equal(1);
        expect(manager.tracks[0].equals(testTrack)).to.be.true;

        manager.addTrack(testTrack, true);

        expect(manager.tracks.length).to.equal(2);
        expect(manager.tracks[1].equals(testTrack)).to.be.true;
    }),

    it("Should fail to add empty tracks", async() => {
        const manager = new PlaylistManager();
        expect(() => manager.addTrack()).to.throw();
    }),

    it("Should add multiple tracks in order", async() => {
        const testTracks = [{
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        },{
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        }];

        const manager = new PlaylistManager();
        manager.addTracks(testTracks);

        expect(manager.tracks[0].equals(testTracks[0]));
        expect(manager.tracks[1].equals(testTracks[1]));
    }),

    it("Should set tracks directly correctly", async() => {
        const testTracks = [{
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        },{
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        }];

        const manager = new PlaylistManager();
        manager.tracks = testTracks;

        expect(manager.tracks).to.equal(testTracks);
    })

    it("Sets and gets preferences correctly", async() => {
        const testPrefs = {id: faker.random.uuid()};

        const manager = new PlaylistManager(testPrefs);

        expect(manager.preferences).to.equal(testPrefs);
    }),

    it("Should change track when it exists in the playlist", async() => {
        const testTracks = [new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        }),new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        })];
        const eventStub = sandbox.stub();

        const manager = new PlaylistManager({
            tracks: testTracks
        });
        manager.addEventListener("trackChanged", eventStub);

        manager.changeTrack(testTracks[1]);

        expect(manager.currentTrackIndex).to.equal(1);
        expect(eventStub.calledOnceWithExactly(testTracks[1]));
    }),

    it("Should fail to change track when not in playlist", async() => {
        const testTrack = new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        });
        const testTracks = [new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        }),new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        })];

        const manager = new PlaylistManager({
            tracks: testTracks
        });

        expect(() => manager.changeTrack(testTrack)).to.throw();
    }),

    it("Should fail to change track when already selected", async() => {
        
        const testTracks = [new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        }),new AudioTrack({
            url: faker.internet.url(),
            artist: faker.name.findName(),
            title: faker.lorem.sentence()
        })];
        
        const manager = new PlaylistManager({
            tracks: testTracks
        });

        manager.changeTrack(testTracks[1]);
        expect(manager.currentTrackIndex).to.equal(1);
        manager.changeTrack(testTracks[1]);
        expect(manager.currentTrackIndex).to.equal(1);
    })
});