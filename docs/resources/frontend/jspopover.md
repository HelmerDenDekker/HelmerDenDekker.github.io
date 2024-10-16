# How to: Create a popover with JavaScript

*24-7-2024*

## Introduction

In the celebration of it being more than 20 years ago that I created my first popover with JavaScript and CSS. Somehow, I still manage to struggle with it. That is why I decided to write it all down, as a reference for future me.

## What is a popover?

Poppers, pop-ups and popovers. What is the difference?

Popover are  type of pop-up. A popover is non-modal, it has no backdrop (scrim) and it has a light dismiss.  
The first popover I created was a fold-out menu. It was very simple and only used CSS, because there were no smartphones and tablets back then.

I have created an [example of a popover](https://helmerdendekker.github.io/example/popover-example.html){target="_blank"}.

## How to create a popover?

I started out with the example from the [dialog modal blog](jsmodal.md).

Again, I start with the backdrop, but the backdrop is non-modal. That is why I will call this layer the dismiss. Because when I click anywhere out of the popover or the non-blocked elements-with-action of the page (links, buttons), I want the popover to close.

### Start with the dismiss-layer

In the html I create a dismiss element. This is the element that will close the popover when clicked.

```html
<div id="dismiss" class="dismiss"></div>
```

And the css for the dismiss-layer:

```css
.dismiss {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Above any elements with no z-index */
}
```

It is hidden by default, and it is an invisible layer.
  
### Create the popover

Inside the backdrop, I create the popover element. This is the element that will contain the popover content.

```html
<div class="popover">
	<p>The popover is non-intrusive. It does not expect an action, only interaction with elements within this popover. It has a light dismiss.</p>
	<button id="change-text-color">Change text color</button>
</div>
```

At first, for me, it felt a bit counter-intuitive, but in order to show the popover, it needs to be inside the dismiss-layer.  
The popover has a button to change the text color. When the user clicks the button, the text color will change to red.


In the body, there is a button element to open the popover. With JavaScript we manipulate the elements in order to make them do what we want:

```js
// declare the text div, in order to be able to change the text color
const text = document.getElementById("text");
	
// declare the dismiss div, which is the base element
const dismiss = document.getElementById("dismiss");

// declare the button that opens the modal
const open = document.getElementById("popover-open");

// declare the reset button (element in the body to reset the text color to black)
const reset = document.getElementById("reset-text");
reset.disabled = true;
		
// declare the change-text-color button
const color = document.getElementById("change-text-color");
			
// When the user clicks the open button, open the popover 
open.onclick = function() {
	dismiss.style.display = "block";
}

reset.onclick = function() {
	text.style.color = "black";
	reset.disabled = true;
}

color.onclick = function() {
	text.style.color = "red";
	reset.disabled = false;
}

dismiss.onclick = function(event) {
	if(event.target === dismiss) {
		dismiss.style.display = "none";
	}
}
```

I added the color-changing to show what a popover is for. The user can do other work when the popover is open. It is non-intrusive.

The most important bit are the last lines (dismiss.onclick). You need to register the onclick event on the dismiss element. When the user clicks the dismiss, the popover should close. This is the light-dismiss implementation. In lots of other examples, there is an action added to the window object. This works fine on the desktop (sometimes, depending on the example), but on mobile this will not work. You only want to dismiss if clicked on the dismiss element.
 
### Non-blocking!?!

If you implement the code above, you will notice that the popover is blocking all elements below the dismiss-layer.  

My trick to solve this is make them stand out. Make sure you define the elements position as something different from static, otherwise the z-index has no effect:

```css
#reset-text {
	position: relative;
	z-index: 2;
}
```


## Resources

[UX design bootcamp, about overlay types](https://bootcamp.uxdesign.cc/popups-dialogs-tooltips-and-popovers-ux-patterns-2-939da7a1ddcd)    


### Examples from the past

[Create an overlay with CSS (w3 schools, deprecated)](https://www.w3schools.com/howto/howto_css_overlay.asp)  
[Create a css/js modal (w3 schools, deprecated)](https://www.w3schools.com/howto/howto_css_modals.asp)  
