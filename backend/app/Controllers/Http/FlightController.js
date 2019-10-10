/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const Flight = use('App/Models/Flight');
const Helpers = use('Helpers');


class FlightController {

  async index({ request, response, view }) {
  }

  async store({ request, response, auth }) {
    const data = request.only(['identification', 'date', 'origin', 'destiny']);

    console.log(data);
    const { id } = auth.user;


    const audio_file = request.file('audio_file');
    
    if (audio_file) {
      await audio_file.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}_${id}_.${audio_file.extname}`
      });

      if (!audio_file.moved()) {
        return audio_file.error()
      }
      data.audio_file = audio_file.fileName;      
    }
    data.transcribed_text = "AQUI";
    data.parsed_text= "AQUI";

    const flight  = await Flight.create({user_id: id,...data});
    return response.status(201).send(flight);
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = FlightController
