# Modern CSS

*18-9-2023*

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

## Example: the Xerbutri website version 6

Version 6.1.1 has an object-oriented approach to CSS. The assets are grouped by technology instead of functionality. In comparison with the previous version, there are many more files.

## Future

Towards vertical slices. 


## Resources