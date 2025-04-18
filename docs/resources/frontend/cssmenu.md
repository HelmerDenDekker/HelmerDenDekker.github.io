# How to create a dropdown-menu with CSS

*17-4-2025*

## Creating a CSS menu

Ever since I discovered CSS to create a menu (in 2004?) I try to create my menus using CSS only, and avoiding
JavaScript.  
It is not that I dislike JavaScript, it just makes thing so complex.

I started out with the W3 schools example, and having read many others, I just found them to work with float. And I do
not like float.

### The very first menu I ever made

I created an [example of my first menu](https://helmerdendekker.github.io/example/css-menu-one.html){target="_blank"}.
It is all in Dutch.  
It is a very simple menu using just CSS. 
It uses the hover-effects, active and visited to provide user-feedback.
However, it is not 2004 anymore and websites have evolved. These days most websites look a lot cleaner.

## What did I want to achieve?

For the newest website, the look need to be much cleaner.  

I want a menu:
- that appears when hovering over the menu icon.
- that shows the drop-down menu so you can select the item you want.
- that closes when you hover outside the menu.
- on mobile, the menu should appear on click, and close when you click outside the menu.

And I would like to use CSS only, and no JavaScript.

## Problems encountered

### Mixing buttons and anchors

I wanted to use buttons for the dropdown elements, and anchors for the links.
So I had something like this:

```html
<ul class="main-menu">
	<li>
		<a href="#"><svg></svg></a>
	</li>
	<li class="dropdown">
		<button ><svg></svg></button>
		<ul class="dropdown-content">
			<li><a href="#">Sub-1</a></li>
			<li><a href="#">Sub-2</a></li>
			<li><a href="#">Sub-3</a></li>
		</ul>
	</li>
</ul>
```

This works fine in most browsers, except for everything in iOS. Because for some reason, the button does not line-up with the links.

I tried to reproduce this [example of mixing a and button](https://helmerdendekker.github.io/example/css-menu-hdd.html){target="_blank"}.  
But in this example, the button is not aligned with the links everywhere.  
I was waisting my time finding out why. So I stopped and decided to use anchors for everything.

### Tabbing

I want to be able to tab through the submenu items as well. Thanks to [this nice CSS-tricks blog](https://css-tricks.com/solved-with-css-dropdown-menus/) I found out that you can use the `:focus-within` pseudo-class.

### Finally

I ended up with something like [this example](https://helmerdendekker.github.io/example/css-menu-hddb.html){target="_blank"}.

It's not really the final version, but it is a good start.

In the end, I ended up with a nice CSS-only dropdown. However, while testing this on iOS, it did not work as intended.
More about that problem in the next article: [How to handle hover on iOS touch-devices](ioshover.md).

## Resources

[W3S CSS Dropdowns](https://www.w3schools.com/Css/css_dropdowns.asp)  
[W3S How to CSS Dropdown](https://www.w3schools.com/howto/howto_css_dropdown.asp)  
[W3S Clickable Dropdown with JS](https://www.w3schools.com/howto/howto_js_dropdown.asp)  
[CSS-tricks Dropdown Menu](https://css-tricks.com/solved-with-css-dropdown-menus/)  
