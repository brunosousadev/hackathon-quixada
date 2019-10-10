/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') } */
const User = use('App/Models/User');

class ProfileController {
    async update({ request, auth, response }) {        

        const user = await User.findOrFail(auth.user.id);                 

        const {password} = request.only(['password']);
        if (password) {              
            user.password = password;
        }    
        await user.save();           

        return response.status(200).send(user);        
        
    }
}

module.exports = ProfileController
