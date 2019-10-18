/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Helpers = use('Helpers');
const { test, trait } = use('Test/Suite')('Flight')
const {format} = require('date-fns');

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')
/*
test('It should be able create flight', async ({ client, assert }) => {
    const user = await Factory.model('App/Models/User').create();     
    console.log(user);
    
    const dateFlight = format(new Date(), 'yyyy-MM-dd HH:ii:ss');    
    const response = await client.post('/flights')
        .field('identification', 'VOO 447')
        .field('date',dateFlight)
        .field('origin', 'Fortaleza')
        .field('destiny', 'São Paulo')
        .attach('audio_file', Helpers.tmpPath('test/ishamael.wav'))
        .loginVia(user, 'jwt')
        .end();

    console.log(response.error);
    response.assertStatus(201);
    
    assert.exists(response.body.id);    

});

*/