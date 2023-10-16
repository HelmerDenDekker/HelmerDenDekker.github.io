# Gulp
*18-9-2023*

Status: Work in progress

 Gulp helps us to automate many of the time consuming repetitive client side tasks.


 Gulp was not recommended here:
 https://github.com/slikts/tooling/blob/master/not-recommended.md
 

## Notes

Resource on GULP

## How to get started (Quick Guide)

- Spin up webserver
- Reloading the site when file is saved
- Optimizing javascript, CSS and images

### 1. Set up a npm project

First you need to set up a npm project, in order to create a package.json file, to keep track of packages and version installed.  

Go to the root folder of your project. Open up the command line interface (by typing cmd and hitting enter in windows explorer).
In the command line, type:

```bat
 npm init
```

Npm will then prompt you to enter in information about the project.  
- package name: enter the name of your project.
- version: enter the version of your project
- entry point: hit enter for the default
- git repository: enter the url of your git repository
- keywords: leave empty, or introduce some keywords that define your application

[Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)


### 2. Install Gulp

First remove any globally installed versions of Gulp.
I have other projects running Gulp, and they might operate with another Gulp version, so I want Gulp installed locally.

I want the CLI to be installed globally (for all of my projects):

In the command line, type:

```bat
 npm install --global gulp-cli
```

Next install gulp with the --save-dev command in order to indicate that Gulp is a package to help you with development, and not a package needed for in a build process for your application.

In the command line, type:

```bat
 npm install --save-dev gulp
```

### 3. Create gulpfile

Create a gulp file "gulpfile.js" in the root of your project that looks like this:

```js
 function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

This is an empty gulp file, not performing any actions.

### 4. Test gulp file

Test the file by typing the following command in the command line:

```bat
 gulp
```

The result will be like this:

```bat
[11:50:41] Using gulpfile ~\yourproject\gulpfile.js
[11:50:41] Starting 'default'...
[11:50:41] Finished 'default' after 1.26 ms
```

### 5. Install plugins

I am looking for:
- Spin up webserver
- Reloading the site when file is saved
- Optimizing javascript, CSS and images

In order to find these plugins, I go to the [Gulp plugin site](https://gulpjs.com/plugins/).


### 6. Spin up webserver

Browser Sync helps make web development easier by spinning up a web server that helps do live-reloading easily.
[Browser sync and gulp](https://browsersync.io/docs/gulp)

```bat
 npm install browser-sync --save-dev
```

#### Using js file

My webpage is in my src folder, and does not need any compilation or transpilation. So I can change the file to:

```js
const { series } = require('gulp');
const browserSync = require('browser-sync');

const server = browserSync.create();

// initializes the server
function serve(done) {
  server.init({
    server: {
      baseDir: './src'
    }
  });
  done();
}

// expose the default task
exports.default = series(serve);
```

Test the file by typing the following command in the command line:

```bat
 gulp
```
And for me it spins up localhost:3000 with my website!


#### Using modules

ALTERNATIVE!!! Using javascript modules.

Rename the "gulpfile.js" into "gulpfile.mjs", since I do not want to use transpilation, but I want to have the import statement.

My webpage is in my src folder, and does not need any compilation or transpilation. So I can change the file to:

```js
import gulp from 'gulp';
import browserSync from 'browser-sync';

const server = browserSync.create();

// initializes the server
function serve(done) {
  server.init({
    server: {
      baseDir: './src'
    }
  });
  done();
}

// expose the default task
const dev = gulp.series(serve);
export default dev;
```

Test the file by typing the following command in the command line:

```bat
 gulp
```
And for me it spins up localhost:3000 with my website!

### 7. Live reloading with BrowserSync

This is where things get complex.



[Minify JS with uglify](https://github.com/terinjokes/gulp-uglify/)
[Concatenating files](https://www.npmjs.com/package/gulp-concat)
[Gulp preprocess](https://www.npmjs.com/package/gulp-preprocess)

// minify css:
[clean css](https://www.npmjs.com/package/gulp-clean-css)
// css nano

// beautify js

// [Gzip](https://www.npmjs.com/package/gulp-gzip)
// [Minify HTML](https://www.npmjs.com/package/gulp-minify-html)



// Browsersync

// Gulp useref -> [Outdated quickstart with useref](https://css-tricks.com/gulp-for-beginners/)


## Resources

[Gulp quick start](https://gulpjs.com/docs/en/getting-started/quick-start/)

