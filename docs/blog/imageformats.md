# Image format support in dotNet: from JPG to WebP on Windows OS
*12-1-2024*

## Introduction

My Question:  
Which packages support JPEG (.jpg), WebP (.webp) and Portable Network Graphics (.png)?

Image formats are not really file formats, rather compression mechanisms.

## Boundary conditions

As in TX test


https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat.webp?view=dotnet-plat-ext-8.0
How to
https://github.com/dotnet/runtime/issues/70418

https://stackoverflow.com/questions/75988248/save-a-webp-file-with-system-drawing-imaging-generates-a-big-file-size-or-encode
https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat?view=dotnet-plat-ext-8.0

Test the formats, and inspect the results!

Every format not supported silently falls back to PNG.
For webp Skia fallback was used: SkiaSharp.Views.Desktop.Common

### ImageSharp

https://docs.sixlabors.com/articles/imagesharp/imageformats.html

### Magick.NET

https://imagemagick.org/script/formats.php

### MagicScaler

https://photosauce.net/blog/post/introducing-magicscaler


### SkiaSharp

https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/graphics/skiasharp/bitmaps/saving
https://learn.microsoft.com/en-us/dotnet/api/skiasharp.skencodedimageformat?view=skiasharp-2.88

In Xamarin, For all the other formats, the Encode method writes nothing into the stream and the resultant byte array is empty.

### ImageFlow

https://docs.imageflow.io/json/encode.html

This produced a lot of broken and corrupted files again, need to look into this.

## Follow up

## Resources

Inspiration:  
[.NET Core Image Processing](https://devblogs.microsoft.com/dotnet/net-core-image-processing/)

Packages:  
[PhotoSauce](https://photosauce.net/)