<a name="ZAmp.Components.Amp.Amp"></a>

## Amp.Amp ⇐ <code>AudioComponent</code>
Provides a running instance of ZAmp. This is the primary entry point ofthe library. Developers using this framework should interact with ZAmpexclusively through this interface.

**Kind**: static class of [<code>Amp</code>](#ZAmp.Components.Amp)  
**Extends**: <code>AudioComponent</code>  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.Amp](#ZAmp.Components.Amp.Amp) ⇐ <code>AudioComponent</code>
    * [new Amp()](#new_ZAmp.Components.Amp.Amp_new)
    * _instance_
        * [.addComponent(component)](#ZAmp.Components.Amp.Amp+addComponent)
        * [.initialise(selector, themeName)](#ZAmp.Components.Amp.Amp+initialise) ⇒ <code>Promise.&lt;Amp&gt;</code>
        * [.findComponent(componentName)](#ZAmp.Components.Amp.Amp+findComponent) ⇒ <code>AudioComponent</code>
        * [.setStorageProvider(providerName)](#ZAmp.Components.Amp.Amp+setStorageProvider)
        * [.player()](#ZAmp.Components.Amp.Amp+player) ⇒ <code>AudioComponent</code>
        * [.playlist()](#ZAmp.Components.Amp.Amp+playlist) ⇒ <code>AudioComponent</code>
        * [.equalizer()](#ZAmp.Components.Amp.Amp+equalizer) ⇒ <code>AudioComponent</code>
        * [.theme()](#ZAmp.Components.Amp.Amp+theme) ⇒ <code>AudioComponent</code>
        * [.themeManager()](#ZAmp.Components.Amp.Amp+themeManager) ⇒ <code>ThemeManager</code>
    * _static_
        * [.amp(selector, themeName)](#ZAmp.Components.Amp.Amp.amp) ⇒ <code>Promise.&lt;Amp&gt;</code>

<a name="new_ZAmp.Components.Amp.Amp_new"></a>

### new Amp()
Create a new Amp. This can be used instead of the static Amp.amp() method, butyou'll need to call initialise() afterwards.

<a name="ZAmp.Components.Amp.Amp+addComponent"></a>

### amp.addComponent(component)
Add a new component to this Amp. Although you can call this method yourself for a customcomponent (for example, one that is not handled by the theme you're using), this isintended to be called internally.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>AudioComponent</code> | The component to add to this Amp. |

<a name="ZAmp.Components.Amp.Amp+initialise"></a>

### amp.initialise(selector, themeName) ⇒ <code>Promise.&lt;Amp&gt;</code>
Initialise an Amp. This method applies the theme (generating HTML content) then configuresand initialises each registered component.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>Promise.&lt;Amp&gt;</code> - The newly initialised Amp.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>body</code> | The CSS selector that defines the HTML element that ZAmp will render itself within. |
| themeName | <code>String</code> |  | The name of the theme to apply. |

**Example**  
```js
// Attach to a div with ID "player", using the minimal theme.const amp = new Amp();amp.initialse("#player", "minimal")  .then(() => console.log("Amp good to go!"));
```
<a name="ZAmp.Components.Amp.Amp+findComponent"></a>

### amp.findComponent(componentName) ⇒ <code>AudioComponent</code>
Retrieve a component by its unique name.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>AudioComponent</code> - The component with the specified name (if available).  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| componentName | <code>String</code> | The name of the component to retrieve. |

<a name="ZAmp.Components.Amp.Amp+setStorageProvider"></a>

### amp.setStorageProvider(providerName)
Set a new type of storage provider for this component.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| providerName | <code>String</code> | The name of the storage provider to set. |

<a name="ZAmp.Components.Amp.Amp+player"></a>

### amp.player() ⇒ <code>AudioComponent</code>
Retrieve the player component (if available).

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>AudioComponent</code> - The audio player.  
**Access**: public  
<a name="ZAmp.Components.Amp.Amp+playlist"></a>

### amp.playlist() ⇒ <code>AudioComponent</code>
Retrieve the playlist component (if available).

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>AudioComponent</code> - The playlist.  
**Access**: public  
<a name="ZAmp.Components.Amp.Amp+equalizer"></a>

### amp.equalizer() ⇒ <code>AudioComponent</code>
Retrieve the equalizer component (if available).

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>AudioComponent</code> - The equalizer.  
**Access**: public  
<a name="ZAmp.Components.Amp.Amp+theme"></a>

### amp.theme() ⇒ <code>AudioComponent</code>
Retrieve the theme.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>AudioComponent</code> - The active theme.  
**Access**: public  
<a name="ZAmp.Components.Amp.Amp+themeManager"></a>

### amp.themeManager() ⇒ <code>ThemeManager</code>
Retrieve the theme manager.

**Kind**: instance method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  
**Returns**: <code>ThemeManager</code> - The theme manager.  
**Access**: public  
<a name="ZAmp.Components.Amp.Amp.amp"></a>

### Amp.amp(selector, themeName) ⇒ <code>Promise.&lt;Amp&gt;</code>
The static version of initialisation of ZAmp. Call this method to create a newrunning instance of ZAmp with a theme applied.

**Kind**: static method of [<code>Amp</code>](#ZAmp.Components.Amp.Amp)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>body</code> | The CSS selector that tells ZAmp where to find the parent HTML element that it will fit inside. |
| themeName | <code>String</code> |  | The name of the theme that ZAmp will use. |

**Example**  
```js
// Attach to the body of the DOM using the default theme.Amp.amp()  .then(() => console.log("Ready to play!"))
```
