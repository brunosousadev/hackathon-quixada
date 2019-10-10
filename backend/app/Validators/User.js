const Antl = use('Antl');
const {rule} = use('Validator');

class User {

  get validateAll(){
    return true;
  }

  get rules () {
    return {
      email: [rule('required'),rule('unique', ['users','email'])],
      password: [rule('required')]
    }
  }

  get messages () {
    return Antl.list('validation');
  }
}

module.exports = User
