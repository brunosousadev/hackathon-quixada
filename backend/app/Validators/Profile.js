
const Antl = use('Antl');
const { rule } = use('Validator');

class Profile {

  get validateAll() {
    return true;
  }
  get rules() {
    return {                  
      password: [rule('required')],   
    }

  }
  get messages() {
    return Antl.list('validation');
  }

}

module.exports = Profile
