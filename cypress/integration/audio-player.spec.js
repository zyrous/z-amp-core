/// <reference types="cypress" />

const faker = require("faker");

function startAudio() {
    cy.shouldBePaused();
    cy.get("[audio-button-play]").click();
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
        cy.visit("/src/testHarness/index.html");
    });

    it("Should play audio when play button pressed", () => {
        startAudio();
    }),

    it("Should pause audio when pause button pressed", () => {
        startAudio();
        cy.get("[audio-button-pause]").click();
        cy.shouldBePaused();
    }),

    it("Should toggle audio when play/pause button pressed", () => {
        startAudio();
        cy.get("[audio-button-play-pause]").click();
        cy.shouldBePaused();
    }),

    it("Should skip through audio when buttons pressed", () => {
        startAudio();
        cy.get("[audio-button-seek-forward]").click();
        cy.shouldBeAtTrackPosition(20);
        
        cy.get("[audio-button-seek-backward]").click();
        cy.shouldBeAtTrackPosition(10);
        
        cy.get("[audio-button-seek-backward]").click();
        cy.shouldBeAtTrackPosition(0);
    }),

    it("Should skip to correct position when slider changed", () => {
        startAudio();

        cy.get("[audio-button-position-range]").invoke("val", 50).trigger("change");
        cy.shouldBeAtTrackPosition(songLength / 2);
    }),

    it("Should adjust volume correctly when buttons pressed", () => {
        startAudio();

        cy.shouldBeAtVolumeLevel(70);
        cy.get("[audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel(60);
        cy.get("[audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel(50);
        cy.get("[audio-button-volume-down]").click();
        cy.shouldBeAtVolumeLevel(40);
        cy.get("[audio-button-volume-up]").click();
        cy.shouldBeAtVolumeLevel(50);
    }),

    it("Should skip to correct volume when slider changed", () => {
        startAudio();

        const volume = faker.random.number(100);
        cy.get("[audio-button-volume-range]").invoke("val", volume).trigger("change");
        cy.shouldBeAtVolumeLevel(volume);
    }),

    it("Should mute and un-mute audio when button pressed", () => {
        startAudio();
        cy.wait(1000);

        cy.get("[audio-button-volume-mute]").click();
        cy.shouldBeMuted();
        cy.get("[audio-button-volume-mute]").click();
        cy.shouldBePlayingAudio();
    }),

    it("Should display correct track position labels for playing song", () => {
        startAudio();

        cy.get("[audio-label-track-duration]").contains(convertSecondsToPlayerString(songLength));
        
        cy.get("[audio-button-position-range]").invoke("val", 50).trigger("change");
        cy.get("[audio-label-track-position]").contains(convertSecondsToPlayerString(songLength / 2));
    })
});