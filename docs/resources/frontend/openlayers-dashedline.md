# OpenLayers: How to create a dashed line

*22-7-2024*

## Intro  

I am updating an old openlayers project to the newest version. And back in the day (2013?) I figured out how to create dashed lines with openlayers. In the newest version that no longer works. So I had to figure out how to do it again.

## Create a dashed line  

Here you are:  

```js{4}
const styles = {
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
```

You can concatenate the styles by putting them in an array.  

An example is shown on the team xerbutri maps page: [Team Xerbutri map](https://teamxerbutri.github.io/map)  

## Conclusion

Creating a dashed line is very easy if you know how to do it. :-)


