# Modern CSS

*18-9-2023 - updated 20-8-2025*

Status: Work in progress

## Example, the Xerbutri website version 5

The Xerbutri website was updated around 2018 to version 5.

It followed an MVC-pattern around PHP with Fat Free Framework. But not quite, because we made some alterations here and
there. For this article I want to focus on the CSS, because basically the CSS was constructed with the knowledge of
those days. Quite modern actually, because it had a responsive liquid design, which was far better than the fixed-page
design that originated from the early 2000s. (Version 4 had a liquified fixed page design for more than five
screen-sizes to make it work).

### CSS-mess

The CSS-files are a mess.  
For example: The homepage has 3 CSS files, all tuned to performance. A main one "index.css" for the mobile site, having
all the CSS for everything on the page. An "indexLarge.css" for large screens. It has a "indexFilter.css" for the filter
component (which was added at a later stage).

The problems encountered:
- Change is hard (difficult)
- The distance between the CSS and the HTML is large
- Optimized on screen-size and performance rather than maintainability
- It is impossible to debug


### CSS-structure

Write clean CSS.  

Use sensible grouping

Modular classes

Use meaningful class names

- Use BEM

## Example: the Xerbutri website version 6.1

Version 6.1.1 has an object-oriented approach to CSS. The assets are grouped by technology instead of functionality. In comparison with the previous version, there are many more files.

What do you mean, Helmer?

I created classes that represent objects. So my index page is an object. It inherits its base functionality from a statemachine-boss-class. The index has children, like the cards that should be rendered on screen.

I had my CSS structured along the lines of these classes, and their behaviour. All CSS files are grouped in one folder called css. All files are grouped in a folder called js. All images are grouped in a folder called images. All javascript-files are grouped in a folder called js.

So if I had to make a change to the filter of the cards on the index page, I had to look in multiple css-files in multiple folders.

## BEM for the Xerbutri website version 6.2

In version 6.2 the CSS is refactored to follow BEM principles, and more importantly, the Team Xerbutri code is now vertical sliced. 

What does this mean?

For example the index page has cards and a these cards have a filter.
So the css is now organized in a folder structure like this:

index > card > filter  

All the css, js-files, images and icons that belong to the filter are in the filter folder. 

So whenever I want to change something in the filter for the cards, this is the only place I have to look for my css and js files.
For example if I decide to delete the images used from the css, it is clear to me that these images are only used here, and nowhere else. So I can safely delete them.

### Sharing

There are also shared components, for example the header is the same in all the pages.
This is organized in a shared folder, so the header.css and header.js are in the shared folder.	

## Resources