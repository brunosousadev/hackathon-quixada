'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('sessions','SessionController.store').validator('Session');
Route.post('users', 'UserController.store').validator('User');

Route.group(() => {
  
  Route.get('users/:id','UserController.show');
  Route.put('profile','ProfileController.update').validator('Profile')  
  Route.delete('users/:id', 'UserController.destroy');

  Route.post('flights/','FlightController.store');
  

}).middleware(['auth']);

