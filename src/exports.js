/**
 * This file exists to enable browserify to attach our exported classes to
 * the window object, so that they are available for browser scripts to use.
 * Without these exports, no ZAmp classes would be available.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 */

const corejs = require("core-js");
const regenerator = require("regenerator-runtime/runtime");

// Get the existing WebAmp object, or create one if it doesn't exist.
var ZAmp = window.ZAmp || {};
const { Amp } = require("./components/amp/amp"); 
const { Theme } = require("./components/theme/theme");

// Attach all required classes.
ZAmp.Amp = Amp;  // Available to initialise the player.
ZAmp.Theme = Theme; // Available for custom themes.
ZAmp.build = () => Theme.create().startConfiguring(); // Available for JIT building.

// Set the object back to the window.
window.ZAmp = ZAmp;

module.exports = { Amp, Theme };