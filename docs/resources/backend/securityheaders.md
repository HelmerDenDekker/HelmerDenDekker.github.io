# Security Headers

*8-9-2023*

Status: Work in progress

A concept I took from Brock Allen and Damien Bod (?) a long time ago, and incorporated
in [the presentation layer of the HelmerwebshopDemo project](https://github.com/HelmerDenDekker/HelmerDemo.WebShop/tree/develop/HelmerDemo.WebShop.Presentation)


-------------------------------------------------------------------

//ToDo Rewrite into a How-to

## API Header settings General info:

After doing an API request, the API responds with certain information in its header.

To configure what is or is not shared in this header, use SecurityHeaders at startup:

When configuring services: Be sure to implement and bind HeaderSettings. And Add APISecurityMiddleware.
UseWebSecurityMiddleware or UseApiSecurityMiddleware depending if you are in debug mode. (already solved this!!!)

## Security Headers General info:

Security headers are directives used by web applications to configure security defenses in web browsers. This makes it
possible to protect against vulnerabilities on the client side like cross-site scripting or clickjacking.

### Prevent XSS-attack (cross site scripting):

[content-security-policy:](https://infosec.mozilla.org/guidelines/web_security#content-security-policy)

Example:

```js
"default-src 'self'; object-src 'none'; frame-ancestors 'none'; sandbox allow-forms allow-same-origin allow-scripts; base-uri 'self'; upgrade-insecure-requests;"
```

### Prevent click-jacking

[X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

Example: mvcHeaders.Add(XFrameOptions, "SAMEORIGIN")

### Prevent MIME type sniffing

‘In its simplest form, sniffing is the act of intercepting and monitoring traffic on a network’

[X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

### Minimum information principle

[Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)