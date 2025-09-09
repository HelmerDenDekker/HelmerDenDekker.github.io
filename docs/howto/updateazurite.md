# How to update Azurite

*26-05-2025*

## Problem

I am running into this every time. Updating the azure package, running the tests and: BAM, in your face!
I get the 400, this API is no longer supported:

```bat
 Azure.RequestFailedException : The API version 2025-05-05 is not supported by Azurite. Please upgrade Azurite to latest version and retry
```

## Solution

There is NO support for how to update your azurite installation. However, the solution is simple:
Just install the latest version of Azurite.

```bat
 npm install -g azurite
```

Get the version number with azurite -v.

```bat
 azurite -v
```

It says my version is 3.3.34, which is the latest, HOWEVER, I still get the error.

Well, kids, do not forget to shut down whatever is running azurite, and restart it. Now the latest version is used.
