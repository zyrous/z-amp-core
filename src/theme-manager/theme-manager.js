/**
 * @namespace ZAmp.ThemeManager
 */

/**
 * Manages different themes that are available to be set for this
 * ZAmp session.
 * @author Mason Yarrick <mason.yarrick@zyrous.com>
 * @memberof ZAmp.ThemeManager
 */
class ThemeManager {

    /**
     * Add a theme to the manager, making it available to retrieve
     * in ZAmp.
     * @public
     * @param {Theme} theme The theme to add to the manager.
     */
    addTheme(theme) {
        this.themes.push(theme);
    }

    /**
     * Retrieve a theme based on its name.
     * @public
     * @param {String} name The name of the theme to retrieve. If not
     * supplied but one theme exists, will return that theme.
     * @returns {Theme} The theme with the specified name.
     */
    getTheme(name){
        if(name) {
            return this.themes.find((theme) => theme.themeName === name);
        } else if(this.themes.length === 1) {
            return this.themes[0];
        } else {
            throw Error("Theme name not supplied and <> 1 themes exist.");
        }
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