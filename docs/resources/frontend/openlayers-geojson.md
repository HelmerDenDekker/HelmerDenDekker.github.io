# Klad: OpenLayers en GeoJson, grofweg hoe ik het aan de praat heb gekregen

*10-7-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

## *Outline*

Stukje bij beetje:

### One: styles

// the styles
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
"redLine": new Style({
stroke: new Stroke({
width: 7, color: "rgba(255, 0, 0, 1)",
}),
zIndex: 2,
}),
"whiteDash": new Style({
stroke: new Stroke({
width: 5, color: "rgba(255, 255, 255, 1)",
lineDash: [16, 28]
}),
zIndex: 3
}),
}

styles["LineString"] = [styles["redLine"], styles["whiteDash"]];


### ZerO; Marker

// const marker = new Feature({
// 	geometry: new Point([6, 51.7])
// })
// const markerLayer = new VectorLayer({
// 	source: new VectorSource({
// 		features: [marker],
// 	}),
// 	style: function (feature) {
// 		return styles[feature.getGeometry().getType()];
// 	},
// });
// //map.addLayer(markerLayer);



### Two: first step geoJson object

// const geojsonObject = {
// 	'type': 'FeatureCollection',
// 	'features': [
// 		{
// 			'type': 'Feature',
// 			'geometry': {
// 				'type': 'Point',
// 				'coordinates': [6.2, 52.5],
// 			},
// 		}],
// };

Mind features in source here!!

// const testVector = new VectorLayer({
// 	source: new VectorSource({
// 		features: new GeoJSON().readFeatures(geojsonObject),
// 	}),
// 	style: function (feature) {
// 		return styles[feature.getGeometry().getType()];
// 	},
// });
// //map.addLayer(testVector);

### Three: urlVector
//
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



## Resources
