'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/sessions','SessionController.store');
Route.post('users', 'UserController.store').validator('User');
Route.get('files/:file','FileController.show');


Route.post('flights','FlightController.store');
Route.get('flights','FlightController.index');


Route.group(() => {
  
  Route.get('users/:id','UserController.show');
  Route.put('profile','ProfileController.update').validator('Profile')  
  Route.delete('users/:id', 'UserController.destroy');

  
  
}).middleware(['auth']);

