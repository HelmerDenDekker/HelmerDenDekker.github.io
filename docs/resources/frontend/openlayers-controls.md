# Open layers extending the controls

*15-10-2024*

Status: Work in progress  
Type of post: Guide

## *Rapid fire thoughts*

Idea: I want my map to have a custom control element. So, any element that is placed inside the openlayers container, hovering on the map (in ui-speak).

It is easy to extend the controls in OpenLayers.

Just create a class that extends the Control class. Add the control element to the class and pass it to the super constructor.

And you are done! 
The control element will appear on the map.


You will probably need some css to style the control element.

This is the code for extending the controls in OpenLayers.

```js
import {Control} from "ol/control";

export class MyControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};

		// control element
		const element = document.createElement("div");
		element.id = "my-control-element";

		super({
			element: element,
			target: options.target,
		});
	}
}

```

## *Outline*

[//]: # ( ToDo: A guide with an example.) 

## Resources
