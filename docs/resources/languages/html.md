# {Title}

*24-4-2024*

Status: Done  
Type of post: Resource

## *Rapid fire thoughts*

## Intro

This sums up all I have learned in several HTML courses. These are personal notes, saved as a resource in this repo

### Standards 

- W3C recommends lowercase in HTML, and demands lowercase for stricter document types like XHTML.
- **recommends** lowercase attributes in HTML, and **demands** lowercase attributes for stricter document types like XHTML.
- W3C **recommends** quotes in HTML, and **demands** quotes for stricter document types like XHTML.
- `<hr >` and `<br >` tags are without backslash
- Always specify the width and height of an image. If width and height are not specified, the web page might flicker while the image loads.
- Use the figcaption tag for captions
- Use Lower Case File Names
- HTML files should have a **.html** extension
- Browser support for entity numbers **&#60;** is better than name **&lt;**



### HTML formatting

In the first course I followed on HTML, somewhere in the early 2000s, using a formatting tag was not done, because HTML was about hypertext structure, CSS was for style, and the tags mess around with the style.  
However there is more to the world than visual browsers, and using formatting helps text readers that do not look at the css. Bonus points for accessability!

- `<pre >` tag is for preformatted text
- `<del >` tag is for deleted etc.

For more formatting tags see: [W3schools HTML formatting](https://www.w3schools.com/html/html_formatting.asp)

I can use the `<code>` and `<samp>` tags in the blogs, however I cannot do that if the code example interferes with markdown.

I tried using the code tag in the unit test for pieces of code, but that does not work. I do use it to indicate a method name, for example: <code>InvokeAsync</code>.

The `<samp>` tag can be used for sample responses, or things I use bash for, like:
<p><samp>Add-Migration {MigrationName} </samp> </p>


### HTML Quotation and citation

Use the `<blockquote>` tag for quotations or the `<q>` element for short quatations.  
You can add meaning to abbreviations by using the `<abbr>` tag.

[W3schools HTML formatting](https://www.w3schools.com/html/html_quotation_elements.asp)

### HTML colors 
- 140 color names in HTML: https://www.w3schools.com/colors/colors_names.asp

### CSS 
- CSS inline - internal - external
- Internal CSS => style tag is in the head tag.
- External is with a stylesheet

### HTML lists

- Description list with `<dl>` `<dt>` and `<dd>` tags 

Example:
 <dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl> 

- CSS list-style-type
- List as nested list 
- Use an attribute to give an A, 1 or I (roman) to ordered lists. Start attribute sets the start number. 
- You can nest ordered lists as well


### Other

- Base tag for the base url
- Summary: https://www.w3schools.com/html/html_examples.asp

### Javascript related 
- with SVG images and JavaScript you can change the color, for example in case of a dark mode
- Use webstorage with javascript to store user related data
- Use javascript [web workers](https://www.w3schools.com/html/html5_webworkers.asp) to run background tasks
- Use SSE for one-way push messaging.[Server Sent Events API](https://www.w3schools.com/html/html5_serversentevents.asp)



