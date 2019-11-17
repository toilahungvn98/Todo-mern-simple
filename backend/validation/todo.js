const Validator = require('validator');
const isEmpty = require('is-empty');


module.exports = validateTodo = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';

    // check title todo
    if (Validator.isEmpty(data.title)) {
        errors.title = "Content field is required";
    } 

    
    return {
        errors,
        isValid : isEmpty(errors)
    }


}