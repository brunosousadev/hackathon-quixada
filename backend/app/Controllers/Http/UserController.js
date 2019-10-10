/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');

class UserController {

    async index (){
        const user = await User.query().with('flights').fetch();
        
        return user;
    }

    async store({ request , response}) {
        const data  = request.only(['email','password']);
        const user = await User.create(data);

        return response.status(201).send(user);
    }

    async show({params}){
        const user  = await User.findOrFail(params.id);
        return user;
    }

    async destroy({params}){
        const user  = await User.findOrFail(params.id);
        await user.delete();
      }

}

module.exports = UserController
