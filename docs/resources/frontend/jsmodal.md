# How to: Create a dialog modal with JavaScript

*24-7-2024*

## Introduction

In the celebration of it being more than 20 years ago that I created my first modal with JavaScript and CSS, and I never wrote about this stuff. Overlays, modals, popovers still seem to confuse people. Every time I go on the internet to look for what is what, I get different answers all the time. That is why I decided to create some examples for me, as a resource for future projects.


## What is a dialog?

The [ux design bootcamp](https://bootcamp.uxdesign.cc/popups-dialogs-tooltips-and-popovers-ux-patterns-2-939da7a1ddcd) has a nice explanation of the differences between overlays, tooltips, popovers and dialogs.  
A dialog is a type of overlay that is used to display an important message and ask for user input. Most dialogs are an overlay of the modal type. This means that the user cannot interact with the rest of the page until the dialog is closed. Closing a dialog is done with an explicit dismiss action, like clicking a button or pressing the escape key.  

I have created an [example of a dialog](https://helmerdendekker.github.io/example/dialog-example.html){target="_blank"}.

## How to create a dialog?

Google is your friend right? Or maybe these days copilot is. While searching for examples:
- You never really seem to get the right dialog behaviour (modal and explicit dismiss in my case)
- The examples I found on w3-schools are a bit outdated. Also, that modal example does not work in mobile browsers.

So, I decided to write my own.

### Start with the backdrop

In the html I create a backdrop element. This is the element that will block all user interaction.

```html
<div id="backdrop" class="backdrop"></div>
```

And the css for the backdrop (or scrim):

```css
.backdrop {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* black with opacity 50% */
    z-index: 1; /* Sit on top */
}
```

It is hidden by default, but when the dialog is shown, it will be displayed. I need JavaScript for making that happen.


### Create the dialog

Inside the backdrop, I create the dialog element. This is the element that will contain the dialog content.

```html
<div class="dialog">
	<p>The dialog modal expects an action from the user. This is disruptive to the users work flow. It has an explicit dismiss.</p>
	<button id="dialog-cancel">Cancel</button>
	<button id="dialog-submit">OK</button>
</div>
```

At first, for me, it felt a bit counter-intuitive, but in order to show the dialog, it needs to be inside the backdrop. Otherwise we will not be able to interact with it.

I added some css to make it nicer, but that is not important.

The most important part is the JavaScript that will show the dialog.

In the body I added a button element to open the dialog:

```html
<button id="dialog-open">Open Dialog</button>
```

The Javascript is what makes it happen.

```js
// declare the backdrop, which is the base element
const backdrop = document.getElementById("backdrop");

// declare the button that opens the modal
const open = document.getElementById("dialog-open");

// declare the cancel button
const close = document.getElementById("dialog-cancel");
		
// declare the submit button
const submit = document.getElementById("dialog-submit");

// When the user clicks the open button, open the modal 
open.onclick = function() {
	backdrop.style.display = "block";
}

// When the user clicks on the close button, close the modal
close.onclick = function() {
	backdrop.style.display = "none";
}

// When the user clicks on the submit button, close the modal
submit.onclick = function() {
	backdrop.style.display = "none";
}
```

This is the basic setup for a dialog modal.
I think the code explains itself. When the user clicks the open button, the backdrop element is shown. When the user clicks the close or submit button, the backdrop element is hidden.

It is not perfect, but it is a good start. It has most of the functionality you need for a dialog modal.

## Conclusion

Creating a dialog modal is not that difficult. It is a matter of creating the right elements and adding the right css and javascript. That is always the case, right? I hope this example helps you to create your own dialog modal.


## Resources

[Dialog material design](https://m3.material.io/components/dialogs/overview)  
[UX design bootcamp, about overlay types](https://bootcamp.uxdesign.cc/popups-dialogs-tooltips-and-popovers-ux-patterns-2-939da7a1ddcd)  

### Examples from the past
[Create an overlay with CSS (w3 schools, deprecated)](https://www.w3schools.com/howto/howto_css_overlay.asp)  
[Create a css/js modal (w3 schools, deprecated)](https://www.w3schools.com/howto/howto_css_modals.asp)  
