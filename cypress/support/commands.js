// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("shouldBePlayingAudio", (selector) => {
    cy.get(`${selector} audio,video`).should((els) => {
        let audible = false;
        els.each((i, el) => {
        console.log(el.duration, el.paused, el.muted);
    
        expect(el.duration > 0 && !el.paused && !el.muted).to.eq(true);
        });
    });
});

Cypress.Commands.add("shouldBePaused", (selector) => {
    cy.get(`${selector} audio,video`).should((els) => {
        els.each((i, el) => {
            console.log(el.duration, el.paused, el.muted);
        
            expect(el.paused).to.eq(true);
        })
    });
});

Cypress.Commands.add("shouldBeMuted", (selector) => {
    cy.get(`${selector} audio,video`).should((els) => {
        els.each((i, el) => {
            console.log(el.duration, el.paused, el.muted);
        
            expect(el.volume === 0 && !el.paused).to.eq(true);
        })
    });
});

Cypress.Commands.add("shouldBeAtTrackPosition", (selector, position, maxDelta = 4) => {
    cy.get(`${selector} audio,video`).should((els) => {
        els.each((i, el) => {
            expect(el.currentTime).to.be.approximately(position, maxDelta);
        })
    });
});

Cypress.Commands.add("shouldBeAtVolumeLevel", (selector, level) => {
    cy.get(`${selector} audio,video`).should((els) => {
        els.each((i, el) => {
            expect(el.volume).to.eql(level / 100);
        })
    });
});

Cypress.Commands.add("shouldBePlayingTrackNumber", (selector, trackNumber) => {
    cy.get(`${selector} [audio-playlist-item-template]`).then((els) => {
        els.each((i,el) => {
            console.log("testing element: ", JSON.stringify(el));
            if(i === trackNumber - 1) {
                expect(el.classList.contains("playing")).to.be.true;
            } else {
                expect(el.classList.contains("playing")).to.be.false;
            }
        })
    })
})

Cypress.Commands.add("getPlayingTrackNumber", (selector) => {
    return cy.get(`${selector} [audio-playlist-item-template]`)
    .each((el, index) => {
        console.log("TESTING ELEMENT: ", el);
        if(el.hasClass("playing")) {
            console.log("PLAYING: ", index + 1);
            cy.wrap(index + 1).as("currentTrackNumber").then(() => {

                cy.get("@currentTrackNumber").then((tn) => console.log("SAVED: ", tn));
            });

            // result = index + 1;
            // console.log("NEW RESULT: ", result)
            return false;
        }
    });
})