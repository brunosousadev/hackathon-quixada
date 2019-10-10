"use strict";
/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/

const { Ignitor } = require("@adonisjs/ignitor");
const Helpers = require('./helpers');
var AWSBucketService = require("./app/services/AWSBucketService");

let bucketService = new AWSBucketService();

bucketService
  .sendTextFileToBucket(
    "node-sdk-sample-8ab6c65b-586e-41ff-9d74-a8c336dd3212",
    "hello_world2.json",
    "{ \"hello\": \"Hello World! Segundo!\" }"
  )
  .then(result => {
    console.log("Deu certo!\n" + result);
  })
  .catch(err => console.error(err, err.stack));

bucketService.getTextFileFromBucket(
  "node-sdk-sample-8ab6c65b-586e-41ff-9d74-a8c336dd3212",
  "hello_world2.json",
  function(data) {
    if (!data) console.error(err);
    else console.log(data);
  }
);

bucketService.sendAudioFileToBucket(
  "node-sdk-sample-8ab6c65b-586e-41ff-9d74-a8c336dd3212",
  'shaitan.wav',
  Helpers.tmpPath('test/shaitan.wav')
).then(result => console.log('Funcionou'));

new Ignitor(require("@adonisjs/fold"))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error);
