<a name="ZAmp.ThemeManager.ThemeManager"></a>

## ThemeManager.ThemeManager
Manages different themes that are available to be set for thisZAmp session.

**Kind**: static class of [<code>ThemeManager</code>](#ZAmp.ThemeManager)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.ThemeManager](#ZAmp.ThemeManager.ThemeManager)
    * [.themes](#ZAmp.ThemeManager.ThemeManager+themes) ⇒ <code>Array.&lt;Theme&gt;</code>
    * [.addTheme(theme)](#ZAmp.ThemeManager.ThemeManager+addTheme)
    * [.getTheme(name)](#ZAmp.ThemeManager.ThemeManager+getTheme) ⇒ <code>Theme</code>

<a name="ZAmp.ThemeManager.ThemeManager+themes"></a>

### themeManager.themes ⇒ <code>Array.&lt;Theme&gt;</code>
Retrieve the set of themes for this manager.

**Kind**: instance property of [<code>ThemeManager</code>](#ZAmp.ThemeManager.ThemeManager)  
**Returns**: <code>Array.&lt;Theme&gt;</code> - The current set of themes.  
**Access**: public  
<a name="ZAmp.ThemeManager.ThemeManager+addTheme"></a>

### themeManager.addTheme(theme)
Add a theme to the manager, making it available to retrievein ZAmp.

**Kind**: instance method of [<code>ThemeManager</code>](#ZAmp.ThemeManager.ThemeManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Theme</code> | The theme to add to the manager. |

<a name="ZAmp.ThemeManager.ThemeManager+getTheme"></a>

### themeManager.getTheme(name) ⇒ <code>Theme</code>
Retrieve a theme based on its name.

**Kind**: instance method of [<code>ThemeManager</code>](#ZAmp.ThemeManager.ThemeManager)  
**Returns**: <code>Theme</code> - The theme with the specified name.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the theme to retrieve. If not supplied but one theme exists, will return that theme. |

