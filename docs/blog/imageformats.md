# Image format support in dotNet: compression technologies

*15-1-2024*

## Introduction

How to achieve good quality, low filesize images for the website?
My Question:  
Which compression technologies to use when?
Which are supported?
Image formats are not really file formats, rather compression mechanisms.

## Theory

The JPEG compression encoding consists of different processes:

- Color transformation
	- Downsampling
- Block splitting
- DCT
- Quantization
- Entropy coding

### Step 1: Color transformation

The human eye has two sensors.
One that catches luminescence, these are the [rod cells](https://en.wikipedia.org/wiki/Rod_cell) in your eyes.
The other one is the [cone cell](https://en.wikipedia.org/wiki/Cone_cell), which is sensitive to a certain color.

JPEG is simply put a compression format that throws away all information your eyes cannot detect.

Color in a picture is normally stored in RGB channels, the colors being Red, Blue and Green. The JPEG compression
transforms this into [YCbCr](https://en.wikipedia.org/wiki/YCbCr). The YCbCr is a model that more closely resembles how
your eyes work.

The Y channel had all lumnescence data, the stuff everyone can see (except for blind people).
The Cb contains the yellow-blue, the Cr the red-green data.

### Step 2: Downsampling

This is where we can have impact on the picture quality and file size.

- 4:4:4 means no subsampling: for every row of 4, keep 4 and 4
- 4:2:2 means the horizontal resolution is halved: for every row of 4, merge horizontal to 2, and 2 in the next row
- 4:2:0 means the horizontal and vertical resolution are halved: for every row of 4, merge horizontal to 2, keep none in
  the next row. (merge to two blocks)
- 4:1:1 means the horizontal resolution is 1/4 of the original, all 4 pixels horizontally are blended into one. Of every
  row of 4, merge into 1 and the next row also.

Chroma subsampling can make your colors look dull.

## Boundary conditions

## Follow up

## Resources

Jpeg Theory:    
[The Ultimate Guide to JPEG Including JPEG Compression & Encoding](https://www.thewebmaster.com/jpeg-definitive-guide/)