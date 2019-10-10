/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Helpers = use('Helpers');
const { test, trait } = use('Test/Suite')('Flight')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('It should be able create flight', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create();
    
    
    const response = await client.post('/flights')
        .field('identification', 'VOO 447')
        .field('date', new Date().getTime())
        .field('origin', 'Fortaleza')
        .field('origin', 'São Paulo')
        .attach('audio_file', Helpers.tmpPath('test/ishamael.wav'))
        .loginVia(user, 'jwt')
        .end();
    
    response.assertStatus(201);
    //assert.exists(response.body.id);
    

});