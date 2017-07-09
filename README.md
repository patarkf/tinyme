# Tinyme
A Node.js command-line tool that uses TinyPNG to minify images based on a given directory

## Introduction

The purpose of this command-line application is to help developers that need to minify images but don't want to do it manually on the browser, etc., improving the time of the all process. I built the application at the top of the [TinyPNG API](https://tinypng.com), which is a popular service used to minify images. On its free plan, the API provides a limit of images to its users, which is an amount of 500 monthly images to minify.

The main idea here is the user provide an absolute path containing all images he wants to minify, and the application will generate a new directory (with the same structure and at the same level of the original dir), containing all minified images. 

Simple as that.

## Requirements

To install and use the application you'll need the following:

- Node.js 8 or later
- NPM 5 or later
- An API key provided by TinyPNG, which you can get [here](https://tinypng.com/developers).

## Install

You can install `tinyme` as a global module and use it anywhere. To do that, you just need to run `npm run build`. 

Now you are ready.

## Usage

The most important thing to know about its usage is that you have to provide your API key at least once:

`$ tinyme /path/to/my/images your_api_key`

After the first run providing your API key, it will be stored as an environment variable, and then you can run `tinyme` just providing the target path:

`$ tinyne /path/to/my/images/folder`

Another important note about its usage is that, if you have a free plan, you'll only be able to minify 500 images per month, so use it wisely.

## License

See the [LICENSE](https://github.com/patarkf/tinyme/blob/master/LICENSE) file for license rights and limitations (MIT).
