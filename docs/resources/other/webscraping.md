# Web scraping with C#

*26-7-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

I used the WebAgility tool for web scraping.

I scraped an old website of mine to get the content and put it in a new website.

It is so easy to use.

Just install the package.

```csharp
var web = new HtmlWeb();
var document = web.Load("http://example.com");
```

Then you can use the object to get the elements you want.

```csharp
var nodes = document.DocumentNode.SelectNodes("//a");
```

You get the node with a right click on the element in the browser and then copy the XPath.


## *Outline*

## Resources

[Html Agility pack](https://html-agility-pack.net/)