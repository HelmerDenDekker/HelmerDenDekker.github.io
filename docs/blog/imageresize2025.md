# Image resize in dotNet: from JPG to JPG on Windows OS

*12-3-2025*

## Introduction

As I was browsing through my image processing blogs, I had this epiphany. The blog tells more about me, my abilities and (lack of) time while writing the blog, than about the packages reviewed.   
In my latest opinion:
- The "flaws" found in the reviewed nuget packages as presented in the previous blog tell the story of me not having enough time to correctly implement the right settings.
- The blog did not touch on the unique selling points of the packages. Neither does it discuss the use-cases.
- In general blogs are biased. I learned that you can choose any set of settings to make any one package come out as the best, while not telling the full story. This is what I did with my (previous) blog as well, as I was biased towards low filesize with maximum quality.

With this in mind, I decided to drastically rewrite my blog. The old blog can still be found [here](./imageresize.md), so you can check what I have learned.  

The question I wanted to answer: Can I resize images with a dotNet package? If so, what is the best package to use?  

I can give you the answers straight away:
- Yes, you can resize images with several dotNet packages.
- The best package depends on your use case

## Boundary conditions

This test:

- uses 12 pictures of 500kB size each, ~1280 x ~900 px by [Bertrand Le Roy](https://devblogs.microsoft.com/dotnet/net-core-image-processing/).
- resizes to thumbnail size (~80px), small (320px) and medium (768px) sizes
- benchmarks the loading, resizing and saving operations with Benchmark.NET
- uses .NET 8 (LTS)
- uses Windows 11 only
- saves the images in jpeg format
- wants to achieve the highest image quality.

So, please keep in mind: this is not a real-world use case. In real life images are much larger. Also in most cases the quality requirements for thumbnails and bigger images differ.

## Considerations

I wanted to include at least the packages from the [2017 test by Bertrand Le Roy](https://devblogs.microsoft.com/dotnet/net-core-image-processing/):

- System.Drawing, the newest version named System.Drawing.Common
- ImageSharp
- Magick.NET
- SkiaSharp
- FreeImage

I did some research, and considered the following packages:

- ImageFlow, which I could not get to work within the time frame I had.
- Microsoft.Maui.Graphics. I tried, but there is no support for Windows 11 at this moment, leaving you the choice to
  wrap around System.Drawing or SkiaSharp.
- [Image resizer](https://discoverdot.net/projects/image-resizer), which is for .NET framework. For .NET 8 it recommends to use ImageFlow.
- [ImageProcessor](https://github.com/JimBobSquarePants/ImageProcessor)  which is for .NET framework and is dead. It was a wrapper around System.Drawing. It recommends ImageSharp for .NET (Core).
- [NetVips](https://github.com/kleisauke/net-vips), a wrap around the libvips library.


## About the packages

The implementation code is in my [GitHub imageresize.benchmark repository](https://github.com/HelmerDenDekker/helmer.imageresize.benchmark).

### System.Drawing.Common

This package provides access to GDI+ graphics (Windows) functionality.  
Non-Windows platforms are not supported since .NET 7, even with the runtime configuration switch.
See [System Drawing on Windows](https://aka.ms/systemdrawingnonwindows) for more information.  

Use case:  
It is a graphics library, so it is more than just image processing. It depends on the GDI+ library, the support for System.Drawing varies per library version and system the application is running on. System.Drawing.Common is only supported on Windows. 

Unique selling points:
- Popular package, well-known. It is well-documented, and there are lots of examples available, which makes it easy to learn and implement.
- It is a Microsoft package, so it is kept up-to-date.

Drawbacks:
- It is Windows only.
- The real support of file formats by this package is limited.
- Implementing image resizing feels weird for me, because it is a graphics library, drawing the resized image on a new bitmap.

### Magick.NET

Magick.NET is a wrapper around the [ImageMagick](https://imagemagick.org/index.php) library. There is a lot of functionality in this library, I recommend to check the website for more information. 

Use case:
Use this library if you want to use ImageMagick image processing functionality in dotNET. It is a powerful image manipulation library. And the file format support is amazing, it supports over 100 file formats. 

Unique selling points:
- Extensive file support.
- Batch processing optimizations.
- Ease of implementation
- Open-source

Drawbacks:
- Figuring out which nuget packages I needed for my computer took me more time than expected.


### MagicScaler

MagicScaler is a high-performance image processing pipeline for .NET, focused on making complex imaging tasks simple.
They claim their speed and efficiency are unmatched by anything else on the .NET platform.  
Let's see about that later.

Use case:
Image processing library with clever default settings. It generates images optimized per use case with default settings. So a thumbnail will be sharper, better highlighted and of smaller size by default, compared to a larger image. 

Unique selling points:
- Ease of implementation. It is quite clever by default, making it easy to get optimized-per-use-case images without any hassle.
- Speed and efficiency. It is claimed to be the fastest image processing library for .NET.

Drawbacks:
- It is still on version 0, this might indicate there is no production version available yet.
- I am not sure that it is compatible with other platforms than Windows and Linux.

### ImageSharp

ImageSharp is a fully featured, fully managed, cross-platform, 2D graphics library. Fully managed means there is no dependency on native libraries or interop code. 
It is quite easy to implement. I had to fiddle a little bit, but it was not that difficult.

Use case:
Cross-platform graphics library.

Unique selling points:
- Cross-platform (I did not test this!)
- Ease of implementation (Easy to use API).

Drawbacks:  
- The license. It is a split license, which is not a problem for most developers, but it could be a problem for some
  managers.

### NetVips

NetVips is a .NET wrapper around the libvips library. It is cross-platform and has a lot of image processing functions. It supports Windows, Linux and macOS.

Use case:
Easy to implement image processing library for .NET Framework (>=4.52) and .NET >6.0.

Unique selling points:
- It supports Windows, Linux and MacOS (I did not test this).
- Pipeline-like implementation, which is quite clever.
- Documentation is good.
- Speed and efficiency. It is claimed to be the fastest image processing library for .NET.

### SkiaSharp

SkiaSharp is a wrapper around [Google's Skia Graphics library](https://skia.org/). Skia is an open source 2D graphics
library which provides common APIs that work across a variety of hardware and software platforms. It serves as the
graphics engine for Google Chrome and ChromeOS, Android, Flutter, and many other products.

Use case:
Cross-platform graphics library.

Unique selling points:
- It was made for fast image processing.
- It is cross-platform.
- It is a Google package, so it is well-supported (in theory).

Drawbacks:
- The documentation is a bit lacking. It took me more time than expected to figure stuff out.
- You need to know a lot of tricks to get the quality right for one use case. So to get to, say, MagicScaler level you need an enormous amount of extra code. Code equals time.
- The speed of development is high. Which is a good thing, but with a lack of documentation you need to dive into source code to understand it. The development speed out-dates a lot of documentation, examples and questions, leaving you on the wrong foot most of the time.

### Free Image

I only included this package because it was in the previous test. It is a .NET wrapper around the FreeImage library.
This library is no longer maintained, and it seems FreeImage.NET is also no longer maintained.

Unique selling points:
- The only wrapper around the FreeImage library.

Drawbacks:
- It is not maintained anymore.
- Makes me want to take a shower after viewing the implementation code. Ugly and hard to understand implementation for developers. Good for image-nerds.

### ImageFlow

Imageflow.NET is a .NET API for [Imageflow](https://github.com/imazen/imageflow), an image optimization and processing library for web servers.
It focuses on security, quality, and performance - in that order. Imageflow.NET is compatible with .NET 4.6.2+, .NET Core 2.0+, and .NET 5/6/7/8.

Use case:
Image processing library for web servers.

Unique selling points:
- It is cross-dotNET-platform.
- Image processing for web servers.

Drawbacks:
- ImageFlow.NET is tri-licensed under a commercial license, the AGPLv3, and the Apache 2 license, which would drive any
manager mad.
- The implementation for me feels crazy. If you are familiar to ImageResizer, you may disagree with me but... ARGH!!
Cooties!! I copied an example piece of code. And I hate it. It has all the expensive stuff in it which I always try to
avoid. It is the only async one. It has the ResizerCommands from the old ImageResizer package. For me it feels awkward.
I think I could easily improve this piece of code to make me feel less itchy, but I do not want to touch it.
- ImageFlow is still on version 0, this might indicate there is no production version available yet.
- I could not get this package to save the images reliably within the time frame I had.

### Packages summarized

A summary of the packages used in this table:

| Package                                                                  |                                                                               License | Published | Version | Downloads |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------:|----------:|--------:|----------:|
| [System.Drawing](https://www.nuget.org/packages/System.Drawing.Common)   |                                MIT |   2-2025 |  8.0.13 |  1800.0 M |
| [Magick.Net](https://www.nuget.org/packages/Magick.NET.Core)             |                                                                            Apache 2.0 |   2-2025 |  14.5.0 |    26.5 M |
| [MagicScaler](https://www.nuget.org/packages/PhotoSauce.MagicScaler)     |                                                                                   MIT |   12-2024 |  0.15.0 |     1.1 M |
| [ImageSharp](https://www.nuget.org/packages/SixLabors.ImageSharp)        | [Six Labors split](https://www.nuget.org/packages/SixLabors.ImageSharp/3.1.1/license) |   3-2025 |   3.1.7 |   139.7 M |
| [NetVips](https://www.nuget.org/packages/NetVips)                        |                                                                                   MIT |   11-2024 |   3.0.0 |     1.5 M |
| [SkiaSharp](https://www.nuget.org/packages/SkiaSharp)                    |                                                                                   MIT |   12-2024 | 3.116.1 |   136.6 M |
| [FreeImage](https://www.nuget.org/packages/FreeImage.Standard)           |                           [Free Image](https://freeimage.sourceforge.io/license.html) |    6-2019 |   4.3.8 |     0.1 M |
| [ImageFlow](https://www.nuget.org/packages/Imageflow.Net)                |                                                                tri or bi-license AGPL |    5-2024 |  0.13.2 |     1.0 M |
I added the license information for your managers if you want to use this software in company code. I find managers to
often dislike (or forbid) copyleft-type licenses.

Most of the packages are in full support or development, except Free Image which has not been updated for a while.
System.Drawing and Skiasharp are Microsoft backed packages. This could be an advantage in terms of support.

MagicScaler and ImageFlow are still on the zero version, which might indicate there is no official production version
yet.

System.Drawing.Common is the most popular with 1124 million downloads!!   
ImageSharp comes second, closely followed by SkiaSharp. A far fourth is Magick.NET.   
MagicScaler and ImageFlow are promising packages, but they are not that popular.

## About the pictures

The pictures were chosen on-purpose. 

This picture of the lamp has a sRGB color space and contains an embedded color profile.
The picture of the hummingbird has a sRGB color space as well.
The other 10 pictures have an Adobe RGB color space (Uncalibrated) with an embedded profile for sRGB.

## Quality

The quality of a picture is subjective. Also, let me remind you that with any package it is possible to reach a certain level of quality.
For this test I used a limited amount of time.

### ColorSpace management

Most applications use sRGB colorSpace to show a jpg picture. However, there is not such a thing as a default colorSpace. There are several color profiles in-use, and if the developer does not use the right settings to handle this, the picture will look terrible.
I changed the settings for most of the libraries to do a conversion to sRGB.
This conversion step will slow the process down, but I'd rather have a slow process than faulty colors.

The picture of Wild River has an Adobe RGB profile, which has to be converted to sRGB. Because of the blue, it will show if I have the settings wrong. 


This is the original picture, notice the blue.
![Wild River](../assets/images/imageresize/IMG_2525.jpg "Wild River")

For reference, I did not change the color management settings of FreeImage, giving you an idea of what color mangling looks like. You can also look at my [previous post](./imageresize.md) for the results under previous settings.
The blue of FreeImage is clearly off. The other packages are spot on.

| Package        |                                                                                                                      |  
|----------------|---------------------------------------------------------------------------------------------------------------------:|
| System.Drawing | ![IMG_2525 System.Drawing](../assets/images/imageresize2025/IMG_2525-SystemDrawing-80.jpg "IMG_2525 System.Drawing") |
| Magick.Net     |               ![IMG_2525-MagickNET](../assets/images/imageresize2025/IMG_2525-MagickNET-80.jpg "IMG_2525-MagickNET") |
| MagicScaler    |         ![IMG_2525-MagicScaler](../assets/images/imageresize2025/IMG_2525-MagicScaler-80.jpg "IMG_2525-MagicScaler") |
| ImageSharp     |            ![IMG_2525-ImageSharp](../assets/images/imageresize2025/IMG_2525-ImageSharp-80.jpg "IMG_2525-ImageSharp") |
| NetVips      |                 ![IMG_2525-NetVips](../assets/images/imageresize2025/IMG_2525-NetVips-80.jpg "IMG_2525-NetVips") |
| SkiaSharp      |           ![IMG_2525-SkiaSharp](../assets/images/imageresize2025/IMG_2525-SkiaSharpJeVe-80.jpg "IMG_2525-SkiaSharp") |
| FreeImage      |               ![IMG_2525-FreeImage](../assets/images/imageresize2025/IMG_2525-FreeImage-80.jpg "IMG_2525-FreeImage") |


### Highlights

When resampling from one ColorSpace to another, the luminescence is not translated correctly. For this Gamma-correction is needed.
I did not change these settings for this test. This is extremely noticeable in dark pictures with sharp light features. If the wrong correction is used, the light will be much brighter, and the darks will be darker.

![Fireworks](../assets/images/imageresize2025/Vuurwerk2020.jpg "Fireworks")

| Package        |                                                                                                                       |  
|----------------|----------------------------------------------------------------------------------------------------------------------:|
| System.Drawing | ![Vuurwerk2020- System.Drawing](../assets/images/imageresize2025/Vuurwerk2020-SystemDrawing-320.jpg "Vuurwerk2020- System.Drawing") |
| Magick.Net     |               ![Vuurwerk2020-MagickNET](../assets/images/imageresize2025/Vuurwerk2020-MagickNET-320.jpg "Vuurwerk2020-MagickNET") |
| MagicScaler    |         ![Vuurwerk2020-MagicScaler](../assets/images/imageresize2025/Vuurwerk2020-MagicScaler-320.jpg "Vuurwerk2020-MagicScaler") |
| ImageSharp     |            ![Vuurwerk2020-ImageSharp](../assets/images/imageresize2025/Vuurwerk2020-ImageSharp-320.jpg "Vuurwerk2020-ImageSharp") |
| NetVips      |                     ![Vuurwerk2020-NetVips](../assets/images/imageresize2025/Vuurwerk2020-NetVips-320.jpg "Vuurwerk2020-NetVips") |
| SkiaSharp      |           ![Vuurwerk2020-SkiaSharp](../assets/images/imageresize2025/Vuurwerk2020-SkiaSharpJeVe-320.jpg "Vuurwerk2020-SkiaSharp") |
| FreeImage      |               ![Vuurwerk2020-FreeImage](../assets/images/imageresize2025/Vuurwerk2020-FreeImage-320.jpg "Vuurwerk2020-FreeImage") |

Although MagicScaler themselves say they have the best solution for the Highlight problem, I think they overdo the whites a bit.
Do mind that this issue disappears for MagicScaler as the resize dimensions become larger. So, for a thumbnail, it is a problem, but for a medium-sized image, it is not. Also, this indicates it is a setting issue, not a package issue.

### Resampling in High Quality

I configured the packages to output high quality images.

| Package        |                                                                                                                       |  
|----------------|----------------------------------------------------------------------------------------------------------------------:|
| System.Drawing | ![IMG_2445- System.Drawing](../assets/images/imageresize2025/IMG_2445-SystemDrawing-320.jpg "IMG_2445- System.Drawing") |
| Magick.Net     |               ![IMG_2445-MagickNET](../assets/images/imageresize2025/IMG_2445-MagickNET-320.jpg "IMG_2445-MagickNET") |
| MagicScaler    |         ![IMG_2445-MagicScaler](../assets/images/imageresize2025/IMG_2445-MagicScaler-320.jpg "IMG_2445-MagicScaler") |
| ImageSharp     |            ![IMG_2445-ImageSharp](../assets/images/imageresize2025/IMG_2445-ImageSharp-320.jpg "IMG_2445-ImageSharp") |
| NetVips      |                     ![IMG_2445-NetVips](../assets/images/imageresize2025/IMG_2445-NetVips-320.jpg "IMG_2445-NetVips") |
| SkiaSharp      |           ![IMG_2445-SkiaSharp](../assets/images/imageresize2025/IMG_2445-SkiaSharpJeVe-320.jpg "IMG_2445-SkiaSharp") |
| FreeImage      |               ![IMG_2445-FreeImage](../assets/images/imageresize2025/IMG_2445-FreeImage-320.jpg "IMG_2445-FreeImage") |

MagicScaler and System Drawing have the sharpest images.
SkiaSharp and FreeImage are blurry and have weird artifacts.

### Sharpening

As far as sharpening goes, I did not change the default settings for this test.

| Package        |                                                                                                                       |  
|----------------|----------------------------------------------------------------------------------------------------------------------:|
| System.Drawing | ![Vlinder1- System.Drawing](../assets/images/imageresize2025/Vlinder1-SystemDrawing-320.jpg "Vlinder1- System.Drawing") |
| Magick.Net     |               ![Vlinder1-MagickNET](../assets/images/imageresize2025/Vlinder1-MagickNET-320.jpg "Vlinder1-MagickNET") |
| MagicScaler    |         ![Vlinder1-MagicScaler](../assets/images/imageresize2025/Vlinder1-MagicScaler-320.jpg "Vlinder1-MagicScaler") |
| ImageSharp     |            ![Vlinder1-ImageSharp](../assets/images/imageresize2025/Vlinder1-ImageSharp-320.jpg "Vlinder1-ImageSharp") |
| NetVips      |                     ![Vlinder1-NetVips](../assets/images/imageresize2025/Vlinder1-NetVips-320.jpg "Vlinder1-NetVips") |
| SkiaSharp      |           ![Vlinder1-SkiaSharp](../assets/images/imageresize2025/Vlinder1-SkiaSharpJeVe-320.jpg "Vlinder1-SkiaSharp") |
| FreeImage      |               ![Vlinder1-FreeImage](../assets/images/imageresize2025/Vlinder1-FreeImage-320.jpg "Vlinder1-FreeImage") |

MagicScaler clearly has the sharpest picture of them all.  
Closely followed by Magick.NET and System.Drawing.

#### Conclusion regarding picture quality


| Package        | Colors |  Highlights | Sharpness |
|----------------|-------:|------------:|----------:|
| System.Drawing |  ***** |        high |   sharper |
| Magick.Net     |  ***** |     perfect |  original |
| MagicScaler    |  ***** |    too high |   sharper |
| ImageSharp     |  ***** |     perfect |  original |
| NetVips        |  ***** |     perfect |     sharp |
| SkiaSharp      |  ***** | blurry-grey |    blurry |
| FreeImage      |      * |     too low |    blurry |

## Results in numbers

The results of this test in numbers: the time elapsed to produce the pictures, the memory used and the resulting
filesize.

### File size

I did set the quality higher than the previous blog.  
I did need to keep the icc-profile for MagickNet in order to convert the color space. I did remove the Exif data, but it did not remove the profile, so the filesize is pretty big. Magick.NET has lots of options, and I think it must be possible to save it without the ICC color profile attached, but I do not have the time to figure this out at the moment.

![File size](../assets/images/imageresize2025/filesize.svg "File size")

So, in the end, the filesize reflects more on my abilities to find the right settings in the library in a restricted amount of time, while keeping the processing at a certain level, than it says about the qualities of the library itself.

### Memory allocation

For measuring the memory allocation I used benchmark.NET with a low iteration count, so do not look at the absolute numbers, but rather to the ratio's.

![Memory allocation](../assets/images/imageresize2025/memory.svg "Memory allocation")

### Total time elapsed

For measuring the total time elapsed I used benchmark.NET with a low iteration count. Also, keep in mind I have the code optimized for quality and low file size, not for speed!

![Total time elapsed](../assets/images/imageresize2025/time.svg "Total time elapsed")

Compared to the 2024 blog, Magick.NET uses a lot more time. This is because I altered the code for having a comparable quality to the other packages, as well as having an as low as possible file size. This extra code compromises the speed, making it more than three times slower. 
In other words, Magick.NET can be made from slowest to fastest by replacing three lines of code.

## Conclusion

All packages have their drawbacks, or specific use cases. For example, when designing a graphics-application for Android, despite its drawbacks, SkiaSharp is your go-to library. So read the table below with care.   
Also, there is the case of your business needs, for example, regarding the license types used. So I invite you to use my benchmark code, change the settings for the use case you have in mind, and choose the right package with the set of requirements you have in mind.

### Summarized:

| Package        | Pros                                      | Cons                                                    | 
|----------------|:------------------------------------------|:--------------------------------------------------------|
| System.Drawing | Good image quality, low memory allocation | Windows-only, limited file-format support               |
| Magick.Net     | File-format support, good image quality   | Slow and large files in my test for high quality images |
| MagicScaler    | Fast, sharp images                        | Extreme highlights affect quality                       |
| ImageSharp     | Fast, cross-platform                      | High memory usage                                       |
| NetVips        | Cross-platform, good image quality        |                                                         |
| SkiaSharp      |                                           | Hard to implement, blurry images                        |
| FreeImage      |                                           | Out-dated, blurry images with mangled colors            |


## Resources

Inspiration:  
[.NET Core Image Processing](https://devblogs.microsoft.com/dotnet/net-core-image-processing/)

Packages:  
[PhotoSauce](https://photosauce.net/)  
[System.Drawing](https://www.nuget.org/packages/System.Drawing.Common)  
[ImageSharp](https://github.com/SixLabors/ImageSharp)  
[Magick.Net](https://github.com/dlemstra/Magick.NET)  
[SkiaSharp](https://github.com/mono/SkiaSharp)  
[FreeImage](https://github.com/LordBenjamin/FreeImage.Standard)  
[ImageFlow](https://github.com/imazen/imageflow-dotnet)  

