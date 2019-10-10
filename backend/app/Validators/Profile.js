
const Antl = use('Antl');
const { rule } = use('Validator');

class Profile {

  get validateAll() {
    return true;
  }
  get rules() {
    return {                  
      password: [rule('required'), rule('confirmed')],   
    }

  }
  get messages() {
    return Antl.list('validation');
  }

}

module.exports = Profile
