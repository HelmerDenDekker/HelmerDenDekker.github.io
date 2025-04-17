# How to handle hover on iOS touch-devices

*17-04-2025*

_Status: {Work in progress}_  
_Type of post: {Guide}_

## Problem statement

On iOS devices, when hovering over a hoverable element that hides or shows another element using visibility or display, the displayed element remains on-display.

For my website, this meant that when the user tapped the hoverable element, the menu unfolded as designed. However, on click it did not collapse until the site was reloaded.

If you have an iOS touch device, [here you can find an example of the problem.](https://helmerdendekker.github.io/example/css-menu-hddb.html){target="_blank"}.

## Solution

The ProWebDesign blog offers a set of work-arounds for this problem.

### No touch

The first thing I did was disabling the hover on touch devices. Because I did not want to rely on media queries, I decided to take it on the old-fashioned way:

```js
if (!("ontouchstart" in document.documentElement)) {
	document.documentElement.classList.add("no-touch");
}
```

And I added the class no-touch in my css to the elements that use display to hide or show on hover.

### Make the dropdown link clickable

Next I had to make the dropdown clickable. I did this by adding a click event to the dropdown link.
```js
else {
	let menuButton = document.getElementById("menu-button");
	menuButton.addEventListener("click", function () {
		document.getElementById("menu").classList.toggle("show");
		document.addEventListener("click", handleMenuDismiss, true);
	});
}

function handleMenuDismiss() {
	let menu = document.getElementById("menu");
	if (menu.classList.contains("show")) {
		menu.classList.remove("show");
		document.removeEventListener("click", handleMenuDismiss, true);
	}
}
```

I did not use the dismiss-layer from the popover example, because I want to menu to close when clicked (tapped) anywhere in the full document.

An example of the fix can be found [here](https://helmerdendekker.github.io/example/css-menu-hddt.html){target="_blank"}.


## Resources

[How to deal with :hover on touch screen devices](https://www.prowebdesign.ro/how-to-deal-with-hover-on-touch-screen-devices/)
[iOS has a :hover problem](https://humanwhocodes.com/blog/2012/07/05/ios-has-a-hover-problem/)