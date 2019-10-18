const Antl = use('Antl');
const { rule } = use('Validator');

class Flight {

  get validateAll() {
    return true;
  }
  get rules() {
    return {      
      password: [rule('required')],
      identification: [rule('required')],
      date: [rule('required')],
      origin:[rule('required')],
      destiny:[rule('required'), rule('date')]
    }
  }
  get messages() {
    return Antl.list('validation');
  }

}

module.exports = Flight
