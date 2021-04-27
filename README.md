# z-amp-core

**A robust framework to build audio components for the web**

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/9d30589258aa4707ad569d5cd1d03c21)](https://www.codacy.com/gh/zyrous/z-amp-core/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zyrous/z-amp-core&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/9d30589258aa4707ad569d5cd1d03c21)](https://www.codacy.com/gh/zyrous/z-amp-core/dashboard?utm_source=github.com&utm_medium=referral&utm_content=zyrous/z-amp-core&utm_campaign=Badge_Coverage)
[![z-amp-core](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/b42gr3/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/b42gr3/runs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**z-amp-core** makes it easy to create high-quality audio players, visualisers and more with a simple theming system. This is the core framework that supports existing themes.

## Highlights
-   **Simple** to understand and start using with minimal coding required
-   **Audio pipeline** concept makes it easy to create advanced processing and new functionality
-   **Inter-component eventing** system allows developers to create new components with ease
-   **Easily animate** any HTML element in time with the music by simply adding HTML attributes

## How it works
**z-amp-core** is a Javascript library, built with NodeJS, that interacts with the HTML DOM of your page to insert an HTML5 `<audio>` tag or specify one of your own for it to act upon. Depending on the additional components that you're using, **z-amp-core** also looks for HTML elements in the DOM with specific attributes and attaches to them to enable player features. For example, you could add the following to your HTML:
```html
<button audio-button-play>PLAY</button>
```
This would render a button that starts audio playing automatically whenever pressed. That's it! **z-amp-core** uses its special tag (`audio-button-play`) to attach functionality to elements on your page.
Right now, **z-amp-core** provides the following types of audio components:

-   Audio Player
-   Playlist Manager
-   HTML Visualiser
-   Graphic Equalizer

If you'd like to create your own components, it's easy to get started. In addition, the powerful theming engine allows you to create advanced UIs quickly.

To find out more, visit the [full documentation](https://bitbucket.org/zyrous/z-amp-core/src/master/docs/static/HOME.md).