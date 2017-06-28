# Tinyme
A Node.js command-line tool that uses TinyPNG to minify images based on a given directory

## Introduction

The purpose of this command-line application is to help developers that need to minify images but don't want to do it manually on the browser, etc., improving the time of the all process. I built the application at the top of the [TinyPNG API](https://tinypng.com), which is a popular service used to minify images. On its free plan, the API provides a limit of images to its users, which is an amount of 500 monthly images to minify.

The main idea here is the user provide a absolute path containing all images he wants to minify, and the application will generate a new directory (with the same structure and at the same level of the original dir), containing all minified images. 

Simple as that.

## Requirements

To install and use the application you'll need the following:

- Node.js 8 or later
- NPM 5 or later
- An API key provided by TinyPNG, which you can get [here](https://tinypng.com/developers).

## Usage

The first thing you have to do is renaming your `variable.env.sample` to `variable.env` and set to the `API_KEY ` environment variable your API key provided by TinyPNG. 

By doing this, you will be able to start the application. You just need to run `npm start <path>`, passing the absolute path as a parameter. For instance:

`$ npm start /path/to/my/images/folder`

Just remember: If you have a free plan, you'll only be able to minify 500 images per month, so use it wisely.

## License

See the [LICENSE](https://github.com/patarkf/tinyme/blob/master/LICENSE) file for license rights and limitations (MIT).
