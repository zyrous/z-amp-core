# z-amp-core
### A robust framework to build audio components for the web
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d82fa0f8dff24cf9833c6e818f814543)](https://www.codacy.com/bb/zyrous/z-amp-core/dashboard?utm_source=mason_zyrous@bitbucket.org&amp;utm_medium=referral&amp;utm_content=zyrous/z-amp-core&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/d82fa0f8dff24cf9833c6e818f814543)](https://www.codacy.com/bb/zyrous/z-amp-core/dashboard?utm_source=mason_zyrous@bitbucket.org&utm_medium=referral&utm_content=zyrous/z-amp-core&utm_campaign=Badge_Coverage)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**z-amp-core** makes it easy to create high-quality audio players, visualisers and more with a simple theming system. This is the core framework that supports existing themes.

## Highlights
- **Simple** to understand and start using with minimal coding required
- **Audio pipeline** concept makes it easy to create advanced processing and new functionality
- **Inter-component eventing** system allows developers to create new components with ease
- **Easily animate** any HTML element in time with the music by simply adding HTML attributes

## How does it work?
**z-amp-core** is a Javascript library, built with NodeJS, that interacts with the HTML DOM of your page to insert an HTML5 `<audio>` tag. Depending on the additional components that you're using, **z-amp-core** also looks for HTML elements in the DOM with specific attributes and attaches to them to enable player features. For example, you could add the following to your HTML:
```html
<button audio-button-play>PLAY</button>
```
This would render a button that starts audio playing automatically whenever pressed. That's it! **z-amp-core** uses its special tag (`audio-button-play`) to attach functionality to elements on your page.
Right now, **z-amp-core** provides the following types of audio components:

- Audio Player
- Playlist Manager
- HTML Visualiser
- Graphic Equalizer

If you'd like to create your own components, it's easy to get started. In addition, the powerful theming engine allows you to create advanced UIs quickly.

To find out more, visit the z-amp site for full documentation.