const { test, trait} = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');


trait('Test/ApiClient')
trait('DatabaseTransactions')
test('It should return JWT token session created',async ({client, assert})=>{
                
    const sessionPayload = {
        email:"barbaralady13@gmail.com",
        password: "131313",        
    }

    await Factory.model('App/Models/User').create(sessionPayload);

    const response = await client .post('/sessions').send(sessionPayload).end()
        

    response.assertStatus(200);
    assert.exists(response.body.token);
    
});

