/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');
const Hash= use('Hash')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const { test, trait} = use('Test/Suite')('User')


trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')


test('It should be able create user' ,async ({client, assert})=>{

    const response = await client.post('/users').send(
        {
            "email": "brse01@gmail.com",
            "password":"381019"
        }).end();
      
    response.assertStatus(201);   
    assert.exists(response.body.id); 
    
});

test('It should be able to show single user' ,async ({client, assert})=>{
    const user = await Factory.model('App/Models/User').create(); 
    const response = await client.get(`/users/${user.id}`).loginVia(user,'jwt').end();
    response.assertStatus(200);    
    assert.equal(response.body.id,user.id);
});

test('It should be able to update a profile' ,async ({client, assert})=>{
    const user = await Factory.model('App/Models/User').create(); 

    const response = await client.put('/profile')
    .loginVia(user,'jwt')
    .send(
        {
            password:"123123",
            password_confirmation: "123123"
        },
    )    
    .end();        
    
    response.assertStatus(200);    
    assert.isTrue(await Hash.verify('123123',response.body.password));    
});

test('It should be able to delete a user', async ({client, assert})=>{
    const user = await Factory.model('App/Models/User').create(); 

    const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(user,'jwt')
    .end();

  response.assertStatus(204);   
  
  const checkUser  = await User.find(user.id);
  
  assert.isNull(checkUser);

});