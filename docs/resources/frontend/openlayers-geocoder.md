# OpenLayers Geocoder

*17-6-2024*

Status: Work in progress  
Type of post: Guide/Resource



## *Outline*

### Context

In the first part I started out with a centered map.
In the second part, I added a vector layer with a KML file.

This part concerns the implementation of [Geocoder](https://github.com/Dominique92/ol-geocoder).


### Geocoder

The fiddl of [jsfilld](https://jsfiddle.net/jonataswalker/c4qv9afb/)

<code> @import "ol-geocoder/dist/ol-geocoder.css";</code>


### Ol-Popup

You need the [ol-popup library](https://www.npmjs.com/package/ol-popup) to show the popup.

Import the CSS
in javascript with `import Popup from 'ol-popup';`

<code> @import "ol-popup/src/ol-popup.css";</code>

### Conclusion

Geocoder does not seem to work with useGeographic()


## Resources
[OpenLayers Style API](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html#clone)  
[GeoJson example](https://openlayers.org/en/latest/examples/geojson.html)  