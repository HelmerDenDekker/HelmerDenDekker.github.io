# Javascript minification: Which minifier is best?

*10-8-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

- Problem statement
- Boundary conditions
- Solution

Which minifier to use?



| Package                                                               |              License | Health score | Last updated | Comment                                                               |
|-----------------------------------------------------------------------|---------------------:|-------------:|-------------:|:----------------------------------------------------------------------|
| [uglify-js](https://www.npmjs.com/package/uglify-js)                  |         BSD-2-Clause |           76 |         2025 | 1 package alert: Uses eval(), no other alerts, does not support ES6+? |
| [esbuild](https://www.npmjs.com/package/esbuild)                      |                  MIT |           86 |       8-2026 | 3 package alerts, low percieved quality by Socket.                    |
| [terser](https://www.npmjs.com/package/terser)                        |         BSD-2-Clause |           83 |       8-2026 | Compatible to uglify-js@3, no package alerts, 1 dependency alert      |
| [babel-minify](https://www.npmjs.com/package/babel-minify)            |                  MIT |           56 |         2022 | Not maintained?                                                       |



## *Outline*

## Resources

[Javascript minification](https://minify-js.com/benchmarks/)