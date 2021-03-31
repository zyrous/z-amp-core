/// <reference types="cypress" />

const faker = require("faker");

function startAudio(selector) {
    cy.shouldBePaused();
    cy.get(`${selector} [audio-button-play]`).click();
    cy.shouldBePlayingAudio();
}

function convertSecondsToPlayerString(secondsToConvert) {
    var minutes = parseInt(secondsToConvert / 60);
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    var seconds = secondsToConvert % 60;
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `00:${minutes}:${seconds}`;
}

const songLength = 30;

context("Audio Player", () => {
    beforeEach(() => {
        cy.visit("/testHarness/index.html");
    });

    it("Should play audio when play button pressed", () => {
        startAudio("#p1");

        // Make sure the second player is unaffected.
        cy.shouldBePaused("#p2");
    }),

    it("Should pause audio when pause button pressed", () => {
        startAudio("#p1");
        cy.get("#p1 [audio-button-pause]").click();
        cy.shouldBePaused("#p1");
        
        // Make sure the second player is unaffected.
        cy.shouldBePaused("#p2");
    }),

    it("Should toggle audio when play/pause button pressed", () => {
        startAudio("#p1");
        cy.get("#p1 [audio-button-play-pause]").click();
        cy.shouldBePaused("#p1");
        
        // Make sure the second player is unaffected.
        cy.shouldBePaused("#p2");
    }),

    it("Should skip through audio when buttons pressed", () => {
        startAudio("#p1");
        cy.get("#p1 [audio-button-seek-forward]").click();
        cy.shouldBeAtTrackPosition("#p1", 20);
        
        cy.get("#p1 [audio-button-seek-backward]").click();
        cy.shouldBeAtTrackPosition("#p1", 10);
        
        cy.get("#p1 [audio-button-seek-backward]").click();
        cy.shouldBeAtTrackPosition("#p1", 0);
    }),

    it("Should skip to correct position when slider changed", () => {
        startAudio("#p1");

        cy.get("#p1 [audio-button-position-range]").invoke("val", 50).trigger("change");
        cy.shouldBeAtTrackPosition(songLength / 2);
    }),

    it("Should adjust volume correctly when buttons pressed", () => {
        startAudio("#p1");

        cy.shouldBeAtVolumeLevel("#p1", 70);
        cy.get("#p1 [audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel("#p1", 60);
        cy.get("#p1 [audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel("#p1", 50);
        cy.get("#p1 [audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel("#p1", 40);
        cy.get("#p1 [audio-button-volume-up]").click();
        cy.shouldBeAtVolumeLevel("#p1", 50);
        
        // Make sure the second player is unaffected.
        cy.shouldBeAtVolumeLevel("#p2", 70);
    }),

    it("Should skip to correct volume when slider changed", () => {
        startAudio("#p1");

        const volume = faker.random.number(100);
        cy.get("#p1 [audio-button-volume-range]").invoke("val", volume).trigger("change");
        cy.shouldBeAtVolumeLevel("#p1", volume);
        
        // Make sure the second player is unaffected.
        cy.shouldBeAtVolumeLevel("#p2", 70);
    }),

    it("Should mute and un-mute audio when button pressed", () => {
        startAudio("#p1");

        cy.get("#p1 [audio-button-volume-mute]").click();
        cy.shouldBeMuted("#p1");
        cy.get("#p1 [audio-button-volume-mute]").click();
        cy.shouldBePlayingAudio("#p1");
        
        // Make sure the second player is unaffected.
        cy.shouldBePaused("#p2");
    }),

    it("Should display correct track position labels for playing song", () => {
        startAudio("#p1");

        cy.get("#p1 [audio-label-track-duration]").contains(convertSecondsToPlayerString(songLength));
        
        cy.get("#p1 [audio-button-position-range]").invoke("val", 50).trigger("change");
        cy.get("#p1 [audio-label-track-position]").contains(convertSecondsToPlayerString(songLength / 2));

        // Stop the audio so it doesn't get annoying.
        cy.get("#p1 [audio-button-pause]").click();
    });
});