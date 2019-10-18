/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const Flight = use('App/Models/Flight');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');

const Helpers = use('Helpers');
const AWSBucketService = require('../../services/AWSBucketService');
const Database = use('Database');

const AUDIO_BUCKET = 'apenasaaudios'
const COMPREHEND_BUCKET = 'apenascompreende'
const TRANSCRIBE_BUCKET = 'apenastranscribe'
const TEST_BUCKET = 'node-sdk-sample-8ab6c65b-586e-41ff-9d74-a8c336dd3212'

class FlightController {

  async index({response, auth}) {        
    const flights = await Flight.all();
     return flights;
  }

  async store({ request, response, auth }) {
    const data = request.only(['identification', 'date', 'origin', 'destiny']);


    const service = new AWSBucketService();
        
    const audio_file = request.file('audio_file');
    
    if (audio_file) {
      await audio_file.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${audio_file.extname}`
      });

      if (!audio_file.moved()) {
        return audio_file.error()
      }      
      data.audio_file = audio_file.fileName;
    } 
    
    
   service.sendAudioFileToBucket(TEST_BUCKET, audio_file.fileName, audio_file.toString())
    .then(result => {
       console.log("Deu certo - 2");
      }).catch(err => {
       console.log(err);
      });
         
      const flights = await Flight.create(data);
      
      return response.status(201).send(flights);

  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = FlightController
