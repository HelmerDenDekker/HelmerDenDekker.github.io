// * Detailed results *
ImageResizeBenchmark.ResizeDrawing: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 301.436 ms, StdErr = 1.489 ms (0.49%), N = 5, StdDev = 3.329 ms
Min = 297.838 ms, Q1 = 299.412 ms, Median = 300.621 ms, Q3 = 302.933 ms, Max = 306.374 ms
IQR = 3.521 ms, LowerFence = 294.130 ms, UpperFence = 308.215 ms
ConfidenceInterval = [288.617 ms; 314.254 ms] (CI 99.9%), Margin = 12.819 ms (4.25% of Mean)
Skewness = 0.37, Kurtosis = 1.28, MValue = 2
-------------------- Histogram --------------------
[297.382 ms ; 308.929 ms) | @@@@@
---------------------------------------------------

ImageResizeBenchmark.ResizeImageSharp: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 133.569 ms, StdErr = 6.883 ms (5.15%), N = 5, StdDev = 15.391 ms
Min = 116.272 ms, Q1 = 118.878 ms, Median = 139.555 ms, Q3 = 141.156 ms, Max = 151.984 ms
IQR = 22.278 ms, LowerFence = 85.461 ms, UpperFence = 174.573 ms
ConfidenceInterval = [74.304 ms; 192.834 ms] (CI 99.9%), Margin = 59.265 ms (44.37% of Mean)
Skewness = -0.08, Kurtosis = 0.91, MValue = 2
-------------------- Histogram --------------------
[104.459 ms ; 129.388 ms) | @@
[129.388 ms ; 157.583 ms) | @@@
---------------------------------------------------

ImageResizeBenchmark.ResizeMagickNet: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 348.103 ms, StdErr = 2.544 ms (0.73%), N = 5, StdDev = 5.689 ms
Min = 341.405 ms, Q1 = 344.193 ms, Median = 347.051 ms, Q3 = 353.575 ms, Max = 354.289 ms
IQR = 9.381 ms, LowerFence = 330.121 ms, UpperFence = 367.647 ms
ConfidenceInterval = [326.196 ms; 370.009 ms] (CI 99.9%), Margin = 21.907 ms (6.29% of Mean)
Skewness = 0.04, Kurtosis = 0.88, MValue = 2
-------------------- Histogram --------------------
[339.862 ms ; 348.595 ms) | @@@
[348.595 ms ; 358.656 ms) | @@
---------------------------------------------------

ImageResizeBenchmark.ResizeMagicScaler: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 56.727 ms, StdErr = 0.189 ms (0.33%), N = 5, StdDev = 0.424 ms
Min = 56.359 ms, Q1 = 56.363 ms, Median = 56.611 ms, Q3 = 56.953 ms, Max = 57.348 ms
IQR = 0.590 ms, LowerFence = 55.479 ms, UpperFence = 57.837 ms
ConfidenceInterval = [55.095 ms; 58.358 ms] (CI 99.9%), Margin = 1.631 ms (2.88% of Mean)
Skewness = 0.4, Kurtosis = 1.16, MValue = 2
-------------------- Histogram --------------------
[56.034 ms ; 57.673 ms) | @@@@@
---------------------------------------------------

ImageResizeBenchmark.ResizeSkiaSharp: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 111.260 ms, StdErr = 0.317 ms (0.29%), N = 5, StdDev = 0.710 ms
Min = 110.688 ms, Q1 = 110.801 ms, Median = 110.910 ms, Q3 = 111.504 ms, Max = 112.398 ms
IQR = 0.704 ms, LowerFence = 109.745 ms, UpperFence = 112.560 ms
ConfidenceInterval = [108.528 ms; 113.993 ms] (CI 99.9%), Margin = 2.733 ms (2.46% of Mean)
Skewness = 0.65, Kurtosis = 1.45, MValue = 2
-------------------- Histogram --------------------
[110.144 ms ; 112.943 ms) | @@@@@
---------------------------------------------------

ImageResizeBenchmark.ResizeFreeImage: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 193.395 ms, StdErr = 0.231 ms (0.12%), N = 5, StdDev = 0.516 ms
Min = 192.881 ms, Q1 = 192.971 ms, Median = 193.269 ms, Q3 = 193.794 ms, Max = 194.062 ms
IQR = 0.823 ms, LowerFence = 191.738 ms, UpperFence = 195.028 ms
ConfidenceInterval = [191.410 ms; 195.380 ms] (CI 99.9%), Margin = 1.985 ms (1.03% of Mean)
Skewness = 0.21, Kurtosis = 0.92, MValue = 2
-------------------- Histogram --------------------
[192.485 ms ; 194.457 ms) | @@@@@
---------------------------------------------------

ImageResizeBenchmark.ResizeImageFlow: ShortRun(Arguments=/p:DebugType=portable, IterationCount=5, LaunchCount=1,
WarmupCount=5)
Runtime = .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI; GC = Concurrent Workstation
Mean = 1.595 ms, StdErr = 0.010 ms (0.63%), N = 4, StdDev = 0.020 ms
Min = 1.572 ms, Q1 = 1.583 ms, Median = 1.596 ms, Q3 = 1.608 ms, Max = 1.617 ms
IQR = 0.026 ms, LowerFence = 1.544 ms, UpperFence = 1.647 ms
ConfidenceInterval = [1.466 ms; 1.725 ms] (CI 99.9%), Margin = 0.130 ms (8.12% of Mean)
Skewness = -0.07, Kurtosis = 0.84, MValue = 2
-------------------- Histogram --------------------
[1.555 ms ; 1.618 ms) | @@@@
---------------------------------------------------

// * Summary *

BenchmarkDotNet v0.13.11, Windows 11 (10.0.22631.2861/23H2/2023Update/SunValley3)
11th Gen Intel Core i9-11900H 2.50GHz, 1 CPU, 16 logical and 8 physical cores
.NET SDK 8.0.100
[Host]   : .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI
ShortRun : .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI

Job=ShortRun Arguments=/p:DebugType=portable IterationCount=5
LaunchCount=1 WarmupCount=5

| Method            |       Mean |      Error |     StdDev | Ratio | RatioSD |      Gen0 |      Gen1 |      Gen2 |  Allocated | Alloc Ratio |
|-------------------|-----------:|-----------:|-----------:|------:|--------:|----------:|----------:|----------:|-----------:|------------:|
| ResizeDrawing     | 301.436 ms | 12.8189 ms |  3.3290 ms | 1.000 |    0.00 |         - |         - |         - |   45.27 KB |        1.00 |
| ResizeImageSharp  | 133.569 ms | 59.2647 ms | 15.3908 ms | 0.443 |    0.05 |         - |         - |         - | 1323.16 KB |       29.23 |
| ResizeMagickNet   | 348.103 ms | 21.9065 ms |  5.6891 ms | 1.155 |    0.01 |         - |         - |         - |   59.98 KB |        1.32 |
| ResizeMagicScaler |  56.727 ms |  1.6314 ms |  0.4237 ms | 0.188 |    0.00 |         - |         - |         - |  152.05 KB |        3.36 |
| ResizeSkiaSharp   | 111.260 ms |  2.7327 ms |  0.7097 ms | 0.369 |    0.00 |         - |         - |         - |    95.3 KB |        2.11 |
| ResizeFreeImage   | 193.395 ms |  1.9851 ms |  0.5155 ms | 0.642 |    0.01 | 6000.0000 | 6000.0000 | 6000.0000 |  100.49 KB |        2.22 |
| ResizeImageFlow   |   1.595 ms |  0.1296 ms |  0.0201 ms | 0.005 |    0.00 |   42.9688 |   39.0625 |   35.1563 |  247.35 KB |        5.46 |

// * Legends *
Mean        : Arithmetic mean of all measurements
Error       : Half of 99.9% confidence interval
StdDev      : Standard deviation of all measurements
Ratio       : Mean of the ratio distribution ([Current]/[Baseline])
RatioSD     : Standard deviation of the ratio distribution ([Current]/[Baseline])
Gen0        : GC Generation 0 collects per 1000 operations
Gen1        : GC Generation 1 collects per 1000 operations
Gen2        : GC Generation 2 collects per 1000 operations
Allocated   : Allocated memory per single operation (managed only, inclusive, 1KB = 1024B)
Alloc Ratio : Allocated memory ratio distribution ([Current]/[Baseline])
1 ms        : 1 Millisecond (0.001 sec)