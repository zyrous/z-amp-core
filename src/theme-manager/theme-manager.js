/**
 * @namespace WebAmp.ThemeManager
 */

/**
 * Manages different themes that are available to be set for this
 * WebAmp session.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof WebAmp.ThemeManager
 */
class ThemeManager {

    /**
     * Add a theme to the manager, making it available to retrieve
     * in WebAmp.
     * @public
     * @param {Theme} theme The theme to add to the manager.
     */
    addTheme(theme) {
        this.themes.push(theme);
    }

    /**
     * Retrieve a theme based on its name.
     * @public
     * @param {String} name The name of the theme to retrieve. Defaults
     * to "Invisible".
     * @returns {Theme} The theme with the specified name.
     */
    getTheme(name = "Invisible"){
        return this.themes.find((theme) => theme.themeName === name);
    }

    /**
     * Retrieve the set of themes for this manager.
     * @public
     * @returns {Theme[]} The current set of themes.
     */
    get themes() {
        if(!window.themes){
            window.themes = [];
        } 
        return window.themes;
    }
}

module.exports = { ThemeManager };