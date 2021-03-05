// /// <reference types="cypress" />

// const faker = require("faker");

// function startAudio() {
//     cy.shouldBePaused();
//     cy.get("[audio-button-play]").click();
//     cy.shouldBePlayingAudio();
// }


// function getCurrentTrackNumber() {
//     cy.get("[audio-playlist-item-template]")
//     .each((el, index) => {
//         console.log("TESTING ELEMENT: ", el)
//         if(el.hasClass("playing")) {
//             console.log("PLAYING: ", index + 1)
//             cy.wrap(index + 1).as("currentTrackNumber");
//             // result = index + 1;
//             // console.log("NEW RESULT: ", result)
//             return false;
//         }
//     });

//     // console.log("RESULT IS: ", result);
// }

// const numTracks = 3;

// context("Playlist Manager", () => {
//     beforeEach(() => {
//         cy.visit("/src/testHarness/index.html");
//     });

//     // it("Should switch tracks when next and previous buttons are pressed", () => {
//     //     startAudio();

//     //     cy.shouldBePlayingTrackNumber(1);
//     //     cy.get("[audio-button-next]").click();
//     //     cy.shouldBePlayingTrackNumber(2);
//     //     cy.get("[audio-button-previous]").click();
//     //     cy.shouldBePlayingTrackNumber(1);
//     // }),

//     // it("Should switch tracks when one is pressed", () => {
        
//     //     var trackIndex = faker.random.number(numTracks - 1);

//     //     cy.get("[audio-playlist-item-template]").eq(trackIndex).click();
//     //     cy.shouldBePlayingTrackNumber(trackIndex + 1);
//     // }),

//     // it("Should go through tracks sequentially without shuffle on", () => {
//     //     startAudio();

//     //     for(var i=1; i<=numTracks; i++) {
//     //         cy.shouldBePlayingTrackNumber(i);
//     //         cy.get("[audio-button-next]").click();
//     //     }
//     // }),
    
//     it("Should go through tracks randomly with shuffle on", () => {

//         // cy.get("[audio-button-shuffle]").click();
//         startAudio();

//         var random = false;
//         var lastPlayingIndex, currentPlayingIndex;
//         cy.getPlayingTrackNumber()
//         .then(() => {
//             cy.get("@currentTrackNumber")
//             .then((tn) => lastPlayingIndex = tn)
//             .then(() => {
//                 for(var i=0; i<10; i++) {
//                     cy.get("[audio-button-next]").click()
//                     .then(() => {
//                         cy.getPlayingTrackNumber()
//                         .then(() => {
//                             cy.get("@currentTrackNumber")
//                             .then((tn) => currentPlayingIndex = tn)
//                             .then(console.log(`WENT FROM ${JSON.stringify(lastPlayingIndex)} TO ${currentPlayingIndex}`))
//                             .then(() => {
//                                 if(currentPlayingIndex != lastPlayingIndex + 1
//                                     && currentPlayingIndex != (lastPlayingIndex + 1) % numTracks) {
//                                         random = true;
//                                     }
                    
//                                 lastPlayingIndex = currentPlayingIndex;
//                             })
//                         });
                        
                        
//                     })
                    
//                 }
//             })
//         });
//         console.log("LAST PLAYING INDEX: ", lastPlayingIndex)
        

//         // expect(random).to.eql(true);
//     })
// });