# BEM in CSS

*4-6-2025*

## What is BEM?

BEM is a methodology to structure your CSS.  
I got really confused from all the different explanations, but resource below is very good. A recap / shameless copy from the documentation:  

BEM stands for Block, Element, Modifier.

### Block

A functionally independent page component that can be reused.

The block name only describes its purpose, NOT its state or appearance.

The block should NOT influence its environment. (Do not set margin or positioning on the block.)

Blocks can be nested in any numbers of levels.

### Element

An element is a part of a block that has no standalone meaning and is semantically tied to its block.

The element name describes its purpose, NOT its state or appearance.
The element name is separated from the block name with a double underscore (`__`).
For example, `block__element`.

Elements can be nested in any numbers of levels.
An element is always part of a block.
An element is always a member (child) of a block.
```html
<div class="block">
  <div class="block__element1">
  	<div class="block__element2"></div>
  </div>
</div>
```

An element is NOT a part of an element, so you cannot have `block__element1__element2`.

An element is optional, not all blocks have elements.

### Modifier

A modifier is a flag on a block or element that changes its appearance, behavior, or state of a block or element.

### Generic rules

You also shouldn't use CSS tag or ID selectors when using BEM.

## File structure

The file structure can be:  
- nested
- flat
- flex

### Nested

Every block has its own folder, every element is a folder within that folder.
This requires you to assemble all the files together in a build step, which is not always possible.

### Flat

Simplified file structure (flat)

## What about javascript?

BEM is not only for CSS, but also for JavaScript.







## Resources

[Official documentation](https://en.bem.info/methodology/quick-start/)