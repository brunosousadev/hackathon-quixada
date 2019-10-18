'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')
class Flight extends Model {
    static get computed () {
        return ['audioFileUrl']
        
      }
      
      getAudioFileUrl ({ audio_file}) {
        return `${Env.get('FRONT_URL')}/files/${audio_file}`
      }

      user() {
        return this.belongsTo('App/Models/User');
      }
}

module.exports = Flight
