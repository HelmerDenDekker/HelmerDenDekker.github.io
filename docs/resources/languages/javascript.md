# Javascript notes

* 9-5-2024*

Status: Done  
Type of post: Resource


## Intro

This sums up all I have learned in several Javascript courses. These are personal notes, saved as a resource in this repo

## Comparisons

[W3 schools comparisons](https://www.w3schools.com/js/js_comparisons.asp)

Comparing two JavaScript objects **always** returns **false**.  
When comparing two strings, "2" will be greater than "12", because (alphabetically) 1 is less than 2.  

Nullish coalescence operator: The `??` operator returns the first argument if it is not **nullish** (`null` or `undefined`).  

There is an Optional Chaining Operator (?.) returning undefined instead of throwing an error.  

## Loop

- `for/in` - loops through the properties of an object
- `for/of` - loops through the values of an iterable object

## Hoisting


Hoisting is (to many developers) an unknown or overlooked behavior of JavaScript.  

If a developer doesn't understand hoisting, programs may contain bugs (errors).  

To avoid bugs, always declare all variables at the beginning of every scope.  

## Use strict

“use strict”
[W3Schools strict](https://www.w3schools.com/js/js_strict.asp)

## Coding conventions

[W3Scools Coding conventions](https://www.w3schools.com/js/js_conventions.asp)

## Promises

[Promises W3Schools](https://www.w3schools.com/js/js_promise.asp)

## Queryselector 

If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the `querySelectorAll()` method.

## Arrays

[W3Schools Array methods](https://www.w3schools.com/js/js_array_methods.asp)

Pay attentions while using arrays in JavaScript. Some array functions will return, while others won't.
- ‘slice()’ returns a piece of the original array
- ’splice()’ overwrites the original
- ‘.toSpliced()’ returns a spliced version of the array

## Best practices

Avoid global variables
Avoid `new` 
Avoid  == 
Avoid eval()

Always Declare Local Variables
