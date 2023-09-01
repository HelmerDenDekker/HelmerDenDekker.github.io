# Web Components
*31-8-2023*

Status: Work in progress

## Web components?

I was used to creating web components in a framework. For example in the Xerbutri website using PHP, in the GPR websites using dotNET MVC partial views, or in VueJS using web components.

Web components are (a set of) web platform API's that allow us to create custom reusable and encapsulated html tags to use in web pages.

For example, in PHP I had a piece of code named header.html, which PHP would grab and insert into any html template page. In the fourth version I wrote my own framework, for the fifth version I used Fat Free Framwork to do the templating implementation for me.

However, we do not need 3rd party libraries or framework to use Web components.

## Custom elements

You can create your own custom HTML tags.
In JavaScript you just extend the HTMLElement


```js{4}
class Customized extends HTMLElement {...}
window.customelements.define('customized', Customized);
```

### LifeCycle methods

constructor(): initialize, event listeners, state
connectedCallback(): element inserted to the DOM
disconnectedCallback(): element removed from the DOM
attributeChangedCallback(attributeName, oldValue, newValue): When attribute is added, removed, updated or replaced.

## Shadow DOM

Used for self-contained components
Scoped styles (style and markup encapsulated)

## HTML templates

HTML and CSS 
Use slots to make it dynamic



## Resources

[HelmerDemo webcomponents GitHub repo](https://github.com/HelmerDenDekker/HelmerDemo.WebComponents)

[WebComponents.org](https://webcomponents.github.io/)

[Web components crash course](https://www.youtube.com/watch?v=PCWaFLy3VUo)