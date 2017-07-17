
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

You can install `tinyme` as a global module and use it anywhere. To do that, you just need to run `$ npm run build`. 

Now you are ready.

## Usage

The most important thing to know about `tinyme` usage is that you must provide your API key at least once:

`$ tinyme --api-key <api_key>`

After the first running providing your API key, it will be stored as an environment variable named `TINYME_API_KEY`. From this moment and on, you will be able to run any `tinyme` command. For instance, to minify images of a given dir, you just have to provide its path:

`$ tinyme -m /path/to/your/images/dir`

Tinyme uses the excellent [Commander.js](https://github.com/tj/commander.js/blob/master/Readme.md) module to provide you an interface which you can run different commands to accomplish different tasks.

You can get the full list of available commands by running `$ tinyme --help` or just `$ tinyme -h`:

```
$ tinyme --help

  Usage: tinyme [options]


  Options:

    -V, --version            output the version number
    -k, --api-key <api_key>  set your API key
    -m, --minify <path>      minify images of a given path
    -c, --count              gets the number of already minified images so far
    -h, --help               output usage information

```

Another important note about its usage is that, if you have a free plan, you'll only be able to minify 500 images per month, so use it wisely.

## License

See the [LICENSE](https://github.com/patarkf/tinyme/blob/master/LICENSE) file for license rights and limitations (MIT).
