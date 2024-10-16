# Klad: OpenLayers en GeoJson, grofweg hoe ik het aan de praat heb gekregen

*10-7-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

## *Outline*

Stukje bij beetje:

### 1 Define styles


For clarity, I am using the GeoJSON nomenclature here.
- Point is a geometry type in GeoJson, it represents a point on the map.
- LineString is also a geometry type in GeoJson, it represents a line on the map.


```js{4}
const styles = {
	"Point": new Style({
		image: new Circle({
			radius: 7,
			fill: new Fill({color: "rgba(255, 0, 0, 1)"}),
			stroke: new Stroke({
				color: "rgba(255, 255, 255, 1)",
				width: 2,
			}),
		}),
	}),
	"LineString": new Style({
		stroke: new Stroke({
			width: 7, color: "rgba(255, 0, 0, 1)",
			}),
		zIndex: 2,
	}),
}
```

### 2 Marker

In my step-by-step approach I first created a marker.

```js{4}
const marker = new Feature({
	geometry: new Point([6, 51.7])
	})
	
const markerLayer = new VectorLayer({
 	source: new VectorSource({
 		features: [marker],
 	}),
 	style: function (feature) {
 		return styles[feature.getGeometry().getType()];
 	},
 });

map.addLayer(markerLayer);
```

This marker is in GeoJson style with a Point geometry. Which means it is a point on the map.

I added the marker as a feature to a VectorLayer. In the style function I am using the GeoJson-special GetGeometry to get the Geometry object, of which I get the type (Point or LineString). This type is used to get the correct style from the styles object.

As a last step I added the vector layer to the map. It is that simple.

Now, the point is on the map. But this has little to do with GeoJson.

### 3 Create a GeoJson object

I created a GeoJson object in the code itself. This is a simple object with a Point geometry.

```js{4}
const geojsonObject = {
 	'type': 'FeatureCollection',
 	'features': [
		{
			'type': 'Feature',
 			'geometry': {
 				'type': 'Point',
 				'coordinates': [6.2, 52.5],
 			},
 		}],
	};
```

I like it because you can follow the style function, getting the feature, next the geometry, and its type.

In the VectorLayer, I added the GeoJson object to the features of this layer. Mind me I made the mistake to put "format" in there instead of features, but that does not work. To get the features from the geoJsonObject, use the readFeatures method.

```js{4}
const geojsonVector = new VectorLayer({
	source: new VectorSource({
		features: new GeoJSON().readFeatures(geojsonObject),
		}),
	style: function (feature) {
		return styles[feature.getGeometry().getType()];
		},
	});

map.addLayer(geojsonVector);
```

### 4 Get JSON from an url address

In real life, we get jsons from an url address. This is the last step:

```js{4}
const urlVector = new VectorLayer({
	source: new VectorSource({
	url: "data/testgeo.json",
	format: new GeoJSON(),
	}),
	style: function (feature) {
		return styles[feature.getGeometry().getType()];
		},
	});
	
map.addLayer(urlVector);
```

map.addLayer(urlVector);



## Resources
