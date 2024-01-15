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

Measuring takes some time, so I think all of these systems are fast enough. Only Magick.NET is considerably slower.

### Memory usage

The next picture shows allocated memory usage. For your machine this does not matter, as generally speaking the amount of memory on your own machine is sufficient. If you have functions or other an app in the cloud where you pay for memory (or simply crash on memory overload), this is very relevant.

![Memory used](../assets/images/imageformat/memory.svg "Allocated memory")

Cloning in ImageSharp uses insane amount of memory, 4000 times more than other the apps.  
Those pictures are 55 Mb in total. Why is it using 1200Mb? In the last test it used 1.2Mb of the 3Mb on disk. If it scales exponentially, what will happen in a real scenario when the guys process 30-40 photo's of about 200-500Mb at once? At least 12Gb?  

For the other apps: I did not spent any time optimising. It does save the one picture in 4 sizes and three formats, producing 12 files out of one picture. I think performance is great, considering most apps use <500 kB of allocated memory for handling 55 Mb of pictures.

#### Conclusion

ImageSharp is very heavy on the memory.

### File size

![File size](../assets/images/imageformat/filesize.svg "File size")

Webp produces the smallest image file size possible. However, there are huge differences between the packages I need to investigate. ImageSharp has the smallest filesize, followed by MagicScaler. The other packages are equals.

The MagicScaler PNG is not a mistake. It really is that small.
The System.Drawing produces big PNG files.

In the land of JPEG everything is about the same. SkiaSharp and System.Drawing produce small images. ImageSharp and MagicScaler a bit bigger. Magick.NET has the largest files.


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
MagicScaler is crisp and very white.   
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

### How about them apples?

In a more normal scenario, above 320px the extreme whiteness of MagicScaler is present only in snowy pictures:  

| Package              |                                                                                                               System.Drawing  | MagicScaler                                                                                                               FileSize (KB |  
|----------------------|------------------------------------------------------------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------:|
|  |         ![Snow as Webp by System.Drawing](../assets/images/imageformat/snow-sysdrawing.webp "Snow as Webp by System.Drawing") |                       ![Snow as Webp by MagicScaler](../assets/images/imageformat/snow-magicscaler.webp "Snow as Webp by MagicScaler") |

In the MagicScaler the trees show more snow. This effect occurs in high contrast scenario's, these often occur in the pictures taken by Team Xerbutri.

Looking at pictures with lower contrast, MagicScaler just looks very good, I mean, look at these file sizes! Who doesn't want this quality at this file size?

| Package              |                                                                                                                                    | FileSize (KB) |  
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------:|--------------:|
| System.Drawing (PNG) | ![Them apples as PNG by System.Drawing](../assets/images/imageformat/apples-sysdrawing.png "Them apples as PNG by System.Drawing") |           198 |
| MagicScaler (PNG)    |      ![Them apples as PNG by MagicScaler](../assets/images/imageformat/apples-magicscaler.png "Them apples as PNG by MagicScaler") |            27 |
| MagicScaler (Webp)   |   ![Them apples as Webp by MagicScaler](../assets/images/imageformat/apples-magicscaler.webp "Them apples as Webp by MagicScaler") |            18 |
| MagicScaler (JPG)    |     ![Them apples as Webp by MagicScaler](../assets/images/imageformat/apples-magicscaler.jpg "Them apples as JPG by MagicScaler") |            28 |
| System.Drawing (JPG) | ![Them apples as PNG by System.Drawing](../assets/images/imageformat/apples-sysdrawing.jpg "Them apples as JPG by System.Drawing") |            25 |
| SkiaSharp (PNG)      |                 ![Them apples as PNG by SkiaSharp](../assets/images/imageformat/apples-skia.png "Them apples as PNG by SkiaSharp") |           112 |



#### Conclusion regarding picture quality

In the 80 px thumbnail category, the whites from MagicScaler are strong in all of the pictures. Skia looks blurry. System.Drawing, ImageSharp and Magick.Net are fine.

The 320px category is where the differences between packages (or their settings) stand out the strongest. I reviewed the picture quality with stars. Five stars meaning best quality, one star being bad. This very objective manner show the differences between the packages for the different compression formats:


| Package        |  JPG |   PNG |    Webp |
|----------------|-----:|------:|--------:|
| System.Drawing |  *** | ***** |     *** |
| ImageSharp     | **** |   *** |       * |
| Magick.Net     |  *** | ***** |     ** |
| MagicScaler    | **** | ***** |   **** |
| SkiaSharp      |    * |     * |       * |


System.Drawing has great PNG quality, but JPEG and WebP are just fine. There are some edge halo effects in the JPG and blurriness in the Webp.   
ImageSharp produces good JPG, but the PNG quality is mediocre. The Webp images are all blurry, which is weird.  
Magick.NET produces a very good PNG quality image, where some JPGs are a bit blurry and have some edge halo, the Webp is even more blurry. Just a tiny bit more compared to System.Drawing.  
MagicScaler produces great pictures in all sizes with regard to sharpness. The Them Apples WebP picture is just as good as the original, which at this filesize is real magic! The downside of this package is the whitening in high contrast scenarios. I'd like to know if there is a fix for that.
SkiaSharp is just blurry overall.



## Conclusion

System.Drawing is the fastest package. Memory usage is great. However, the produced PNG files are so large they are useless. Also the WebP file size is more than twice the size of an ImageSharp or MagicScaler Webp. Quality-wise the PNG's are great, but JPG and Webp are overall just fine. File support is a ***. You may think certain files are supported, while silently falling back on... That is not nice.

ImageSharp is very heavy on the memory. It was in the last test, and it still is in this test. Locally it just nicely warms the room, but I cannot use it on a server, it will crash or cost me dearly. Filesize is normal for JPG and PNG, and low for Webp.

Magick.NET is the slowest package, producing good quality PNG pictures, but lagging behind in the JPG and Webp quality. I love its fireworks JPG and it has great real file support, so if that is your thing, go for it!  

MagicScaler is far too white to be a winner for the Team Xerbutri case. This is especially a big deal in the 80px wide thumbnails and high contrast scenarios. MagicScaler has the best quality for PNG size. I will need to investigate the white problem and what settings are used. The total time elapsed is a bit slow, and it uses more memory than System.Drawing, but it is still light weight. And I did not optimize these packages, please remember that. The file sizes it produces are magically small! The quality it produces is high.

SkiaSharp, sorry you guys. I need to redo this test one time with the sharpness tweak, because, unless you have bad sight, it just won't do.


Overall I may say that System.Drawing has a good JPEG quality, small file size, and good performance. MagicScaler rocks with low file sizes and consistent quality, but has a whitening problem. So I will not use this for the Xerbutri website.


### Follow-up

- Why is MagicScaler so white? Is it a contrast setting?
- Why are the PNGs of MagicScaler crazy small?
- Can I tune picture quality?
- What settings to use for which pictures?


## Resources

Inspiration:  
[.NET Core Image Processing](https://devblogs.microsoft.com/dotnet/net-core-image-processing/)

About jpeg:  
[JPEG definitive guide](https://www.thewebmaster.com/jpeg-definitive-guide/)

Packages:  

[Webp in System.Drawing](https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat.webp?view=dotnet-plat-ext-8.0)

[Issues in System.Drawing with Webp on GitHub](https://github.com/dotnet/runtime/issues/70418)    

[Issues in System.Drawing with Webp on StackOverflow](https://stackoverflow.com/questions/75988248/save-a-webp-file-with-system-drawing-imaging-generates-a-big-file-size-or-encode)  

[Image formats in System.Drawing](https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.imageformat?view=dotnet-plat-ext-8.0)  

[Image formats in ImageSharp](https://docs.sixlabors.com/articles/imagesharp/imageformats.html)

[Image formats in Magick.Net](https://imagemagick.org/script/formats.php)

[MagicScaler](https://photosauce.net/blog/post/introducing-magicscaler)

[Image formats in SkiaSharp Xamarin](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/graphics/skiasharp/bitmaps/saving)  
[Image formats in SkiaSharp](https://learn.microsoft.com/en-us/dotnet/api/skiasharp.skencodedimageformat?view=skiasharp-2.88)  

[Image formats in ImageFlow](https://docs.imageflow.io/json/encode.html)