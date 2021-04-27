<a name="ZAmp.Configuration.LayoutConfigurer"></a>

## Configuration.LayoutConfigurer
Allows for configuration of a layout of a theme. This forms part ofa collection owned by a ZAmpConfigurer.

**Kind**: static class of [<code>Configuration</code>](#ZAmp.Configuration)  
**Author**: Mason Yarrick <mason.yarrick@zyrous.com>  

* [.LayoutConfigurer](#ZAmp.Configuration.LayoutConfigurer)
    * [new LayoutConfigurer(layoutFunction, builder)](#new_ZAmp.Configuration.LayoutConfigurer_new)
    * [.withStyles(styles)](#ZAmp.Configuration.LayoutConfigurer+withStyles) ⇒ <code>LayoutConfigurer</code>
    * [.configure(htmlElement)](#ZAmp.Configuration.LayoutConfigurer+configure)
    * [.render(htmlElement)](#ZAmp.Configuration.LayoutConfigurer+render)
    * [.and()](#ZAmp.Configuration.LayoutConfigurer+and)
    * [.finish()](#ZAmp.Configuration.LayoutConfigurer+finish)

<a name="new_ZAmp.Configuration.LayoutConfigurer_new"></a>

### new LayoutConfigurer(layoutFunction, builder)
Create a new configurer for a layout that forms part of a theme.


| Param | Type | Description |
| --- | --- | --- |
| layoutFunction | <code>function</code> | The function that, when executed, renders HTML for the layout. |
| builder | <code>any</code> | The ZAmp configurer that this layout configurer belongs to. |

<a name="ZAmp.Configuration.LayoutConfigurer+withStyles"></a>

### layoutConfigurer.withStyles(styles) ⇒ <code>LayoutConfigurer</code>
Add styles to this layout. Styles should be passed in as strings of valid CSS.

**Kind**: instance method of [<code>LayoutConfigurer</code>](#ZAmp.Configuration.LayoutConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>String</code> | The styles that will be applied for this layout. |

<a name="ZAmp.Configuration.LayoutConfigurer+configure"></a>

### layoutConfigurer.configure(htmlElement)
Configure this layout by adding components to the provided parent element. Intendedto be called internally.

**Kind**: instance method of [<code>LayoutConfigurer</code>](#ZAmp.Configuration.LayoutConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| htmlElement | <code>HTMLElement</code> | The parent element to render within. |

<a name="ZAmp.Configuration.LayoutConfigurer+render"></a>

### layoutConfigurer.render(htmlElement)
Render the layout according to the template, replacing the content of theHTML element.

**Kind**: instance method of [<code>LayoutConfigurer</code>](#ZAmp.Configuration.LayoutConfigurer)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| htmlElement | <code>HTMLElement</code> | The element to render the content within. |

<a name="ZAmp.Configuration.LayoutConfigurer+and"></a>

### layoutConfigurer.and()
Add another component to the ZAmp configurer.

**Kind**: instance method of [<code>LayoutConfigurer</code>](#ZAmp.Configuration.LayoutConfigurer)  
**Access**: public  
<a name="ZAmp.Configuration.LayoutConfigurer+finish"></a>

### layoutConfigurer.finish()
Finish configuring the ZAmp configurer.

**Kind**: instance method of [<code>LayoutConfigurer</code>](#ZAmp.Configuration.LayoutConfigurer)  
**Access**: public  
