# Image resize in dotNet: from JPG to Webp on Windows OS
*14-1-2024*

## Introduction

Automating the picture resize process.
I used about the same packages from the [image resize test](/imageresize), more realistic scenario for Team Xerbutri.


## Boundary conditions

In this test I used the 12 pictures.

This test:
- uses 12 pictures of approx 4500kB size each, ~6000 x ~4000 px 
- resizes to 80px, 320px, 768px, 1280px
- benchmarking of load, resize and save operations
- using .NET 8
- using Windows 11 only
- saves the original jpeg as 95% quality jpeg format, png and webp in different sizes

### Packages summarized

A summary of the packages used in this table:

| Package                                                                |                                                                               License | Published | Version | Downloads |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------------:|----------:|--------:|----------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common) |                                                                                   MIT |    1-2024 |   8.0.1 |  1161.2 M |
| [ImageSharp](https://github.com/SixLabors/ImageSharp)                  | [Six Labors split](https://www.nuget.org/packages/SixLabors.ImageSharp/3.1.1/license) |    1-2024 |   3.1.2 |    80.5 M |
| [Magick.Net](https://github.com/dlemstra/Magick.NET)                   |                                                                            Apache 2.0 |   12-2023 |  13.5.0 |    15.5 M |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)   |                                                                                   MIT |   10-2023 |  0.14.0 |     0.7 M |
| [SkiaSharp](https://github.com/mono/SkiaSharp)                         |                                                                                   MIT |    1-2024 |  2.88.7 |    72.3 M |
| [ImageFlow](https://github.com/imazen/imageflow-dotnet)                |                                                                tri or bi-license AGPL |    9-2023 |  0.10.2 |     0.6 M |


### Format support


A summary of the packages used in this table:

| Package                                                                |                                   Formats |
|------------------------------------------------------------------------|------------------------------------------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common) |                    GDI+ codecs (Jpeg PNG) |
| [ImageSharp](https://github.com/SixLabors/ImageSharp)                  |                  Jpeg PNG WebP and others |
| [Magick.Net](https://github.com/dlemstra/Magick.NET)                   |             Jpeg PNG WebP and ~100 others |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)   | Jpeg WebP PNG and any WIC codec installed |     
| [SkiaSharp](https://github.com/mono/SkiaSharp)                         |                             Jpeg PNG WebP |      
| [ImageFlow](https://github.com/imazen/imageflow-dotnet)                |                             Jpeg PNG WebP |     

### System.Drawing.Common

Webp has support on windows GDI+ since windows 10- 1089. However, it depends on the codec installed on your system.  
If no codec can be found, System.Drawing will silently fall back to PNG.  

In this case the Skia fallback was used, making use of the SkiaSharp.Views.Desktop.Common package.

## Results in numbers

The results of this test

### Time elapsed

The time elapsed is just an indication, as run on my laptop. So please just focus on the ratio.


Total time elapsed:

![Time total](../assets/images/imageformat/totaltime.svg "Total time elapsed")

This is not optimized at this moment. For Magick.Net three separate processes are spun up to handle the images. I can imagine this takes time (and memory), making it three times slower.
I just spent max 15 minutes per package to do this stuff, I had no more time to spare. Please let me know if you want to improve, or have ideas. 

#### Conclusion

...//ToDo

### Memory usage

The next picture shows allocated memory usage. For your machine this does not matter, as generally speaking the amount of memory on your own machine is sufficient. If you have functions or other an app in the cloud where you pay for memory (or simply crash on memory overload), this is very relevant.

![Memory used](../assets/images/imageformat/memory.svg "Allocated memory")

Cloning in ImageSharp uses insane amount of memory, 400 times more than other the apps.
//ToDo

#### Conclusion

//ToDo

### File size

![File size](../assets/images/imageformat/filesize.svg "File size")

The Magicscaler PNG is not a mistake.

## Quality

ImageFlow did not produce usable output. Will investigate later.

### Fireworks

So, fireworks. What is happening?

| Package        |                                                                                                                           JPG | PNG                                                                                                                           | Webp                                                                                                                              |
|----------------|------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| System.Drawing | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat/Vuurwerk2020-SystemDrawing-320.jpg "Vuurwerk2020 System.Drawing") | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat/Vuurwerk2020-SystemDrawing-320.png "Vuurwerk2020 System.Drawing") | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat/Vuurwerk2020-SystemDrawing-320-SK.webp "Vuurwerk2020 System.Drawing") |
| ImageSharp     |            ![Vuurwerk2020-ImageSharp](../assets/images/imageformat/Vuurwerk2020-ImageSharp-320.jpg "Vuurwerk2020-ImageSharp") | ![Vuurwerk2020-ImageSharp](../assets/images/imageformat/Vuurwerk2020-ImageSharp-320.png "Vuurwerk2020-ImageSharp")            | ![Vuurwerk2020-ImageSharp](../assets/images/imageformat/Vuurwerk2020-ImageSharp-320.webp "Vuurwerk2020-ImageSharp")               |
| Magick.Net     |               ![Vuurwerk2020-MagickNET](../assets/images/imageformat/Vuurwerk2020-MagickNET-320.jpg "Vuurwerk2020-MagickNET") | ![Vuurwerk2020-MagickNET](../assets/images/imageformat/Vuurwerk2020-MagickNET-320.png "Vuurwerk2020-MagickNET")               | ![Vuurwerk2020-MagickNET](../assets/images/imageformat/Vuurwerk2020-MagickNET-320.webp "Vuurwerk2020-MagickNET")                  |
| MagicScaler    |         ![Vuurwerk2020-MagicScaler](../assets/images/imageformat/Vuurwerk2020-MagicScaler-320.jpg "Vuurwerk2020-MagicScaler") | ![Vuurwerk2020-MagicScaler](../assets/images/imageformat/Vuurwerk2020-MagicScaler-320.png "Vuurwerk2020-MagicScaler")         | ![Vuurwerk2020-MagicScaler](../assets/images/imageformat/Vuurwerk2020-MagicScaler-320.webp "Vuurwerk2020-MagicScaler")            |
| SkiaSharp      |               ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat/Vuurwerk2020-SkiaSharp-320.jpg "Vuurwerk2020-SkiaSharp") | ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat/Vuurwerk2020-SkiaSharp-320.png "Vuurwerk2020-SkiaSharp")               | ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat/Vuurwerk2020-SkiaSharp-320.webp "Vuurwerk2020-SkiaSharp")                  |

The same thing is basically happening in every picture, but here the differences are perfectly visible.

System.Drawing: In the JPG there is this weird white-versus-color thing going on. I miss the red! The PNG is a bit better. The skia-saved webp is much too white!
ImageSharp: The PNG has much more red compared to the JPG. The PNG looks like the original. For Webp the colors seem off.
Magick.NET: The JPG is perfect, spot on. The PNG as well. The Webp: Where have the colors gone?
Magicscaler is very white. 
SkiaSharp: I like their take on the fireworks, because it is a bit less sharp, but it has a lot of blurring and edge halo going along. I need to fix this with the trick on Github.


### Another light-dark example with details

| Package        |                                                                                                                           JPG | PNG                                                                                                                           | Webp                                                                                                                              |
|----------------|------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| System.Drawing | ![P1120836A System.Drawing](../assets/images/imageformat/P1120836A-SystemDrawing-320.jpg "P1120836A System.Drawing") | ![P1120836A System.Drawing](../assets/images/imageformat/P1120836A-SystemDrawing-320.png "P1120836A System.Drawing") | ![P1120836A System.Drawing](../assets/images/imageformat/P1120836A-SystemDrawing-320-SK.webp "P1120836A System.Drawing") |
| ImageSharp     |            ![P1120836A-ImageSharp](../assets/images/imageformat/P1120836A-ImageSharp-320.jpg "P1120836A-ImageSharp") | ![P1120836A-ImageSharp](../assets/images/imageformat/P1120836A-ImageSharp-320.png "P1120836A-ImageSharp")            | ![P1120836A-ImageSharp](../assets/images/imageformat/P1120836A-ImageSharp-320.webp "P1120836A-ImageSharp")               |
| Magick.Net     |               ![P1120836A-MagickNET](../assets/images/imageformat/P1120836A-MagickNET-320.jpg "P1120836A-MagickNET") | ![P1120836A-MagickNET](../assets/images/imageformat/P1120836A-MagickNET-320.png "P1120836A-MagickNET")               | ![P1120836A-MagickNET](../assets/images/imageformat/P1120836A-MagickNET-320.webp "P1120836A-MagickNET")                  |
| MagicScaler    |         ![P1120836A-MagicScaler](../assets/images/imageformat/P1120836A-MagicScaler-320.jpg "P1120836A-MagicScaler") | ![P1120836A-MagicScaler](../assets/images/imageformat/P1120836A-MagicScaler-320.png "P1120836A-MagicScaler")         | ![P1120836A-MagicScaler](../assets/images/imageformat/P1120836A-MagicScaler-320.webp "P1120836A-MagicScaler")            |
| SkiaSharp      |               ![P1120836A-SkiaSharp](../assets/images/imageformat/P1120836A-SkiaSharp-320.jpg "P1120836A-SkiaSharp") | ![P1120836A-SkiaSharp](../assets/images/imageformat/P1120836A-SkiaSharp-320.png "P1120836A-SkiaSharp")               | ![P1120836A-SkiaSharp](../assets/images/imageformat/P1120836A-SkiaSharp-320.webp "P1120836A-SkiaSharp")                  |

This is nitpicking, but for the picture-perfectionists:

System.Drawing: The color-loss is a lot less visible, but pay close attention to the nostril-things of the dragon. The black is not black, but there is this huge weird edge halo thing going on. The PNG looks fine, like the original. The Webp has some red-loss, but looks fine in details.    
ImageSharp: Same as system.drawing, but a tiny bit better. The PNG looks like the original. I really hate the loss of the red in webp. The red of the dragon was really red and cool, but it is almost flat here. Also do you see how blurry it is. The rope is gone! 
Magick.NET: What happened in the JPEG? The fireworks was fine, and now... The red is gone. It is sharper than ImageSharp and System.Drawing. The PNG looks great. The Webp: Where did the colors go?
Magicscaler: compare this to the fireworks. In the snow-pictures the white is more dominant, it is aan issue. All three dragon pictures look okay to me.  
SkiaSharp: It is just not sharp.



#### Conclusion

Grades 1-10

| Package        | JPG | PNG  | Webp |
|----------------|-----|------|------|
| System.Drawing | 7.5 | 8.5  | 7    |
| ImageSharp     | 8   | 7    | 3    |
| Magick.Net     | 7   | 8.5  | 6    |
| MagicScaler    | 8*  | 8.5* | 8*   |
| SkiaSharp      | 3   | 4    | 3    |

MagicScaler is far too white to be a winner.
ImageSharp has good JPEG quality, memory usage is crazy high though. 
System.Drawing has a good JPEG quality, small file size, and good performance.

MagicScaler has the best quality for PNG size. I will need to investigate the white problem and what settings are used.
System.Drawing PNG files are so large they are useless.

Webp is okay, but quality-wise only magicscaler is good. Whitening problem though...

Based on these results:
MagicScaler rocks with low file sizes and consistent quality, but has a whitening problem. So I will not use this for the Xerbutri website.
ImageSharp has this weird memory problem, I cannot use it on a server, it will crash or cost me dearly.


## Conclusion

Follow-up: 
- Why is MagicScaler so white? Is it a contrast setting?
- Why are the PNGs of MagicScaler crazy small?
- Can I tune picture quality?


## Resources

Inspiration:  
[.NET Core Image Processing](https://devblogs.microsoft.com/dotnet/net-core-image-processing/)

About jpeg:  
[JPEG definitive guide](https://www.thewebmaster.com/jpeg-definitive-guide/)

Packages:  
[PhotoSauce](https://photosauce.net/)