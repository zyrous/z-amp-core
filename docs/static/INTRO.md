# Introduction
With the introduction of the Web Audio API, adding multimedia to a website became much easier. Including a video or audio track could be accomplished with an extremely small amount of code:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="mason-zyrous" data-slug-hash="JjEzwyx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="z-amp-core: html5 tag">
  <span>See the Pen <a href="https://codepen.io/mason-zyrous/pen/JjEzwyx">
  z-amp-core: html5 tag</a> by mason-zyrous (<a href="https://codepen.io/mason-zyrous">@mason-zyrous</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

That's great for basic use cases, but now let's consider that you wanted to do something slightly more complex, like adding seek-forward and seek-backward buttons. Good news: The API provides developers with a [wealth of functionality](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to help create almost anything you want! However, for a large number of use cases, actually doing so can take a lot of code and introduces a steep learning curve. In this instance, you'd need to add script to the page that retrieves the audio element, calculates the next position in the track (accounting for the start and end) and sets the audio element's "currentTime" property.

Let's take the example above and re-implement it with **z-amp-core**:
<p class="codepen" data-height="356" data-theme-id="light" data-default-tab="html,result" data-user="mason-zyrous" data-slug-hash="gOgEZQw" style="height: 356px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="z-amp-core: audio-player basic 1">
  <span>See the Pen <a href="https://codepen.io/mason-zyrous/pen/gOgEZQw">
  z-amp-core: audio-player basic 1</a> by mason-zyrous (<a href="https://codepen.io/mason-zyrous">@mason-zyrous</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Let's break down what's going on here. First, we're importing our script in the `<head>` section of our HTML. After that, all we need to do is add our play/pause button in the `<body>`. At this point, take note of two things:

1.  We didn't add an `<audio>` tag. That's because **z-amp-core**'s Audio Player component automatically adds one for you if it can't find one.
2.  Our button has an unique attribute (`audio-button-play-pause`). That's how **z-amp-core**'s components find the things in your page that you want to add functionality to.

Now let's move onto the script, where things get a bit more interesting. **z-amp-core** provides an intuitive fluent API that allows you to add functionality to your page in a human-readable fashion. In order, the script in this example:

-   Tells **z-amp-core** to start building the player,
-   adds a new Audio Pipeline (we'll cover that later),
-   adds an Audio Player component to the pipeline,
-   tells **z-amp-core** to add the components to the page, and
-   finally plays an audio file.

*But wait! Wasn't that a lot more code than just using the `<audio>` element on its own?* **Yes, yes it was**. If all you want to do is add a very simply audio player to your page, we recommend you use the Web Audio API without **z-amp-core**. Stick with it though; there're more exciting things coming up.

Let's build our example out a bit by adding some more features:
<p class="codepen" data-height="466" data-theme-id="light" data-default-tab="html,result" data-user="mason-zyrous" data-slug-hash="abpMXBb" style="height: 466px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="z-amp-core: audio-player basic 2">
  <span>See the Pen <a href="https://codepen.io/mason-zyrous/pen/abpMXBb">
  z-amp-core: audio-player basic 2</a> by mason-zyrous (<a href="https://codepen.io/mason-zyrous">@mason-zyrous</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Note that we've added buttons for seeking forward/back, selecting a track position, increasing/decreasing the volume, selecting a specific volume and muting the audio, as well as labels for the track position and duration, *without adding a single new line of script*. All we need to do is to lay out our HTML and tag each element with the functionality that we want it to have. Pretty cool, right?

Also, you might have noticed that **z-amp-core** adds a few nice touches out of the box. When you play or pause the audio, notice that there's a fade effect (300ms by default). Also, check out what happens when you obscure the browser tab by minimising the browser or putting another window on top of it. **Spoiler alert**: the music automatically pauses, then plays again when the tab regains visibility! Of course, this behavior is all fully customisable through the AudioPlayer component's preferences, which you have full control over. The **z-amp-core** framework also provides components for a graphical equalizer, a playlist manager and a component that automatically animates elements of the page in time to the music. Each of these are easily implementable and customisable, so that you can achieve the functionality you need in less time.

And that's what **z-amp-core** is, in a nutshell. It's a library that makes working with the excellent Web Audio API easier, enabling you to create amazing things without having to worry about some of the boring stuff.

---
Next Up: [Basic Concepts](./CONCEPTS.md)