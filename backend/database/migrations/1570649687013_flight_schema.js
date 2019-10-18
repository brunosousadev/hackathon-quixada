'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlightSchema extends Schema {
  up() {
    this.create('flights', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()        
        .references('id')                
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.string('identification').notNullable()
      table.string('times_potential_problems')
      table.string('date')    
      table.string('origin').notNullable()
      table.string('destiny').notNullable()
      table.text('transcribed_text')
      table.text('parsed_text')
      table.string('audio_file').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('flights')
  }
}

module.exports = FlightSchema
