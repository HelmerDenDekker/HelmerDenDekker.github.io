# Image format support in dotNet: from JPG to WEBP on Windows OS
*11-1-2024*

## Introduction

My Question:  
Which packages support JPEG (.jpg), WEBP (.webp) and Portable Network Graphics (.png)?

## Boundary conditions



### Packages summarized

A summary of the packages used in this table:

| Package                                                                |                                                                               License | Published | Version | Downloads |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------------:|----------:|--------:|----------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common) |                                                                                   MIT |   11-2023 |   6.0.0 |  1124.1 M |
| [ImageSharp](https://github.com/SixLabors/ImageSharp)                  | [Six Labors split](https://www.nuget.org/packages/SixLabors.ImageSharp/3.1.1/license) |   12-2023 |   3.1.1 |    77.6 M |
| [Magick.Net](https://github.com/dlemstra/Magick.NET)                   |                                                                            Apache 2.0 |   12-2023 |  13.5.0 |    15.0 M |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)   |                                                                                   MIT |   10-2023 |  0.14.0 |     0.7 M |
| [SkiaSharp](https://github.com/mono/SkiaSharp)                         |                                                                                   MIT |    9-2023 |  2.88.6 |    69.1 M |
| [FreeImage](https://github.com/LordBenjamin/FreeImage.Standard)        |                           [Free Image](https://freeimage.sourceforge.io/license.html) |    6-2019 |   4.3.8 |    0.07 M |
| [ImageFlow](https://github.com/imazen/imageflow-dotnet)                |                                                                tri or bi-license AGPL |    9-2023 |  0.10.2 |     0.3 M |

### Format support


A summary of the packages used in this table:

| Package                                                                |                                       Formats |
|------------------------------------------------------------------------|----------------------------------------------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common) | Webp PNG Gif Wmf Exif Emf Heif Icon Jpeg Tiff |
| [ImageSharp](https://github.com/SixLabors/ImageSharp)                  |            WebP PNG Gif Tga Tiff Pdm Jpeg Bmp |
| [Magick.Net](https://github.com/dlemstra/Magick.NET)                   |                  WebP PNG Gif and ~100 others |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)   |      WebP PNG Gif and any WIC codec installed |     
| [SkiaSharp](https://github.com/mono/SkiaSharp)                         |                                  JPG PNG WebP |      
| [ImageFlow](https://github.com/imazen/imageflow-dotnet)                |                                  JPG PNG WebP |     

### system.Drawing

Has support on windows GDI+ since windows 10- 1089
https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat.webp?view=dotnet-plat-ext-8.0
How to
https://github.com/dotnet/runtime/issues/70418

https://stackoverflow.com/questions/75988248/save-a-webp-file-with-system-drawing-imaging-generates-a-big-file-size-or-encode
https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat?view=dotnet-plat-ext-8.0

Test the formats, and inspect the results!

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


## Follow up

## Resources

Inspiration:  
[.NET Core Image Processing](https://devblogs.microsoft.com/dotnet/net-core-image-processing/)

Packages:  
[PhotoSauce](https://photosauce.net/)