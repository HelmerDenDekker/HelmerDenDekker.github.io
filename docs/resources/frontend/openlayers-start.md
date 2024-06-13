# Starting OpenLayers for Xerbutri 6

*13-6-2024*

Status: Work in progress  
Type of post: Guide/Resource

## *Rapid fire thoughts*

Write down how you did

## *Outline*

### Context

Xerbutri version 5 uses [OpenLayers](https://openlayers.org/) for displaying the blog locations on the map.

It was build in 2015-2016 based on Openlayers version 3 as a (set of) downloaded file(s). It was updated in 2018 to version 4.6.5.


The idea behind how to use JavaScript libraries changed to a more module-based approach. Back in the day, I just wrote some extensions in javascript, which I would never call extensions these days. It was more of a hack.

Anywayzzz

Version 9.2.4 is out now.
The newest version of Xerbutri is fully javascript based, works on a module-based approach and uses Vite as a bundler.
So, I  want my new OpenLayers implementation to be more modular and up-to-date.
How did I achieve this?

### The start

In this blog post I will document how I started all this. 

The openlayers documentation is very good. But.... It is a bit like the microsoft documentation, if you have levelled up a bit, you can read and understand it. If you feel like a beginner again (like me).... I did feel a bit lost.

I did take a look at the [QuickStart](https://openlayers.org/doc/quickstart.html). It is so good! Simple, and it get things done. And you can use it with Vite, which sounds good, because I also use it as bundler.

```js{4}
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
```

Which looks very much the same, and then again very different from my original code:

```js{4}
var mapview = new ol.View({
	center: ol.proj.fromLonLat([5.5, 52.5]),
	zoom: 8
});

var mapLayer = new ol.layer.Tile({
			source: new ol.source.OSM()
		});

var map = new ol.Map({
	controls: mapControls,
	target: 'map',
	layers: [mapLayer],
	view: mapView
});
```
Using <code>var</code> is not done anymore. But take a look. The code is very much the same. I am seriously happy to see an update from a >10 year old version to now is this smooth!

I just have to hit <code>npm install ol</code> in the terminal, import the packages and I am ready to go.

And within 15 minutes, reading included, I have a map on screen.

### Projections

OMG!  
Memories of this hell-hole returned to me. What projection do I want? 

Clearly, I want to use all the data stored in Xerbutri 5. So I need EPSG:4326. 

How do projections work in openlayers these days?  

Answer: [OpenLayers Tutorials: Raster reprojection](https://openlayers.org/doc/tutorials/raster-reprojection.html)

Thank you guys!!

This is easier than before.

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
```

Right? My map is centered somewhere in the atlantic ocean, while I want it to be in the Netherlands. This is because I use geographic coordinates, while the map uses some other.

How did I solve this in the past? I used a coordinate transformation function. I took a look at it: complicated.
I remembered the nice [examples](https://openlayers.org/en/latest/examples) the openlayers team put on their website. Go to the search bar, type in 'geographic' and you will find a lot of [examples](https://openlayers.org/en/latest/examples/geographic.html).

The first one gave me the right answer: the <code>useGeoGraphic()</code> function.

It is that easy! I know I spent days (or at least that's what it feels like a decade later) on the transformation. And again, it worked after 5 minutes. Typing this blog takes longer!

So, now I have a map, with the right projection, centered in the Netherlands.

### Conclusion

This was very easy to achieve. I am happy with the result.
Next step: Vector layers.



## Resources
[npm ol](https://www.npmjs.com/package/ol)