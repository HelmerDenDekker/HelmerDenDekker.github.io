# OpenLayers The vector layers

*13-6-2024*

Status: Work in progress  
Type of post: Guide/Resource

## *Rapid fire thoughts*

Write down how you did

## *Outline*

### Context

In the first part I started out with a centered map.

In the Xerbutri map, KML-files are used to display the data. I want to display the data in the same way.

### Vector layers

Vector layers are used to display data in the form of points, lines, and polygons.
In simplest form, for the Team Xerbutri website, these are points on the map.

The data comes from a KML file.

Again, go to the examples, type KML in the search bar, and see what comes up: [The exact example I used the last time](https://openlayers.org/en/latest/examples/kml.html)

This one will be easy and quick! Right?

```js{4}
const tunnelVector = new VectorLayer({
	source: new VectorSource({
		url: '../kml/tunnel.kml',
		format: new KML({
		})
});
	
const raster = new TileLayer({
	source: new OSM({
		projection: 'EPSG:4326'
	})
});

const map = new Map({
	target: 'map',
	layers: [raster, tunnelVector],
	view: new View({
		projection: 'EPSG:3857',
		center: [6, 51.7],
		zoom: 8
	}),
	controls: defaultControls()
});
```

But it does not work. Even copying the exact example will not work. 
I have no idea why, and no errors in the console to help me.

```js{4}
const tunnelVector = new VectorLayer({
	source: new VectorSource({
		url: '../kml/tunnel.kml',
		format: new KML({
		})
});
	
const raster = new TileLayer({
	source: new OSM({
		projection: 'EPSG:4326'
	})
});

const map = new Map({
	target: 'map',
	layers: [raster, tunnelVector],
	view: new View({
		projection: 'EPSG:3857',
		center: [6, 51.7],
		zoom: 8
	}),
	controls: defaultControls()
});
```

### What does work?

Simply adding a point to the center of the map:

```js{4}
const raster = new TileLayer({
	source: new OSM({
		projection: 'EPSG:4326'
	})
});

const map = new Map({
	target: 'map',
	layers: [raster],
	view: new View({
		projection: 'EPSG:3857',
		center: [6, 51.7],
		zoom: 8
	}),
	controls: defaultControls()
});
	
const marker = new Feature({
	type: 'icon',
	geometry: new Point([6, 51.7])
})

const styles = {
	'icon': new Style({
		image: new Circle({
			radius: 7,
			fill: new Fill({color: 'rgba(255, 0, 0, 1)'}),
			stroke: new Stroke({
				color: 'rgba(255, 255, 255, 1)',
				width: 2,
			}),
		}),
	}),
}

const markerLayer = new VectorLayer({
	source: new VectorSource({
		features: [marker],
	}),
	style: function (feature) {
		return styles[feature.get('type')];
	},
});
map.addLayer(markerLayer);
```

Note to self: For the icon as image, I need the absolute source path for vite...


### KML or GeoJson

Why do kml-files not wor[2012-02-10.kml](..%2F..%2F..%2F..%2F..%2FUsers%2FHelmerdenDekker%2FDownloads%2F2012-02-10.kml)k?

Local File Access:  By default, OpenLayers' HTTP protocol cannot load files directly from your local machine due to security restrictions.  If your KML file is local, you'll need to use a different approach,  like serving it through a web server

Adding the kml as url does work:

```js{4}
const vector = new VectorLayer({
	source: new VectorSource({
		url: 'https://openlayers.org/en/latest/examples/data/kml/2012-02-10.kml',
		format: new KML({
		})
	}),
});
map.addLayer(vector);
```
As I am using vite, it does load the kml from the assets location, which it needs as a base.
Using the local file path works.
```js{4}
const vector = new VectorLayer({
	source: new VectorSource({
		url: 'assets/kml/2012-02-10.kml',
		format: new KML({
		})
	}),
});
map.addLayer(vector);
```

Conclusion (for now 14-6-2024) is that there is something wrong with my kml.

### Changing the style

Changing the style is relly eady, but I could not find an easy description of how to do that. 

It was a bit like throwing pizza at the wall, and see what sticks.

What I think this does, 

```js{4}
const vector = new VectorLayer({
	source: new VectorSource({
		url: 'assets/kml/2012-02-10.kml',
		format: new KML({
		})
	}),
	style: function (feature) {
			return styles[feature.get('type')];}
});
map.addLayer(vector);

vector.getSource().on('featuresloadend', function (event) {
		event.features.forEach(function (feature) {
			feature.set('type', 'icon');
		});
	});
```
Which overrides all the styles in the kml and shows the icon style.




## Resources
[npm ol](https://www.npmjs.com/package/ol)