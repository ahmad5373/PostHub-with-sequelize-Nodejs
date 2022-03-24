const {check} = require('express-validator');
// Validtion of Login request
exports.loginRequest =[
    check('email' ,'email is required.').isLength({min:1}),
    // check('password' ,'password is required.').isLength({min:1}),
]


exports.signUpRequest=[
    check('Name','Name is required.').isLength({min:1}),
    // check('Phone ','Phone is required.').isLength({min:1}),
    check('email','email is required and must be valid E email.').isEmail().isLength({min:1}),
]

exports.passwordRequest =[
    check('password','password is required.').isLength({min:1}),
    check('confirmPassword', 'Confirm password is required').isLength({min:1}),
]