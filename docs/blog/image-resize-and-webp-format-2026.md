# Image resize in dotNet: from JPG to Webp on Windows OS

*1-4-2026*

## Introduction

This test is a follow-up for the [Image resize in dotNet -JPG to JPG](./image-resize-in-dotnet-2026.md), and answers these follow-up questions:

- Which packages support JPEG (.jpg), WEBP (.webp) and Portable Network Graphics (.png)?
- How do these packages perform?
- Are there differences in quality between the packages?

I used about the same packages from the image resize test.

## Boundary conditions

This test:

- uses 12 pictures of 500kB size each, ~1280 x ~900 px by [Bertrand Le Roy](https://devblogs.microsoft.com/dotnet/net-core-image-processing/) plus 3 images of my own ~4000 x ~3000 px and 2-3MB.
- resizes to thumbnail size (~80px), small (320px) and medium (768px) sizes
- benchmarks the loading, resizing and saving operations with Benchmark.NET
- uses .NET 10 (LTS)
- uses Windows 11 only
- saves the images in jpeg format
- wants to achieve the highest image quality.
- saves the original jpeg as 95% quality jpeg format, png and webp in different sizes

### Packages summarized

A summary of the packages used in this table:


| Package                                                                  |                                                                               License | Published | Version | Downloads |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------:|----------:|--------:|----------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common)   |                                MIT |    3-2025 |  10.0.5 |  2500.0 M |
| [Magick.Net](https://www.nuget.org/packages/Magick.NET.Core)             |                                                                            Apache 2.0 |    3-2026 | 14.11.1 |    47.1 M |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)     |                                                                                   MIT |   12-2024 |  0.15.0 |     2.0 M |
| [ImageSharp](https://www.nuget.org/packages/SixLabors.ImageSharp)        | [Six Labors split](https://www.nuget.org/packages/SixLabors.ImageSharp/3.1.1/license) |   12-2025 |  3.1.12 |   234.7 M |
| [NetVips](https://www.nuget.org/packages/NetVips)                        |                                                                                   MIT |    1-2026 |   3.2.0 |     2.4 M |
| [SkiaSharp](https://www.nuget.org/packages/SkiaSharp)                    |                                                                                   MIT |    1-2026 | 3.119.2 |     249 M |

Read about the resize and implementation details in the [Image resize in dotNet -JPG to JPG](./image-resize-in-dotnet-2026.md).  
I did not use the imageFlow, because I had trouble with the memory use in the previous implementation already. It is possible to use this package for webp as well, it has encoders.

### Format support

The packages claim to support lots of formats. And in fact have no support whatsoever. I only checked for Webp, PNG and
Jpg.

| Package                                                                | JPG | PNG | Webp |                                         Remarks |
|------------------------------------------------------------------------|-----|-----|------|------------------------------------------------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common) | y   | y   | *    |      depends on GDI+ codecs installed and found |
| [ImageSharp](https://github.com/SixLabors/ImageSharp)                  | y   | y   | y    |                        GIF and ~3 other formats |
| [Magick.Net](https://github.com/dlemstra/Magick.NET)                   | y   | y   | y    |                      GIF and ~100 other formats |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)   | y   | y   | y    |                 depends on WIC codecs installed |
| [NetVips](https://www.nuget.org/packages/NetVips)                     | y   | y   | y    |                  GIF and multiple other formats |
| [SkiaSharp](https://github.com/mono/SkiaSharp)                         | y   | y   | y    |           none of the 9 other supported formats |      
| [ImageFlow](https://github.com/imazen/imageflow-dotnet)                | y   | y   | y    |                      no other formats supported |     

For System.Drawing.Common, Webp has support on windows GDI+ since windows 10- 1089. However, it depends on the codec
installed on your system. If no codec can be found, System.Drawing will silently fall back to PNG.

In this test the silent fallback was observed. In order to have a WebP format in test. system.drawing uses
the [SkiaSharp.Views.Desktop.Common](https://www.nuget.org/packages/SkiaSharp.Views.Desktop.Common/) package for
encoding and saving the image as WebP.

According to
a [Xamarin blog by Microsoft](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/graphics/skiasharp/bitmaps/saving#exploring-the-image-formats),
SkiaSharp only supports three of the 12 image formats. This test does not check that claim.

## Results in numbers

The results of this test in numbers: the time elapsed to produce the pictures, the memory used and the resulting
filesize.

### Time elapsed

The time elapsed is just an indication, as run on my laptop. So please just focus on the ratio.

![Time total](../assets/images/imageformat2026/time.svg "Total time elapsed")

This is not optimized at this moment. For Magick.Net three separate processes are spun up to handle the images. I can
imagine this takes time (and memory), making it three times slower.
I just spent max 15 minutes per package to do this stuff, I had no more time to spare. Please let me know if you want to
improve, or have ideas.

#### Conclusion

Measuring decreases the performance of the code. All of these packages are fast enough, with Magick.NET being twice
slower.

### Memory usage

The next picture shows allocated memory usage. For your machine this does not matter, as generally speaking the amount
of memory on your own machine is sufficient. If you have functions or other an app in the cloud where you pay for
memory (or simply crash on memory overload), this is very relevant.

![Memory used](../assets/images/imageformat2026/memory.svg "Allocated memory")

Cloning in ImageSharp uses insane amount of memory, 4000 times more than other the apps.  
Those pictures are 55 Mb in total. Why is it using 1200Mb? In the last test it used 1.2Mb of the 3Mb on disk. If it
scales exponentially, what will happen in a real scenario when the guys process 30-40 photo's of about 200-500Mb at
once? At least 12Gb?

For the other apps: I did not spent any time optimising. It does save the one picture in 4 sizes and three formats,
producing 12 files out of one picture. I think performance is great, considering most apps use <500 kB of allocated
memory for handling 55 Mb of pictures.

#### Conclusion

ImageSharp is very heavy on the memory. The other packages perform very nice indeed.

### File size

// TODO Filesize compare => look at previous blog.


![File size](../assets/images/imageformat2026/filesize.svg "File size")

Webp produces the smallest image file size possible. However, there are huge differences between the packages. I read
the System.Drawing GDI codec makes no effort to produce small files, and that certainly shows. It is possible to use
other codecs, but this has an effect on quality as well.  
ImageSharp has the smallest filesize, followed by MagicScaler. The other packages are equals.

The MagicScaler PNG is not a mistake. It really is that small.
The System.Drawing produces big PNG files. Again, this shows the encoder settings can make a big difference. In this
test the defaults are sed, but there is room for improvement.

In the land of JPEG everything is about the same. SkiaSharp and System.Drawing produce small images. ImageSharp and
MagicScaler a bit bigger. Magick.NET has the largest files.

## Quality

Quality is again a subjective matter. Let's look to some of the pictures produced and see the differences.

### Highlights

When resampling from one ColorSpace to another, the luminescence is not translated correctly. For this Gamma-correction is needed.
I did not change these settings for this test. This is extremely noticeable in dark pictures with sharp light features. If the wrong correction is used, the light will be much brighter, and the darks will be darker.

| Package        | JPG                                                                                                                               | PNG                                                                                                                           | Webp                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| System.Drawing | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat2026/Vuurwerk2020-SystemDrawing-320.jpg "Vuurwerk2020 System.Drawing") | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat2026/Vuurwerk2020-SystemDrawing-320.png "Vuurwerk2020 System.Drawing") | ![Vuurwerk2020 System.Drawing](../assets/images/imageformat2026/Vuurwerk2020-SystemDrawing-320-SK.webp "Vuurwerk2020 System.Drawing") |
| ImageSharp     | ![Vuurwerk2020-ImageSharp](../assets/images/imageformat2026/Vuurwerk2020-ImageSharp-320.jpg "Vuurwerk2020-ImageSharp")            | ![Vuurwerk2020-ImageSharp](../assets/images/imageformat2026/Vuurwerk2020-ImageSharp-320.png "Vuurwerk2020-ImageSharp")            | ![Vuurwerk2020-ImageSharp](../assets/images/imageformat2026/Vuurwerk2020-ImageSharp-320.webp "Vuurwerk2020-ImageSharp")               |
| Magick.Net     | ![Vuurwerk2020-MagickNET](../assets/images/imageformat2026/Vuurwerk2020-MagickNET-320.jpg "Vuurwerk2020-MagickNET")               | ![Vuurwerk2020-MagickNET](../assets/images/imageformat2026/Vuurwerk2020-MagickNET-320.png "Vuurwerk2020-MagickNET")               | ![Vuurwerk2020-MagickNET](../assets/images/imageformat2026/Vuurwerk2020-MagickNET-320.webp "Vuurwerk2020-MagickNET")                  |
| MagicScaler    | ![Vuurwerk2020-MagicScaler](../assets/images/imageformat2026/Vuurwerk2020-MagicScaler-320.jpg "Vuurwerk2020-MagicScaler")         | ![Vuurwerk2020-MagicScaler](../assets/images/imageformat2026/Vuurwerk2020-MagicScaler-320.png "Vuurwerk2020-MagicScaler")         | ![Vuurwerk2020-MagicScaler](../assets/images/imageformat2026/Vuurwerk2020-MagicScaler-320.webp "Vuurwerk2020-MagicScaler")            |
| NetVips        | ![Vuurwerk2020-NetVips](../assets/images/imageformat2026/Vuurwerk2020-NetVips-320.jpg "Vuurwerk2020-NetVips")                 | ![Vuurwerk2020-NetVips](../assets/images/imageformat2026/Vuurwerk2020-NetVips-320.png "Vuurwerk2020-NetVips")               | ![Vuurwerk2020-NetVips](../assets/images/imageformat2026/Vuurwerk2020-NetVips-320.webp "Vuurwerk2020-NetVips")                  |
| SkiaSharp      | ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat2026/Vuurwerk2020-SkiaSharp-320.jpg "Vuurwerk2020-SkiaSharp")               | ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat2026/Vuurwerk2020-SkiaSharp-320.png "Vuurwerk2020-SkiaSharp")               | ![Vuurwerk2020-SkiaSharp](../assets/images/imageformat2026/Vuurwerk2020-SkiaSharp-320.webp "Vuurwerk2020-SkiaSharp")                  |


System.Drawing: In the JPG there is this weird white-versus-color thing going on. I miss the red! The PNG is a bit
better. The skia-saved webp misses red.  
ImageSharp: The PNG has much more red compared to the JPG (due to chroma-subsampling). The PNG looks like the original.  
For Webp the colors seem off.  
Magick.NET: The JPG is perfect, spot on. The PNG as well. The Webp: Where have the colors gone?  
MagicScaler is crisp and very white.  
NetVips: The color in the Webp is off, the jpg looks okay.  
SkiaSharp: PNG is okay. For the jpg and webp, I am missing the red.  


### Resampling in High Quality

I configured the packages to output high quality images.


| Package        | JPG                                                                                                                               | PNG                                                                                                                           | Webp                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| System.Drawing | ![IMG_2445 System.Drawing](../assets/images/imageformat2026/IMG_2445-SystemDrawing-320.jpg "IMG_2445 System.Drawing") | ![IMG_2445 System.Drawing](../assets/images/imageformat2026/IMG_2445-SystemDrawing-320.png "IMG_2445 System.Drawing") | ![IMG_2445 System.Drawing](../assets/images/imageformat2026/IMG_2445-SystemDrawing-320-SK.webp "IMG_2445 System.Drawing") |
| ImageSharp     | ![IMG_2445-ImageSharp](../assets/images/imageformat2026/IMG_2445-ImageSharp-320.jpg "IMG_2445-ImageSharp")            | ![IMG_2445-ImageSharp](../assets/images/imageformat2026/IMG_2445-ImageSharp-320.png "IMG_2445-ImageSharp")            | ![IMG_2445-ImageSharp](../assets/images/imageformat2026/IMG_2445-ImageSharp-320.webp "IMG_2445-ImageSharp")               |
| Magick.Net     | ![IMG_2445-MagickNET](../assets/images/imageformat2026/IMG_2445-MagickNET-320.jpg "IMG_2445-MagickNET")               | ![IMG_2445-MagickNET](../assets/images/imageformat2026/IMG_2445-MagickNET-320.png "IMG_2445-MagickNET")               | ![IMG_2445-MagickNET](../assets/images/imageformat2026/IMG_2445-MagickNET-320.webp "IMG_2445-MagickNET")                  |
| MagicScaler    | ![IMG_2445-MagicScaler](../assets/images/imageformat2026/IMG_2445-MagicScaler-320.jpg "IMG_2445-MagicScaler")         | ![IMG_2445-MagicScaler](../assets/images/imageformat2026/IMG_2445-MagicScaler-320.png "IMG_2445-MagicScaler")         | ![IMG_2445-MagicScaler](../assets/images/imageformat2026/IMG_2445-MagicScaler-320.webp "IMG_2445-MagicScaler")            |
| NetVips        | ![IMG_2445-NetVips](../assets/images/imageformat2026/IMG_2445-NetVips-320.jpg "IMG_2445-NetVips")                 | ![IMG_2445-NetVips](../assets/images/imageformat2026/IMG_2445-NetVips-320.png "IMG_2445-NetVips")               | ![IMG_2445-NetVips](../assets/images/imageformat2026/IMG_2445-NetVips-320.webp "IMG_2445-NetVips")                  |
| SkiaSharp      | ![IMG_2445-SkiaSharp](../assets/images/imageformat2026/IMG_2445-SkiaSharp-320.jpg "IMG_2445-SkiaSharp")               | ![IMG_2445-SkiaSharp](../assets/images/imageformat2026/IMG_2445-SkiaSharp-320.png "IMG_2445-SkiaSharp")               | ![IMG_2445-SkiaSharp](../assets/images/imageformat2026/IMG_2445-SkiaSharp-320.webp "IMG_2445-SkiaSharp")                  |

ImageSharp: the Webp has weird artifacts, the JPG and PNG look good.  
Magick.NET: All the different formats are similar in quality. Overall it is fine, but a bit grey-ish.  
MagicScaler: Crisp and sharp, as to be expected.  
NetVips: stunning, but a bit grey.  
SkiaSharp: blurry.  
System.Drawing: Nice!  


### Sharpening

As far as sharpening goes, I did not change the default settings for this test.

| Package        | JPG                                                                                                                               | PNG                                                                                                                           | Webp                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| System.Drawing | ![Vlinder1 System.Drawing](../assets/images/imageformat2026/Vlinder1-SystemDrawing-320.jpg "Vlinder1 System.Drawing") | ![Vlinder1 System.Drawing](../assets/images/imageformat2026/Vlinder1-SystemDrawing-320.png "Vlinder1 System.Drawing") | ![Vlinder1 System.Drawing](../assets/images/imageformat2026/Vlinder1-SystemDrawing-320-SK.webp "Vlinder1 System.Drawing") |
| ImageSharp     | ![Vlinder1-ImageSharp](../assets/images/imageformat2026/Vlinder1-ImageSharp-320.jpg "Vlinder1-ImageSharp")            | ![Vlinder1-ImageSharp](../assets/images/imageformat2026/Vlinder1-ImageSharp-320.png "Vlinder1-ImageSharp")            | ![Vlinder1-ImageSharp](../assets/images/imageformat2026/Vlinder1-ImageSharp-320.webp "Vlinder1-ImageSharp")               |
| Magick.Net     | ![Vlinder1-MagickNET](../assets/images/imageformat2026/Vlinder1-MagickNET-320.jpg "Vlinder1-MagickNET")               | ![Vlinder1-MagickNET](../assets/images/imageformat2026/Vlinder1-MagickNET-320.png "Vlinder1-MagickNET")               | ![Vlinder1-MagickNET](../assets/images/imageformat2026/Vlinder1-MagickNET-320.webp "Vlinder1-MagickNET")                  |
| MagicScaler    | ![Vlinder1-MagicScaler](../assets/images/imageformat2026/Vlinder1-MagicScaler-320.jpg "Vlinder1-MagicScaler")         | ![Vlinder1-MagicScaler](../assets/images/imageformat2026/Vlinder1-MagicScaler-320.png "Vlinder1-MagicScaler")         | ![Vlinder1-MagicScaler](../assets/images/imageformat2026/Vlinder1-MagicScaler-320.webp "Vlinder1-MagicScaler")            |
| NetVips        | ![Vlinder1-NetVips](../assets/images/imageformat2026/Vlinder1-NetVips-320.jpg "Vlinder1-NetVips")                 | ![Vlinder1-NetVips](../assets/images/imageformat2026/Vlinder1-NetVips-320.png "Vlinder1-NetVips")               | ![Vlinder1-NetVips](../assets/images/imageformat2026/Vlinder1-NetVips-320.webp "Vlinder1-NetVips")                  |
| SkiaSharp      | ![Vlinder1-SkiaSharp](../assets/images/imageformat2026/Vlinder1-SkiaSharp-320.jpg "Vlinder1-SkiaSharp")               | ![Vlinder1-SkiaSharp](../assets/images/imageformat2026/Vlinder1-SkiaSharp-320.png "Vlinder1-SkiaSharp")               | ![Vlinder1-SkiaSharp](../assets/images/imageformat2026/Vlinder1-SkiaSharp-320.webp "Vlinder1-SkiaSharp")                  |

ImageSharp Webp is blurry, others are fine.  
MagickNet again overall fine, all formats have the same quality.  
MagicScaler is crisp and sharp, with similar quality in all formats.  

// TODO

#### Conclusion regarding picture quality

In the 80 px thumbnail category, the whites from MagicScaler are strong in all of the pictures. Skia looks blurry.
System.Drawing, ImageSharp and Magick.Net are fine.

The 320px category is where the differences between packages (or their settings) stand out the strongest. I reviewed the
picture quality with stars. Five stars meaning best quality, one star being bad. This very objective manner show the
differences between the packages for the different compression formats:

| Package        |  JPG |   PNG | Webp |
|----------------|-----:|------:|-----:|
| System.Drawing |  *** | ***** |  *** |
| ImageSharp     | **** |   *** |    * |
| Magick.Net     |  *** | ***** |   ** |
| MagicScaler    | **** | ***** | **** |
| NetVips        | **** | ***** | **** |
| SkiaSharp      |    * |     * |    * |

System.Drawing has great PNG quality, but JPEG and WebP are just fine. There are some edge halo effects in the JPG and
blurriness in the Webp.

ImageSharp produces good JPG, but the PNG quality is mediocre. The Webp images are all blurry, which is weird.

Magick.NET produces a very good PNG quality image, where some JPGs are a bit blurry and have some edge halo, the Webp is
even more blurry. Just a tiny bit more, compared to System.Drawing.

MagicScaler produces great pictures in all sizes with regard to sharpness. The them apples WebP picture is just as good
as the original, which at this filesize is real magic! The downside of this package is the whitening in high contrast
scenarios. I'd like to know if there is a fix for that.

SkiaSharp is just blurry overall.

## Conclusion

System.Drawing is the fastest package. Memory usage is great. However, the produced PNG files are so large they are
useless. Also the WebP file size is more than twice the size of an ImageSharp or MagicScaler Webp. Quality-wise the
PNG's are great, but JPG and Webp are overall just fine. File support is a ***. You may think certain files are
supported, while silently falling back on... That is not nice.

ImageSharp is very heavy on the memory. It was in the last test, and it still is in this test. Locally it just nicely
warms the room, but I cannot use it on a server, it will crash or cost me dearly. Filesize is normal for JPG and PNG,
and low for Webp.

Magick.NET is the slowest package, producing good quality PNG pictures, but lagging behind in the JPG and Webp quality.
I love its fireworks JPG and it has great real file support, so if that is your thing, go for it!

MagicScaler is far too white to be a winner for the Team Xerbutri scenario. This is especially a big deal in the 80px
wide thumbnails and high contrast scenarios. MagicScaler has the best quality for PNG size. I will need to investigate
the white problem and what settings are used. The total time elapsed is a bit slow, and it uses more memory than
System.Drawing, but it is still light weight. And I did not optimize these packages, please remember that. The file
sizes it produces are magically small! The quality it produces is high.

SkiaSharp, sorry you guys. I need to redo this test one time with the sharpness tweak, because, unless you have bad
sight, it just won't do.

Learned a lot out of this benchmark. But there is no winner. The overall performance of System.Drawing is fine. What I
want is MagicScaler quality and filesizes, without the whitening in high contrast situations.

### Follow-up

- Why is MagicScaler so white? Is it a contrast setting?
- Can I tune picture quality? Pictures with high contrast and vibrant color ask for a different approach in settings.
- Can I improve on the file size, by chosing another codec, or other settings?
- Imageflow produced broken files, maybe due to a mistake in the code. I do not expect it to be a winner, and the
  implementation is not my style.
- For SkiaSharp I found this sharp-filter on github. Implementing this will take some time, and I just don't know if it
  is worth the effort. I still think this is a package to go for if you want full platform support. Will it improve the
  results that much?

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