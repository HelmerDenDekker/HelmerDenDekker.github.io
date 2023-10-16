# Helmer den Dekker on GitHub Pages
*27-03-2023 - updated 13-10-2023*

## About

This is my personal website on GitHub Pages. I simply wanted to test this, see how it works and play around.  

This repository contains:
- Blogs: These are more or less thought experiments written down
- Guides: How to guides.
- Resources: These are personal notes, which work like a second brain for me. So I can retrieve all these things I once looked up. 

On my website  [helmerdendekker.github.io](helmerdendekker.github.io) you can find all of the finished articles.

## Quickstart

To get this code running locally you need:
- Node JS installed

Step 1:

Open an command terminal in the project repository folder.

Install by typing:
```bat
 npm install
```

Please let me know if there are packages that need updates.

In order to run the website, type:

```bat
 npm run docs:dev
```

The site should be running on the address and port shown in de command window.

### (!) Troubleshooting

For me the site failed to start up, with the error <code>ESM file cannot be loaded by 'require'</code>.
This is caused by the config.ts using the import statement. You can solve this by adding `"type": "module"` to `package.json`.

For other trouble, take a look at the [vite troubleshooting site](https://vitejs.dev/guide/troubleshooting.html).


## About me

If you want to know a bit more about me, you can read my LinkedIn profile:
[Helmer den Dekker](https://www.linkedin.com/in/helmerdendekker/)

